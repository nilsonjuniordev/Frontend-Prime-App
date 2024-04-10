
import React from 'react';
import UserDataRh from '../components/UserDataRh';
import NavBar from '../components/NavBar';
import SideBarRh from '../components/SideBarRh';
const MyDataRh = ({ userId }) => {


  return (

    <div className="ContainerApp100T">

    <SideBarRh />

    <div className='ContainerApp70'>
    <NavBar />

    <div className="ContentApp">

      <UserDataRh iduser={userId} />
    </div></div></div>
    
  );
};

export default MyDataRh;
