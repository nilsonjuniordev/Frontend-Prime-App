import GlobalStyle from "../styles/global";
import Grid from "../components/Grid";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Listar({ userId }) {
  const [users, setUsers] = useState([]);
  const [ setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token recuperado em Listar:', token);

      const res = await axios.get("https://191.184.72.124:8800", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
     <div className='ContainerDefault'>
     <Link to="/Admin" className="voltar">
          <p>Voltar</p> 
        </Link>
        <h3>Colaboradores: </h3>
          
        <Grid
          setOnEdit={setOnEdit}
          users={users}
          setUsers={setUsers}
        
        />
      
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle /></div>
    </>
  );
}

export default Listar;
