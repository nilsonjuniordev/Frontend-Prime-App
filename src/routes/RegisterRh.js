import GlobalStyle from "../styles/global.js";
import FormRh from "../components/FormRh.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SideBarRh from "../components/SideBarRh.js";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material';

function RegisterRH() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const theme = useTheme();

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
      
      <SideBarRh /> 
      <Box
        component="main"
        sx={{
          marginTop: 7, p: 3, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 7, // Reduz a margem para dispositivos móveis
          },
        }}
      >

          <h3>Adicionar colaborador</h3>
          <p>
            Para iniciar o processo, cadastre um novo colaborador. Em seguida,
            ele receberá um convite para acessar a plataforma com seu NOME e CPF, onde poderá
            completar seus dados e enviar os documentos
            necessários.
          </p>{" "}
          <br />
          <FormRh
            onEdit={onEdit}
            setOnEdit={setOnEdit}
            getUsers={getUsers}
            users={users}
          />
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.BOTTOM_LEFT}
          />
          <GlobalStyle />
        
      </Box>
     
    </>
  );
}

export default RegisterRH;
