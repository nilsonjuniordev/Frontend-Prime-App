// MyData.js
import React from 'react';
import UserData from '../components/UserData';
import NavBar from '../components/NavBar';
import SideBarUser from '../components/SideBarUser';

const MyData = ({ userId }) => {
  console.log('userId no MyData:', userId);

  return (
    <>
   
  <SideBarUser />


      <div className="ContainerApp70">
      <NavBar />
      <div className="ContentApp">
      <UserData iduser={userId} />
    </div></div></>
    
  );
};

export default MyData;
