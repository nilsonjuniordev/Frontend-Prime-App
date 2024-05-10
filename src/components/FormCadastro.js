import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

// Função para validar CPF
const isValidCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres especiais

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let result = 0;
  let factor = 10;

  for (let i = 0; i < 9; i++) {
    result += parseInt(cpf.charAt(i)) * factor;
    factor--;
  }

  let remainder = result % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }

  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }

  result = 0;
  factor = 11;

  for (let i = 0; i < 10; i++) {
    result += parseInt(cpf.charAt(i)) * factor;
    factor--;
  }

  remainder = result % 11;
  if (remainder < 2) {
    remainder = 0;
  } else {
    remainder = 11 - remainder;
  }

  return remainder === parseInt(cpf.charAt(10));
};

const FormCadastro = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [userData, setUserData] = useState({
    nome: "",
    id_cnpj: "",
    email: "",
    fone: "",
    cpf: "",
    rg: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    civil: "",
    genero: "",
    dependentes: "",
    data_nascimento: "",
    complemento: "",
    docs:"null",
    pass:"null",
  });

  const [empresas, setEmpresas] = useState([]); // Estado para armazenar as empresas

  useEffect(() => {
    // Função para buscar as empresas cadastradas com id_cnpj
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get("/api/"); // Altere a URL para a rota correta da sua API
        const empresasComCNPJ = response.data.filter((empresa) => empresa.cnpj); // Filtra apenas as empresas com id_cnpj
        setEmpresas(empresasComCNPJ); // Define as empresas no estado
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        toast.error("Erro ao buscar empresas. Verifique o console para mais detalhes.");
      }
    };

    fetchEmpresas(); // Chama a função de busca quando o componente é montado
  }, []);

  const handleChange = (e) => {
    setNumeroTelefone(e.target.value);
    setUserData({ ...userData, fone: e.target.value });
  };

  const handleCPFChange = (e) => {
    const maskedCPF = e.target.value
      .replace(/[^\d]+/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    setUserData({ ...userData, cpf: maskedCPF });
  };

  const handleRGChange = (e) => {
    // Adicione sua lógica de máscara para RG aqui, se necessário
    setUserData({ ...userData, rg: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDataUpper = { ...userData }; // Criar uma cópia dos dados do usuário para modificar

    // Converter todos os valores dos campos para maiúsculo
    for (let key in userDataUpper) {
      if (typeof userDataUpper[key] === "string") {
        userDataUpper[key] = userDataUpper[key].toUpperCase();
      }
    }

    if (
      !userDataUpper.nome ||
      !userDataUpper.email ||
      !userDataUpper.fone ||
      !userDataUpper.cpf ||
      !userDataUpper.rg ||
      !userDataUpper.cep ||
      !userDataUpper.rua ||
      !userDataUpper.complemento ||
      !userDataUpper.numero ||
      !userDataUpper.cidade ||
      !userDataUpper.estado ||
      !userDataUpper.civil ||
      !userDataUpper.genero ||
      !userDataUpper.dependentes ||
      !userDataUpper.data_nascimento ||
      !isValidCPF(userDataUpper.cpf)
    ) {
      if (!isValidCPF(userDataUpper.cpf)) {
        return toast.warn("CPF inválido!");
      }

      return toast.warn("Preencha todos os campos corretamente!");
    }

    try {
      // Primeira solicitação para realizar o cadastro
      const response = await axios.post(
        "/api/Register",
        userDataUpper
      );
      const { token, message, userId } = response.data;

      toast.success(message);

      // Limpa os campos após o cadastro bem-sucedido
      setUserData({
        nome: "",
        email: "",
        fone: "",
        cpf: "",
        rg: "",
        cep: "",
        rua: "",
        complemento: "",
        numero: "",
        cidade: "",
        estado: "",
        civil: "",
        genero: "",
        dependentes: "",
        data_nascimento: "",
      });

      // Armazena o token, o ID do usuário e outros dados onde preferir (por exemplo, localStorage ou contexto)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userData", JSON.stringify(userDataUpper));

      // Obtém o endereço de e-mail do usuário cadastrado
      const { email } = userData;

      // Chama a rota de envio de e-mail
      await axios.post("/api/mail", {
        to: email,
        subject: "Processo de Exame ASO",
        text: "Seja bem-vindo colaborador, acesse https://flexit.site/loginUser e faça o login com seu nome completo e CPF para continuar seu processo de exame.",
      });

      // Redireciona para MyAccount
      navigate("/MyAccount");
      // Recarrega a página (se necessário)
      window.location.reload();
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      toast.error("Erro ao enviar cadastro. Verifique o console para mais detalhes.");
    }
  };

  const loadAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, localidade, uf } = response.data;
      setUserData((prevUserData) => ({
        ...prevUserData,
        rua: logradouro,
        cidade: localidade,
        estado: uf,
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço pelo CEP:", error);
      toast.error("Erro ao buscar endereço pelo CEP");
    }
  };

  const handleCEPChange = (e) => {
    const formattedCEP = e.target.value.replace(/[^\d]+/g, "");
    setUserData({ ...userData, cep: formattedCEP });
  };

  const handleCEPBlur = () => {
    if (userData.cep.length === 8) {
      loadAddress(userData.cep);
    }
  };

  return (
    <form className="FormContainer FormRh" ref={ref} onSubmit={handleSubmit}>
      <div className="InputArea">
        <label>Nome completo </label>
        <input
          name="nome"
          placeholder="Digite o Nome completo"
          value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Empresa/Recrutador</label>
        <select
          name="id_cnpj"
          value={userData.id_cnpj}
          onChange={(e) => setUserData({ ...userData, id_cnpj: e.target.value })}
        >
          <option value="">Selecione</option>
          {empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id_cnpj}>
              {empresa.nome} {/* Exibir o nome da empresa */}
            </option>
          ))}
        </select>
      </div>

      <div className="InputArea">
        <label>E-mail </label>
        <input
          name="email"
          type="email"
          placeholder="Digite o E-mail"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Telefone </label>
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Digite o telefone"
          value={numeroTelefone}
          onChange={handleChange}
          name="fone"
        />
      </div>

      <div className="InputArea">
        <label>CPF </label>
        <InputMask
          mask="999.999.999-99"
          placeholder="Digite o CPF"
          value={userData.cpf}
          onChange={handleCPFChange}
          name="cpf"
        />
      </div>

      <div className="InputArea">
        <label>RG </label>
        <InputMask
          mask="99.999.999-9"
          placeholder="Digite o RG"
          value={userData.rg}
          onChange={handleRGChange}
          name="rg"
        />
      </div>

      <div className="InputArea">
        <label>CEP </label>
        <input
          name="cep"
          type="text"
          placeholder="Digite o CEP"
          value={userData.cep}
          onChange={handleCEPChange}
          onBlur={handleCEPBlur}
        />
      </div>

      <div className="InputArea">
        <label>Rua </label>
        <input
          name="rua"
          type="text"
          placeholder="Digite a Rua"
          value={userData.rua}
          onChange={(e) => setUserData({ ...userData, rua: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Numero </label>
        <input
          name="numero"
          type="text"
          placeholder="Digite o numero"
          value={userData.numero}
          onChange={(e) => setUserData({ ...userData, numero: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Complemento </label>
        <input
          name="complemento"
          type="text"
          placeholder="Digite o numero"
          value={userData.complemento}
          onChange={(e) => setUserData({ ...userData, complemento: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Cidade </label>
        <input
          name="cidade"
          type="text"
          placeholder="Digite a cidade"
          value={userData.cidade}
          onChange={(e) => setUserData({ ...userData, cidade: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Estado </label>
        <input
          name="estado"
          type="text"
          placeholder="Digite o estado"
          value={userData.estado}
          onChange={(e) => setUserData({ ...userData, estado: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Estado Civil</label>
        <select
          name="civil"
          value={userData.civil}
          onChange={(e) => setUserData({ ...userData, civil: e.target.value })}
        >
          <option value="">Selecione</option>
          <option value="solteiro">Solteiro(a)</option>
          <option value="casado">Casado(a)</option>
          <option value="divorciado">Divorciado(a)</option>
          <option value="viuvo">Viúvo(a)</option>
        </select>
      </div>

      <div className="InputArea">
        <label>Gênero</label>
        <select
          name="genero"
          value={userData.genero}
          onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select>
      </div>

      <div className="InputArea">
        <label>Dependentes </label>
        <input
          name="dependentes"
          type="text"
          placeholder="Digite a dependência"
          value={userData.dependentes}
          onChange={(e) => setUserData({ ...userData, dependentes: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Data de Nascimento </label>
        <input
          name="data_nascimento"
          type="date"
          value={userData.data_nascimento}
          onChange={(e) => setUserData({ ...userData, data_nascimento: e.target.value })}
        />
      </div>

      <button className="btn100" type="submit">
        Realizar cadastro
      </button>
    </form>
  );
};

export default FormCadastro;
