import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

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
// Função para validar CPF



const FormEdit = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [numeroTelefone, setNumeroTelefone] = useState("");

  const [userData, setUserData] = useState({
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

  useEffect(() => {
    if (onEdit) {
      const user = ref.current.elements;
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.cpf.value = onEdit.cpf;
      user.rg.value = onEdit.rg;
      user.cep.value = onEdit.cep;
      user.rua.value = onEdit.rua;
      user.complemento.value = onEdit.complemento;
      user.numero.value = onEdit.numero;
      user.cidade.value = onEdit.cidade;
      user.estado.value = onEdit.estado;
      user.civil.value = onEdit.civil;
      user.genero.value = onEdit.genero;
      user.dependentes.value = onEdit.dependentes;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

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


console.log("campos", userData);

    if (
      !userData.nome ||
      !userData.email ||
      !userData.fone ||
      !userData.cpf ||
      !userData.rg ||
      !userData.cep ||
      !userData.rua ||
      !userData.complemento ||
      !userData.numero ||
      !userData.cidade ||
      !userData.estado ||
      !userData.civil ||
      !userData.genero ||
      !userData.dependentes ||
      !userData.data_nascimento ||
      !isValidCPF(userData.cpf)
    ) {
      
      if (!isValidCPF(userData.cpf)) {
        return toast.warn("CPF inválido!");
      }

      return toast.warn("Preencha todos os campos corretamente!");
    }

    try {
      if (onEdit) {
        await axios
          .put(`https://191.184.72.124:8800/${onEdit.id}`, userData)
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("https://191.184.72.124:8800", userData)
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }

      // Limpar campos após o sucesso
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

      getUsers();
      setOnEdit(null);
    } catch (error) {
      toast.error(
        error.response?.data || "Erro ao cadastrar/atualizar usuário"
      );
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
    <form className="FormContainer" ref={ref} onSubmit={handleSubmit}>
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

      <button className="btn100" type="submit">Realizar cadastro</button>
    </form>
  );
};

export default FormEdit;
