import React, { useEffect, useState } from "react";
import SideBarRh from "../components/SideBarRh";
import "../styles/styles.css";
import Dashboard from "../components/DashBoard";
import NavBar from '../components/NavBar';

const AdminRh = () => {

 
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");


    fetch(`https://191.184.72.124:8800/${userId}`)
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
  <div className="ContainerApp70">    
    <NavBar />
    <div className="ContentApp">
      <div><h3><b>Bem vindo, {userName || "visitante"}</b></h3>
      <p>
Adicione novos colaboradores, acompanhe o status de cada etapa do processo e faça o download dos documentos relevantes com facilidade. Estamos aqui para ajudá-lo a construir uma equipe de sucesso. Seja bem-vindo e aproveite ao máximo nossa plataforma!</p></div>
          
<Dashboard />
        
    </div></div>

    </>
  );
};

export default AdminRh;
