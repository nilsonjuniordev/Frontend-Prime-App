import GlobalStyle from "../styles/global";
import { Link } from 'react-router-dom';

const LoginUser = () => (
  <>
 
    <div className='ContainerDefaultUser'>

    <Link to="/" className="voltar">
          <p>Início</p> 
        </Link>

      <div className="textCenter">
      <h2>Bem-vindo colaborador! </h2><br/>


        <p>
          Para garantir a continuidade do seu processo, solicitamos que faça login com suas
          informações ou, se ainda não o fez, cadastre-se agora.
        </p><br/>
     
       
        <Link to="/login">
          <button className="btnMenu">Login</button>
        </Link>

        <Link to="/Register">
          <button className="btnMenu">Cadastro</button>
        </Link>


      

      </div>   
 
       </div>
   


   
    <GlobalStyle />
  </>
);

export default LoginUser;
