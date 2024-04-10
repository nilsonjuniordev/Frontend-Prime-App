import React from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="ContainerApp">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
