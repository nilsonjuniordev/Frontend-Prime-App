
import React from 'react';
import UserDataRh from '../components/UserDataRh';
import NavBar from '../components/NavBar';
import SideBarAdm from '../components/SideBarAdm';
const MyDataAdm = ({ userId }) => {


  return (

    <div className="ContainerApp100T">

    <SideBarAdm />

    <div className='ContainerApp70'>
    <NavBar />

    <div className="ContentApp">

      <UserDataRh iduser={userId} />
    </div></div></div>
    
  );
};

export default MyDataAdm;
