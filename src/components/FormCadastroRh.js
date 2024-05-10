import axios from "axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';

const isValidcnpj = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, ""); // Remove caracteres especiais

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Verifica o primeiro dígito verificador
  let sum = 0;
  let factor = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  let remainder = sum % 11;
  let digit = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(cnpj.charAt(12)) !== digit) {
    return false;
  }

  // Verifica o segundo dígito verificador
  sum = 0;
  factor = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  remainder = sum % 11;
  digit = remainder < 2 ? 0 : 11 - remainder;
  if (parseInt(cnpj.charAt(13)) !== digit) {
    return false;
  }

  return true;
};

const FormCadastroRh = () => {
  const navigate = useNavigate();
  const ref = useRef();
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    fone: "",
    cnpj: "",
    cep: "",
    rua: "",
    numero: "",
    cidade: "",
    estado: "",
    complemento: "",
    pass: "",
    docs: "null",
  });

  const handleChange = (e) => {
    setNumeroTelefone(e.target.value);
    setUserData({ ...userData, fone: e.target.value });
  };

  const handlecnpjChange = (e) => {
    const rawCnpj = e.target.value.replace(/[^\d]+/g, "");
    let maskedCnpj = "";
    if (rawCnpj.length <= 14) {
      maskedCnpj = rawCnpj.replace(/^(\d{2})(\d)/, "$1.$2")
                          .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                          .replace(/\.(\d{3})(\d)/, ".$1/$2")
                          .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      maskedCnpj = rawCnpj.substring(0, 14)
                            .replace(/^(\d{2})(\d)/, "$1.$2")
                            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                            .replace(/\.(\d{3})(\d)/, ".$1/$2")
                            .replace(/(\d{4})(\d{1,2})/, "$1-$2");
    }
    setUserData({ ...userData, cnpj: maskedCnpj });
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[a-z]).{8,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convertendo todos os campos, exceto a senha, para maiúsculas
    const uppercaseUserData = { ...userData };
    for (const key in uppercaseUserData) {
      if (Object.hasOwnProperty.call(uppercaseUserData, key) && key !== 'pass' && key !== 'confirmarPass') {
        uppercaseUserData[key] = uppercaseUserData[key].toUpperCase();
      }
    }
  
    if (
      !uppercaseUserData.nome ||
      !uppercaseUserData.email ||
      !uppercaseUserData.fone ||
      !uppercaseUserData.cnpj ||
      !uppercaseUserData.cep ||
      !uppercaseUserData.rua ||
      !uppercaseUserData.complemento ||
      !uppercaseUserData.numero ||
      !uppercaseUserData.cidade ||
      !uppercaseUserData.estado ||
      !uppercaseUserData.pass ||
      !confirmarPass ||
      !isValidcnpj(uppercaseUserData.cnpj) ||
      !isValidPassword(uppercaseUserData.pass) ||
      uppercaseUserData.pass !== confirmarPass
    ) {
      // Se houver algum erro nos dados do formulário, exiba uma mensagem de aviso
      if (!isValidcnpj(uppercaseUserData.cnpj)) {
        return toast.warn("CNPJ inválido!");
      }
      if (!isValidPassword(uppercaseUserData.pass)) {
        return toast.warn("A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial.");
      }
      if (uppercaseUserData.pass !== confirmarPass) {
        return toast.warn("As senhas não coincidem.");
      }
      return toast.warn("Preencha todos os campos corretamente!");
    }
    
    try {
      const idCnpj = `${uppercaseUserData.nome.replace(/\s/g, '')}-${Math.floor(Math.random() * 1000)}`;
      const userDataWithIdCnpj = { ...uppercaseUserData, id_cnpj: idCnpj };
  
      const response = await axios.post("/api/RegisterRh", userDataWithIdCnpj);
      const { message, userId } = response.data;
      toast.success(message);
  
      if (!userId) {
        return toast.error("Erro ao obter o ID do usuário.");
      }
  
      localStorage.setItem("specificToken", response.data.token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userData", JSON.stringify(userDataWithIdCnpj));
  
 // Obtém o endereço de e-mail do usuário cadastrado
 const { email } = userData;

 // Chama a rota de envio de e-mail
 await axios.post("/api/mail", {
   to: email,
   subject: "Cadastro recrutador Prime TXT",
   text: "Seja bem-vindo Recrutador, acesse https://flexit.site/loginRh e faça o login com os acessos criados no cadastro",
 });


      navigate('/AdminRh');
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
        <label>Empresa / Recrutador</label>
        <input
          name="nome"
          placeholder="Digite o nome"
          value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>E-mail</label>
        <input
          name="email"
          type="email"
          placeholder="Digite o E-mail"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Digite o telefone"
          value={numeroTelefone}
          onChange={handleChange}
          name="fone"
        />
      </div>

      <div className="InputArea">
        <label>CNPJ</label>
        <InputMask
          mask="99.999.999/9999-99"
          placeholder="Digite o CNPJ"
          value={userData.cnpj}
          onChange={handlecnpjChange}
          name="cnpj"
        />
      </div>

 
      <div className="InputArea">
        <label>CEP</label>
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
        <label>Rua</label>
        <input
          name="rua"
          type="text"
          placeholder="Digite a Rua"
          value={userData.rua}
          onChange={(e) => setUserData({ ...userData, rua: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Numero</label>
        <input
          name="numero"
          type="text"
          placeholder="Digite o numero"
          value={userData.numero}
          onChange={(e) => setUserData({ ...userData, numero: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Complemento</label>
        <input
          name="complemento"
          type="text"
          placeholder="Digite o numero"
          value={userData.complemento}
          onChange={(e) => setUserData({ ...userData, complemento: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Cidade</label>
        <input
          name="cidade"
          type="text"
          placeholder="Digite a cidade"
          value={userData.cidade}
          onChange={(e) => setUserData({ ...userData, cidade: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Estado</label>
        <input
          name="estado"
          type="text"
          placeholder="Digite o estado"
          value={userData.estado}
          onChange={(e) => setUserData({ ...userData, estado: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Senha</label>
        <input
          name="pass"
          type="password"
          placeholder="Digite a Senha"
          value={userData.pass}
          onChange={(e) => setUserData({ ...userData, pass: e.target.value })}
        />
      </div>

      <div className="InputArea">
        <label>Confirmar Senha</label>
        <input
          name="confirmarpass"
          type="password"
          placeholder="Confirme a Senha"
          value={confirmarPass}
          onChange={(e) => setConfirmarPass(e.target.value)}
        />
      </div>
  <p className="AlertStatusYellow ">*A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula e um caractere especial.</p>
      <button className="btn100" type="submit">Realizar cadastro</button>
    
    </form>
  );
};

export default FormCadastroRh;
