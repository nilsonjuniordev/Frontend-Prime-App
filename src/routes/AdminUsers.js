// MyData.js
import React from 'react';
import UserData from '../components/UserData';
import { Link } from 'react-router-dom';

const AdminUsers = ({ userId }) => {
  console.log('userId no MyData:', userId);

  return (
    <div className='ContainerDefault'>
<Link to="/MyAccount" className="voltar">
          <p>Voltar</p> 
        </Link>

  <Link to="/MyAccount" className="voltar">
          <p>Voltar</p> 
        </Link>
      <UserData iduser={userId} />
    </div>
    
  );
};

export default AdminUsers;
