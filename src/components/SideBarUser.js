import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/styles.css";
import { FaBars } from 'react-icons/fa';

const SideBarUser = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/Login");
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menuSideContainer">               
    <div className="hamburger" onClick={toggleMenu}>
                <FaBars color="#fff" size={32} />    
            </div> 
            
            <Link to="/MyAccount">
            <img className='navLogo' src="/assets/logo_prime_azul_ret.jpg" alt='' />
            </Link>
            {/* Menu Sidebar */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            
                <h3>Minha conta</h3><br/>
                <Link to="/MyAccount" className="menu-itemT">
                    <p>Processo do exame</p>
                </Link>
                <Link to="/MyData" className="menu-itemT">
                    <p>Meu cadastro</p>
                </Link>
                <Link to="/Upload" className="menu-itemT">
                    <p>Enviar documentos</p>
                </Link>
                <Link to="/UploadExame" className="menu-itemT">
                    <p>Enviar exame ASO</p>
                </Link>
                <Link to="/MyDocs" className="menu-itemT">
                    <p>Documentos enviados</p>
                </Link>
                <Link to="" className="menu-itemT">
                    <p>Meu currículo (em breve)</p>
                </Link>
                <Link to="" className="menu-itemT" onClick={handleLogout}>
                    <p>Sair</p>
                </Link>
            </div>
        </div>
    );
};

export default SideBarUser;
