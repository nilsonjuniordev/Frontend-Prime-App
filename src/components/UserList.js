import { Box } from "@mui/material";
import React, { useState } from "react";

const UserList = ({ users, onSendMessage, currentUser }) => {

  console.log("CurrentUser:", currentUser);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleSendMessage = (phoneNumber) => {
    onSendMessage(phoneNumber);
  };

  const handleVerClick = (user) => {
    setSelectedUser(user);
  };

  const handleVerDoc = async (user) => {
    try {
      if (user.uploadsPath) {
        const images = user.uploadsPath.split(", ");
        setUserImages(images);
      } else {
        setUserImages([]);
      }
    } catch (error) {
      console.error('Erro ao obter imagens do usuário:', error);
    }
  };


  const handleVerAso = async (user) => {
    try {
      if (user.uploadsPathAso) {
        const images = user.uploadsPathAso.split(", ");
        setUserImages(images);
      } else {
        setUserImages([]);
      }
    } catch (error) {
      console.error('Erro ao obter imagens do usuário:', error);
    }
  };




  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setUserImages([]);
  };

  // Verificar se currentUser está definido e possui a propriedade id_cnpj
  const isCurrentUserValid = currentUser && currentUser.id_cnpj;

  // Filtrar usuários apenas se o currentUser estiver definido e possuir a propriedade id_cnpj
  const filteredUsers = isCurrentUserValid
    ? users.filter((user) => user.id_cnpj === currentUser.id_cnpj)
    : users;

  return (
    <Box>
      <div className="LabelList">
        <div className="ListFlex">
          <div className="IdList">ID</div>
          <div className="ListGrid">Nome</div>
          <div className="ListGrid">E-mail</div>
          <div className="ListGrid">Celular</div>
          <div className="ListGrid">Documentos</div>
          <div className="IdList">ASO</div>
          <div className="ListGrid">Status</div>
          <div className="IdList">Ver</div>
        </div>
      </div>
      {filteredUsers.map((user) => (
        <div className="ListFlex" key={user.id}>
          <div className="IdList">{user.iduser}</div>
          <div className="ListGrid">{user.nome}</div>
          <div className="ListGridMail">{user.email}</div>
          <div className="ListGrid">
            <a
              href={`whatsapp://send?phone=55${user.fone.replace(/\D/g, "")}`}
              onClick={(e) => {
                e.preventDefault();
                handleSendMessage(user.fone);
              }}
            >
              {user.fone}
            </a>
          </div>
          <div className="ListGrid">
            <button className="ViewBtnList" onClick={() => handleVerDoc(user)}>
              Documentos
            </button>
          </div>
          <div className="IdList">
            <button className="ViewBtnList" onClick={() => handleVerAso(user)}>
              ASO
            </button>
          </div>
          <div className="ListGrid">
      {user.rg === null ? (
        <span className="AlertStatusRed">Cadastro Pendente</span>
      ) : user.uploadsPath === null ? (
        <span className="AlertStatusYellow">Doc pendentes</span>
      ) : user.uploadsPathAso === null ? (
        <span className="AlertStatusOrange">ASO Pendente</span>
      ) : (
        <span className="AlertStatusGreen">Processo concluído</span>
      )}
    </div>
          <div className="IdList">
            <button className="ViewBtnList" onClick={() => handleVerClick(user)}>
              Ver
            </button>
          </div>
        </div>
      ))}

      {/* Modal de exibição de informações do usuário */}
      {selectedUser && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>X</span>
            <h2>Informações pessoais do colaborador</h2>
            <p>ID:<b> {selectedUser.iduser}</b></p>
            <p>Nome: <b> {selectedUser.nome}</b></p>
            <p>CPF: <b> {selectedUser.cpf}</b></p>
            <p>RG: <b> {selectedUser.rg}</b></p>
            <p>Gênero: <b> {selectedUser.genero}</b></p>
            <p>Dependentes: <b> {selectedUser.dependentes}</b></p>
            <p>Data de nascimento: <b> {selectedUser.data_nascimento}</b></p>
            <p>Data de início de processo: <b> {selectedUser.data}</b></p>
            <p>E-mail: <b> {selectedUser.email}</b></p>
            <h2><b> Endereço</b> </h2>
            <p>Rua: <b> {selectedUser.rua}</b></p>
            <p>Número: <b> {selectedUser.numero}</b></p>
            <p>Complemento: <b> {selectedUser.complemento}</b></p>
            <p>Cidade: <b> {selectedUser.cidade}</b></p>
            <p>Estado:<b>  {selectedUser.estado}</b></p>
          </div>
        </div>
      )}

      {/* Modal para exibir imagens do usuário */}
      {userImages.length > 0 && (
        <div className="modal">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>X</span>
            <h2>Visualizar Documentos</h2>
            <div className="ImageGallery">
              {userImages.map((path, index) => (
                <img
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="ImageGalleryItem"
                  src={`/api/${path.trim()}`}
                  alt={`Imagem ${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagem ampliada */}
      {lightboxOpen && (
        <div className="modal">
          <div className="modalOpenImage" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setLightboxOpen(false)}>X</span>
            <img src={`/api/${userImages[selectedImageIndex]}`} alt={`Imagem Ampliada`} />
          </div>
        </div>
      )}
    </Box>
  );
};

export default UserList;
