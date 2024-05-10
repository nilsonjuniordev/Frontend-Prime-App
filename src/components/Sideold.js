import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { FaBars } from 'react-icons/fa';

const SideBarRh = () => {
  
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);


    const handleLogout = () => {
      localStorage.removeItem("specificToken");
      localStorage.removeItem("userId");
      navigate("/LoginCnpj");
     
    };


    const toggleMenu = () => {
      setIsOpen(!isOpen);
  };

    
  return (
      
 
      <div className="menuSideContainer">

<div className="hamburger" onClick={toggleMenu}>
                <FaBars color="#fff" size={32} />    
            </div>

            <Link to="/AdminRh" >
               <img className='navLogo' src="/assets/logo_prime_azul_ret.jpg" alt='' /> 
               </Link>
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h3>Área do recrutador</h3><br/>
      <Link to="/AdminRh" className="menu-itemT">
          
          <p>DashBoard e relatórios</p>
        </Link>

        <Link to="/RegisterRH" className="menu-itemT">
          
          <p>Adicionar Colaborador</p>
        </Link>
        <Link to="/Listar" className="menu-itemT">
        
          <p>Visualizar Processos</p>
        </Link>
        <Link to="" className="menu-itemT">
       
          <p>Currículos (em breve)</p>
        </Link>
        <Link to="/MyDataRh" className="menu-itemT">
         
          <p>Minha conta</p>
        </Link>
        <Link  className="menu-itemT" onClick={handleLogout}>
      
          <p>Sair</p>
        </Link> </div>
      </div>

  );
};

export default SideBarRh;
