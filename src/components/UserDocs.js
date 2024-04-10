import React, { useEffect, useState } from "react";
import axios from "axios";

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

  const openLightbox = (index) => {
    setLightboxOpen(true);
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    // Carregar dados do usuário ao montar o componente
    const userId = localStorage.getItem("userId");

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://191.184.72.124:8800/${userId}`);
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
        // Exclui todos os caminhos associados ao campo uploadsPath
        const userId = localStorage.getItem("userId");
        await axios.delete(`https://191.184.72.124:8800/uploads/${userId}`);

        // Recarrega a página para atualizar os dados do usuário
        window.location.reload();

        // Atualiza os dados do usuário após a exclusão
        const response = await axios.get(`https://191.184.72.124:8800/${userId}`);
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
    <div className="UserData">
      <h2>Meus Documentos</h2>
      <p>
        Gerencie seus documentos enviados. Se necessário, você pode excluí-los
        todos e reenviá-los individualmente conforme solicitado.
      </p>
      {userData.uploadsPath && userData.uploadsPath.trim() !== "" ? (
        <div>
          <div className="ImageGallery">
            {userData.uploadsPath.split(", ").map((path, index) => (
              <div
                key={index}
                className="ImageGalleryItem"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={`https://191.184.72.124:8800/${path.trim()}`}
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
                  src={`https://191.184.72.124:8800/${userData.uploadsPath
                    .split(", ")
                    [selectedImageIndex].trim()}`}
                  alt={`Imagem ${selectedImageIndex}`}
                />
              </div>
            )}
          </div>
          <button className="btnD" onClick={() => setShowConfirmation(true)}>
            Excluir Documentos
          </button>
        </div>
      ) : (
<p className="alertRed">Você ainda não enviou seus documentos. Favor enviar os documentos solicitados em "Enviar documentos".</p>

      )}
  
      {showConfirmation && (
        <div>
          <p className="alertRed">
            Ao realizar a exclusão, será necessário reenviar todos os documentos
            novamente. <br/>Tem certeza que deseja excluir todos os documentos?
          </p>
          <button
            className="btnD"
            onClick={() => handleDeleteConfirmation(true)}
          >
            Sim
          </button>
          <button
            className="btnD"
            onClick={() => handleDeleteConfirmation(false)}
          >
            Não
          </button>
        </div>
      )}
      {deleteError && <p>{deleteError}</p>}
    </div>
  );
  
  
};

export default UserDocs;
