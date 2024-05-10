import React, { useEffect, useState } from "react";
import SideBarRh from "../components/SideBarRh";
import "../styles/styles.css";
import Dashboard from "../components/DashBoard";
import { useTheme } from '@mui/material';
import { Box } from "@mui/material";

const AdminRh = () => {

 
  const [userName, setUserName] = useState("");

  const theme = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");


    fetch(`/api/${userId}`)
      .then((response) => response.json())
      .then((data) => {
      
        const name = data.nome;

             setUserName(name);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  }, []);



  return (  
      <>
   <SideBarRh />
   <Box
        component="main"
        sx={{
          marginTop: 15, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 10, // Reduz a margem para dispositivos móveis
          },
        }}
      >  

    <div className="ContentApp">
      <div><h3><b>Bem vindo, {userName || "visitante"}</b></h3>
      <p>
Adicione novos colaboradores, acompanhe o status de cada etapa do processo e faça o download dos documentos relevantes com facilidade. Estamos aqui para ajudá-lo a construir uma equipe de sucesso. Seja bem-vindo e aproveite ao máximo nossa plataforma!</p></div>
          
<Dashboard />
        
    </div></Box>

    </>
  );
};

export default AdminRh;
