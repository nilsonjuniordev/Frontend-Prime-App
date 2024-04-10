import GlobalStyle from "../styles/global";
import { Link } from 'react-router-dom';

const Home = () => (
  <>
  
    <div className='ContainerDefaultH'>
      <div className="textCenter">
      <div className="ContentApp">

      <h2>Bem-vindo a Prime TXT! </h2>

      <p>
      Aqui na Prime , buscamos proporcionar uma experiência excepcional, seja na busca por talentos ou no desenvolvimento de carreiras.
        </p>
   
        <p><br/>
        Por favor, selecione uma opção:
        </p>
   
       <Link to="/loginUser">
          <button className="btnMenu">Colaborador</button>
        </Link>

        <Link to="/LoginRh">
          <button className="btnMenu">Recrutador</button>
        </Link>
      </div>  
 
       </div></div>
   
  
    <GlobalStyle />
  </>
);

export default Home;
