import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import { Box } from "@mui/material";

const FormRh = () => {
  const [numeroTelefone, setNumeroTelefone] = useState("");
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    fone: "",
    cpf: "",
    id_cnpj: "",
    pass: '1234',
  });
  const [documentosSelecionados, setDocumentosSelecionados] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`/api/${userId}`);
        const userDataFromApi = response.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          id_cnpj: userDataFromApi.id_cnpj || "", // Defina id_cnpj com o valor do usuário API
        }));
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserData();
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

  const handleDocumentChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      setDocumentosSelecionados([...documentosSelecionados, value]);
    } else {
      setDocumentosSelecionados(documentosSelecionados.filter((doc) => doc !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converter todos os valores do estado para maiúsculas
    const userDataUpperCase = Object.keys(userData).reduce((acc, key) => {
      acc[key] = userData[key].toUpperCase();
      return acc;
    }, {});

    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields = ["nome", "email", "fone", "cpf"];
    if (requiredFields.some((field) => !userDataUpperCase[field])) {
      return toast.warn("Preencha todos os campos corretamente!");
    }

    try {
      const docsString = documentosSelecionados.join(",");
      const response = await axios.post("/api/register", {
        ...userDataUpperCase, // Enviar os dados em maiúsculas
        docs: docsString,
      });
      const { message } = response.data;

      toast.success(message);

      // Reinicializar o estado após o envio bem-sucedido
      setUserData({
        nome: "",
        email: "",
        fone: "",
        cpf: "",
        id_cnpj: userData.id_cnpj,
      });
      setNumeroTelefone("");
      setDocumentosSelecionados([]);

      // Obtém o endereço de e-mail do usuário cadastrado
      const { email } = userData;

      // Chama a rota de envio de e-mail
      await axios.post("/api/mail", {
        to: email,
        subject: "Processo de Exame ASO",
        text: "Seja bem-vindo colaborador, acesse https://flexit.site/loginUser e faça o login com seu nome completo e CPF para continuar seu processo de exame.",
      });
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      toast.error(
        "Erro ao enviar cadastro. Verifique o console para mais detalhes."
      );
    }
  };

  
  return (
<Box>
      <form onSubmit={handleSubmit}>
      <div className="FormRh">  <div >
        <label>Nome completo:</label>
        <input
          name="nome"
          placeholder="Digite o Nome completo"
          value={userData.nome}
          onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
        />
      </div>

      <div>
        <label>E-mail:</label>
        <input
          name="email"
          type="email"
          placeholder="Digite o E-mail"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </div>

      <div>
        <label>Telefone:</label>
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Digite o telefone"
          value={numeroTelefone}
          onChange={handleChange}
          name="fone"
        />
      </div>

      <div>
        <label>CPF:</label>
        <InputMask
          mask="999.999.999-99"
          
          placeholder="Digite o CPF"
          value={userData.cpf}
          onChange={handleCPFChange}
          name="cpf"
        />
      </div>
      </div>
   
   <br/>
 <h3>Documentos necessários:</h3> 

    <div className="DocSelect">  
         
        <div className="SelectDoc"> 
        
          <input
            type="checkbox"
            id="doc1"
            name="doc1"
            value="C.T.P.S - com baixa do último emprego"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc1">C.T.P.S - com baixa do último emprego</label>
        </div>
        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc2"
            name="doc2"
            value="Proposta de trabalho asssinada"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc2">Proposta de trabalho asssinada</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc3"
            name="doc3"
            value="R.G. Identidade"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc3">R.G. Identidade</label>
        </div>

        <div className="SelectDoc" > 
          <input
            type="checkbox"
            id="doc4"
            name="doc4"
            value="Título eleitoral"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc4">Título eleitoral</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc5"
            name="doc5"
            value="Reservista"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc5">Reservista</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc6"
            name="doc6"
            value="C.P.F."
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc6">C.P.F.</label>
        </div>
      

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc7"
            name="doc7"
            value="Certidão de nascimento (Solteiro)"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc7">Certidão de nascimento (Solteiro)</label>
        </div>

        
        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc8"
            name="doc8"
            value="Certidão de casamento"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc8">Certidão de casamento</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc9"
            name="doc9"
            value="Certidão de nascimento dos filhos"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc9">Certidão de nascimento dos filhos</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc10"
            name="doc10"
            value="Cartão do PIS"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc10">Cartão do PIS</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc11"
            name="doc11"
            value="Carteira de vacinação dos filhos menores de 14 anos"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc11">Carteira de vacinação dos filhos menores de 14 anos</label>
        </div>

       <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc12"
            name="doc12"
            value="C.N.H. Habilitação"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc12">C.N.H. Habilitação</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc13"
            name="doc13"
            value="Comprovante de endereço"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc13">Comprovante de endereço</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc14"
            name="doc14"
            value="Foto 3x4"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc14">Foto 3x4</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc15"
            name="doc15"
            value="Diploma de graduação"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc15">Diploma de graduação</label>
        </div>


        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc16"
            name="doc16"
            value="Registro no conselho de sua categoria profissional"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc16">Registro no conselho de sua categoria profissional</label>
        </div>

        <div className="SelectDoc"> 
          <input
            type="checkbox"
            id="doc17"
            name="doc17"
            value="Número de Conta corrente"
            onChange={handleDocumentChange}
          />
          <label htmlFor="doc17">Número de Conta corrente</label>
        </div>

      </div>
      <button className="btn100" type="submit">
      Adicionar Colaborador
      </button> </form>
      </Box>
  );
};

export default FormRh;
