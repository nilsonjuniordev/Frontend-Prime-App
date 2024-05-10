import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import Button from '@mui/material/Button';

const UserData = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    iduser: null,
    nome: "",
    email: "",
    fone: "",
    rg: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    civil: "",
    genero: "",
    dependentes: "",
    data_nascimento: "",
  
  });

  const [fieldsRequiredError, setFieldsRequiredError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);



const handleRGChange = (e) => {
  // Adicione sua lógica de máscara para RG aqui, se necessário
  setUserData({ ...userData, rg: e.target.value });
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




  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (userId) {
          const response = await axios.get(`/api/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        setError("Ocorreu um erro ao carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Ajusta a formatação da data de nascimento
    const userDataCopy = { ...userData };
    userDataCopy.data_nascimento = new Date(userDataCopy.data_nascimento).toISOString().split('T')[0];
  
    // Verifica se algum campo obrigatório está vazio
    if (Object.values(userDataCopy).some(value => value === '')) {
      setFieldsRequiredError(true);
      return;
    }
  
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`/api/${userId}`, userDataCopy);
      setUpdateSuccessMessage(<div className='alertGreen'><Typography>Dados do usuário atualizados com sucesso.</Typography></div>);
      console.log('Dados do usuário atualizados com sucesso.');
      
      setTimeout(() =>{
        navigate('/MyAccount'); 
      }, 800);
  
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Carregar dados do usuário ao montar o componente
    const userId = localStorage.getItem('userId');

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []); // Executa uma vez ao montar o componente



  return (
    <Box display="flex" justifyContent="center" alignItems="left" flexDirection="column" >
     <Typography sx={ {padding: 2}}>  
      
      <h2>Meu cadastro</h2>
   
        Para atualizar suas informações cadastradas, basta editar os campos
        conforme desejado e, em seguida, clicar no botão 'Salvar'.
    </Typography>
      <br />
      {loading && <p>Carregando dados do usuário...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Box>
          <form className="UserDataForm" onSubmit={handleFormSubmit}>
          <label>
          <Typography> Nome:</Typography>
              <input
                type="text"
                name="nome"
                value={userData.nome}
                onChange={handleInputChange}
              />
            </label>

            <label>
            <Typography> Email:   </Typography>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </label>

            <label>
            <Typography>  Telefone:   </Typography>
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                name="fone"
                value={userData.fone}
                onChange={handleInputChange}
              />
            </label>

            <label>
             <Typography>  CPF:  </Typography>
              <InputMask
                mask="999.999.999-99"
                type="text"
                name="cpf"
                value={userData.cpf}
                onChange={handleInputChange}
              />
            </label>

            <label>
            <Typography> RG:   </Typography>
              <InputMask
    mask="99.999.999-9"
    placeholder="Digite o RG"
    value={userData.rg}
    onChange={handleRGChange}
    name="rg"
  />
            </label>

            <label>
            <Typography> CEP:  </Typography>
              <input
    name="cep"
    type="text"
    placeholder="Digite o CEP"
    value={userData.cep}
    onChange={handleCEPChange}
    onBlur={handleCEPBlur}
  />
            </label>

            <label>
             <Typography> Rua:   </Typography>
              <input
                type="text"
                name="rua"
                value={userData.rua}
                onChange={handleInputChange}
              />
            </label>

            <label>
             <Typography>  Número:  </Typography>
              <input
                type="text"
                name="numero"
                value={userData.numero}
                onChange={handleInputChange}
              />
            </label>

            <label>
             <Typography>  Complemento:  </Typography>
              <input
                type="text"
                name="complemento"
                value={userData.complemento}
                onChange={handleInputChange}
              />
            </label>

            <label>
            <Typography>  Cidade:   </Typography>
              <input
                type="text"
                name="cidade"
                value={userData.cidade}
                onChange={handleInputChange}
              />
            </label>

            <label>
             <Typography>  Estado:</Typography>
              <input
                type="text"
                name="estado"
                value={userData.estado}
                onChange={handleInputChange}
              />
            </label>

      
        <label><Typography>Estado Civil</Typography>
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
        </select></label>
     

        <label><Typography>Gênero</Typography>
        <select
          name="genero"
          value={userData.genero}
          onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
        >
          <option value="">Selecione</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
        </select></label>

            <label>
            <Typography>  Dependentes: </Typography>
              <input
                type="text"
                name="dependentes"
                value={userData.dependentes}
                onChange={handleInputChange}
              />
            </label>

            <label>
             <Typography> Data de Nascimento: </Typography>
              <InputMask
                mask="99/99/9999"
                type="text"
                name="data_nascimento"
                value={userData.data_nascimento}
                onChange={handleInputChange}
              />
            </label>

            <Button type="submit" variant="contained" style={{ backgroundColor: '#633687', color: 'white' }}>Salvar</Button>
         
          </form>
           {/* Adiciona uma mensagem de sucesso após a atualização */}
           {updateSuccessMessage && (
            <p className="successMessage">{updateSuccessMessage}</p>
          )}

          {userData.uploadsPath && userData.uploadsPath.trim() !== "" && (
            <div>
{fieldsRequiredError && <Typography><p className="alertRed">Todos os campos são obrigatórios.</p></Typography>}


            



            </div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserData;

