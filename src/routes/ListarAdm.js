import React, { useState, useEffect } from "react";
import axios from "axios";
import UserListAdm from "../components/UserListAdm";
import SideBarAdm from "../components/SideBarAdm";
import NavBar from "../components/NavBar";

const ListarAdm = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Obter userId do localStorage
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("ID do usuário não encontrado no localStorage.");
      return;
    }

    // Fazer uma solicitação ao servidor para buscar os detalhes do usuário atual
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(`https://191.184.72.124:8800/${userId}`);
        setCurrentUser(result.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // Fazer uma solicitação ao servidor para buscar todos os usuários
    const fetchAllUsers = async () => {
      try {
        const result = await axios.get("https://191.184.72.124:8800/");
        setUsers(result.data);
      } catch (error) {
        console.error("Erro ao buscar todos os usuários:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSendMessage = (phoneNumber) => {
    console.log("Enviar mensagem para:", phoneNumber);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Envie uma solicitação DELETE para o servidor para excluir o usuário
      await axios.delete(`https://191.184.72.124:8800/${userId}`);
      // Atualize a lista de usuários após a exclusão
          window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SideBarAdm />
      <div className="ContainerApp70">
        <NavBar />
        <div className="ContentApp">
          <div className="SearchRh">
            <h3>Pesquisar Cadastros</h3>
            <input
              type="text"
              placeholder="Pesquisar colaborador"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <UserListAdm
            users={filteredUsers}
            onSendMessage={handleSendMessage}
            onDeleteUser={handleDeleteUser}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
};

export default ListarAdm;
