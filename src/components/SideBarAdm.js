import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { FaBars } from 'react-icons/fa';

const SideBarAdm = () => {
  
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
            <Link to="/Admin">
        <img className='navLogo' src="/assets/logo_prime_azul_ret.jpg" alt='' /> 
        </Link>

        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h3>ADM PRIME TXT</h3><br/>
      <Link to="/Admin" className="menu-itemT">
          
          <p>DashBoard e relatórios</p>
        </Link>

        <Link to="/RegisterAdm" className="menu-itemT">
          
          <p>Adicionar novo Colaborador</p>
        </Link>

        <Link to="/RegisterAdmRh" className="menu-itemT">
          
          <p>Adicionar novo Recrutadorr</p>
        </Link>

        <Link to="/ListarAdm" className="menu-itemT">
        
          <p>Visualizar cadastros</p>
        </Link>
     
       <Link to="" className="menu-itemT">
       
          <p>Currículos (em breve)</p>
        </Link>
        <Link to="/MyDataAdm" className="menu-itemT">
         
          <p>Minha conta</p>
        </Link>
        <Link  className="menu-itemT" onClick={handleLogout}>
      
          <p>Sair</p>
        </Link> </div>
      </div>

  );
};

export default SideBarAdm;
