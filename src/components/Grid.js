import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");


const Table = styled.table`
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  padding: 15px 15px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Td = styled.td`
  padding: 15px 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;


const Lightbox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxContent = styled.div`
  position: relative;
  max-width: 80%;
  max-height: 80%;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
`;

const Grid = ({ users, setUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (user) => {
    setEditingUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalIsOpen(false);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handleEdit = (item) => {
    openModal(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("https://191.184.72.124:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.iduser !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  };

  const handleSave = async () => {
    try {
      const { iduser, ...userData } = editingUser;
      await axios.put(`https://191.184.72.124:8800/${iduser}`, userData);
      toast.success("Dados do usuário atualizados com sucesso.");
      closeModal();
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      toast.error("Erro ao atualizar dados do usuário.");
    }
  };

  const displayFields = ["iduser", "nome", "email", "fone", "data"];

  return (
    <div className="ContainerGrid">
      <Table>
        <Thead>
          <Tr>
            {displayFields.map((field, i) => (
              <Th key={i}>{field}</Th>
            ))}
            <Th onlyWeb></Th>
            <Th onlyWeb></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, i) => (
            <Tr key={i}>
              {displayFields.map((field, j) => (
                <Td key={j}>{item[field]}</Td>
              ))}
              <Td alignCenter width="5%">
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
              <Td alignCenter width="5%">
                <FaTrash onClick={() => handleDelete(item.iduser)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Usuário"
      >
        <ModalContainer>
          {editingUser && (
            <>
              {displayFields.map((field, i) => (
                <label key={i}>
                  {field}:{" "}
                  <input
                    type="text"
                    value={editingUser[field]}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        [field]: e.target.value,
                      })
                    }
                  />
                </label>
              ))}
              <ModalButtonContainer>
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={handleSave}>Salvar</button>
              </ModalButtonContainer>
            </>
          )}
        </ModalContainer>


        {editingUser && (
  <div className="ImageGallery">
    {editingUser.uploadsPath.split(", ").map((path, index) => (
      <div key={index} className="ImageGalleryItem" onClick={() => openLightbox(index)}>
        <img
          src={`https://191.184.72.124:8800/${path.trim()}`}
          alt={`Imagem ${index}`}
        />
      </div>
    ))}
  </div>
)}

{lightboxOpen && (
  <Lightbox>
    <LightboxContent>
      <CloseButton onClick={closeLightbox}>Fechar</CloseButton>
      <img
        src={`https://191.184.72.124:8800/${editingUser.uploadsPath.split(", ")[selectedImageIndex].trim()}`}
        alt={`Imagem ${selectedImageIndex}`}
      />
    </LightboxContent>
  </Lightbox>
)}


      </Modal>
     

    </div>
  );
};

export default Grid;
