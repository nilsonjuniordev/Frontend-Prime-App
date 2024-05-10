import GlobalStyle from "../styles/global.js";
import FormCadastroRh from "../components/FormCadastroRh.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SideBarAdm from "../components/SideBarAdm.js";
import NavBar from "../components/NavBar.js";

function RegisterAdm() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("https://191.184.72.124:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      
        <SideBarAdm />

        <div className="ContainerApp70">
        <NavBar />
        <div className="ContentApp">
        <h1  style={{ textAlign: 'center'}}> Cadastro Recrutador Iboard</h1>
        <p style={{ textAlign: 'center'}}>Preencha cada campo do formulário com suas informações pessoais atualizadas. </p> <br/>
        <FormCadastroRh onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} users={users} />
     
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
        </div></div>
     
    </>
  );
}

export default RegisterAdm;
