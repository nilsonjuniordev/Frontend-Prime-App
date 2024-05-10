import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

const UserDocs = () => {
  const [userData, setUserData] = useState({
    iduser: null,
    nome: "",
    email: "",
    fone: "",
    cpf: "",
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const uploadsPathImages = userData.uploadsPath ? userData.uploadsPath.split(", ") : [];
  const uploadsPathAsoImages = userData.uploadsPathAso ? userData.uploadsPathAso.split(", ") : [];
  


  const openLightboxPath = (index) => {
    setLightboxOpen(true);
    setSelectedImageIndex(index);
  };
  
  const openLightboxPathAso = (index) => {
    setLightboxOpen(true);
    setSelectedImageIndex(index + (userData.uploadsPath ? userData.uploadsPath.split(", ").length : 0));
  };
  

  useEffect(() => {
    // Carregar dados do usuário ao montar o componente
    const userId = localStorage.getItem("userId");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []); // Executa uma vez ao montar o componente

  const handleDeleteConfirmation = async (confirmed) => {
    setShowConfirmation(false);

    if (confirmed) {
      try {
        // Exclui todos os caminhos associados aos campos uploadsPath e uploadsPathAso
        const userId = localStorage.getItem("userId");
        await axios.delete(`/api/uploads/${userId}`);
        await axios.delete(`/api/uploadsAso/${userId}`);

        // Recarrega a página para atualizar os dados do usuário
        window.location.reload();

        // Atualiza os dados do usuário após a exclusão
        const response = await axios.get(`/api/${userId}`);
        setUserData(response.data);
        console.log("Caminhos das imagens removidos com sucesso.");
      } catch (error) {
        // Exibe mensagem de erro ao usuário
        console.error("Erro ao remover caminhos das imagens:", error);
        setDeleteError(
          "Erro ao excluir caminhos das imagens. Tente novamente."
        );
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: '100%', p: 3, typography: 'body1' }}>
        <h2>Meus Documentos</h2>
        <p>
          Gerencie seus documentos enviados. Se necessário, você pode excluí-los
          todos e reenviá-los individualmente conforme solicitado.
        </p>
        {(userData.uploadsPath || userData.uploadsPathAso) && (
          <div>
            <div className="ImageGallery">
            {userData.uploadsPath && userData.uploadsPath.split(", ").map((path, index) => (
  <div
    key={index}
    className="ImageGalleryItem"
    onClick={() => openLightboxPath(index)}
  >
    <img
      src={`/api/${path.trim()}`}
      alt={`Imagem ${index}`}
    />
  </div>
))}

{userData.uploadsPathAso && userData.uploadsPathAso.split(", ").map((path, index) => (
  <div
    key={index}
    className="ImageGalleryItem"
    onClick={() => openLightboxPathAso(index)}
  >
    <img
      src={`/api/${path.trim()}`}
      alt={`Imagem ${index}`}
    />
  </div>
))}

{lightboxOpen && (
  <div className="Lightbox">
    <span
      className="CloseButton"
      onClick={() => setLightboxOpen(false)}
    >
      Fechar
    </span>
    <img
      src={`/api/${
        selectedImageIndex < uploadsPathImages.length
          ? uploadsPathImages[selectedImageIndex].trim()
          : uploadsPathAsoImages[selectedImageIndex - uploadsPathImages.length].trim()
      }`}
      alt={`Imagem ${selectedImageIndex}`}
    />
  </div>
)}

            </div>
            <Button   variant="contained" onClick={() => setShowConfirmation(true)} style={{ backgroundColor: '#633687', color: 'white' }}>
              Excluir Documentos
            </Button>
          </div>   
        )}
        {!userData.uploadsPath && !userData.uploadsPathAso && (
          <p className="alertRed">Você ainda não enviou seus documentos. Favor enviar os documentos solicitados em "Enviar documentos".</p>
        )}
        {showConfirmation && (
          <div>
            <p className="alertRed">
              Ao realizar a exclusão, será necessário reenviar todos os documentos
              novamente. <br/>Tem certeza que deseja excluir todos os documentos?
            </p>
            <Button style={{ backgroundColor: '#633687', color: 'white', margin: '5px' }}
              onClick={() => handleDeleteConfirmation(true)}
            >
              Sim
            </Button>

            <Button style={{ backgroundColor: '#633687', color: 'white', margin: '5px' }}
              className="btnD"
              onClick={() => handleDeleteConfirmation(false)}
            >
              Não
            </Button>
          </div>
        )}
        {deleteError && <p>{deleteError}</p>}
      </Box>
    </Box>
  );
};

export default UserDocs;