import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import SideBarRh from "../components/SideBarRh";
import { useTheme } from '@mui/material';
import { Box } from "@mui/material";

const Listar = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const theme = useTheme();

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
        const result = await axios.get(`/api/${userId}`);
        setCurrentUser(result.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    // Fazer uma solicitação ao servidor para buscar todos os usuários com o mesmo id_cnpj
    const fetchUsersByCnpj = async () => {
      try {
        const result = await axios.get(`/api/?cnpj=${currentUser.id_cnpj}`);
        // Filtrar os usuários para excluir o usuário atual
        const filteredUsers = result.data.filter((user) => user.iduser !== currentUser.iduser);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários pelo id_cnpj:", error);
      }
    };

    fetchUsersByCnpj();
  }, [currentUser]);

  const handleSendMessage = (phoneNumber) => {
    console.log("Enviar mensagem para:", phoneNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <SideBarRh /> 
      <Box
        component="main"
        sx={{
          marginTop: 7, p: 3, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 7, // Reduz a margem para dispositivos móveis
          },
        }}
      >  
      <Box>   
            
        <div className="SearchRh">
          <h3>Colaboradores</h3>
        <div>
          <input
            type="text"
            placeholder="Pesquisar colaborador"
            value={searchTerm}
            onChange={handleSearch}
          /></div>
        </div>

        <UserList
          users={filteredUsers}
          onSendMessage={handleSendMessage}
          currentUser={currentUser}
        />
     </Box>
      </Box>
    </>
  );
};

export default Listar;
