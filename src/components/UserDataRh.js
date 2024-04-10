import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";

const UserDataRh = () => {
  const [userData, setUserData] = useState({
    iduser: null,
    nome: "",
    email: "",
    fone: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",

  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState(null);

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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`https://191.184.72.124:8800/${userId}`, userData);
      setUpdateSuccessMessage(<div className='alertGreen'>Dados do usuário atualizados com sucesso.</div>);
      console.log('Dados do usuário atualizados com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    }
  };
  
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`https://191.184.72.124:8800/${userId}`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="UserData">
      <h2>Meu cadastro</h2>
      <p>
        Para atualizar suas informações cadastradas, basta editar os campos
        conforme desejado e, em seguida, clicar no botão 'Salvar'.
      </p>
      <br />
      {loading && <p>Carregando dados do usuário...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          <form className="UserDataForm" onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={userData.nome}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Email:
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Telefone:
              <InputMask
                mask="(99) 99999-9999"
                type="text"
                name="fone"
                value={userData.fone}
                onChange={handleInputChange}
              />
            </label>

            <label>
              CNPJ:
              <InputMask
                mask="99.999.999/9999-99"
                type="text"
                name="cnpj"
                value={userData.cnpj}
                onChange={handleInputChange}
              />
            </label>

            <label>
              CEP:
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
              Rua:
              <input
                type="text"
                name="rua"
                value={userData.rua}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Número:
              <input
                type="text"
                name="numero"
                value={userData.numero}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Complemento:
              <input
                type="text"
                name="complemento"
                value={userData.complemento}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Cidade:
              <input
                type="text"
                name="cidade"
                value={userData.cidade}
                onChange={handleInputChange}
              />
            </label>

            <label>
              Estado:
              <input
                type="text"
                name="estado"
                value={userData.estado}
                onChange={handleInputChange}
              />
            </label>



            <button type="submit">Salvar</button>
          </form>
          {updateSuccessMessage && (
            <p className="successMessage">{updateSuccessMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDataRh;