import React, { useEffect, useState } from "react";
import SideBarAdm from "../components/SideBarAdm";
import "../styles/styles.css";
import DashboardAdm from "../components/DashBoardAdm";
import NavBar from '../components/NavBar';

const Admin = () => {

 
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
   <SideBarAdm />
  <div className="ContainerApp70">    
    <NavBar />
    <div className="ContentApp">
      <div><h3><b>Bem vindo, {userName || "visitante"}</b></h3>
      <p>Admnistração Prime TXT</p></div>
          
<DashboardAdm />
        
    </div></div>

    </>
  );
};

export default Admin;
