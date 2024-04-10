// MyData.js
import React from 'react';
import UserDocs from '../components/UserDocs';
import NavBar from '../components/NavBar';
import SideBarUser from '../components/SideBarUser';

const MyDocs = ({ userId }) => {

  return (
    <>
   
  <SideBarUser />


      <div className="ContainerApp70">
      <NavBar />
      <div className="ContentApp">
      <UserDocs iduser={userId} />
    </div></div></>
    
  );
};

export default MyDocs;
