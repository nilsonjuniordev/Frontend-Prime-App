import GlobalStyle from "../styles/global";
import { Link } from 'react-router-dom';

const LoginRh = () => (
  <>
  
    <div className='ContainerDefaultRh'>
    <Link to="/" className="voltar">
          <p>Início</p> 
        </Link>

      <div className="textCenter">
      <h2>Bem-vindo recrutador! </h2><br/>


        <p>
        Faça login ou cadastre-se para utilizar nossas ferramentas de integração de novos colaboradores.
        </p><br/>
   
  
       
        <Link to="/loginCnpj">
          <button className="btnMenu">Login</button>
        </Link>

        <Link to="/RegisterCnpj">
          <button className="btnMenu">Cadastro</button>
        </Link>
      </div>  
 
       </div>
   


   
    <GlobalStyle />
  </>
);

export default LoginRh;
