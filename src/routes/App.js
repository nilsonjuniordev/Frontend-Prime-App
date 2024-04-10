// src/routes/App.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyle from '../styles/global';

import Footer from '../components/Footer';
import Loading from '../components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulando um tempo de carregamento
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Limpa o timeout quando o componente é desmontado
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="ContainerApp">
       
        {isLoading ? <Loading /> : <Outlet />} 
        <Footer />
      </div>
      <GlobalStyle />
    </>
  );
}

export default App;
