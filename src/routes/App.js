// App.js
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from '../components/Loading';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../styles/theme';
import { Box } from '@mui/material';
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
    <ThemeProvider theme={lightTheme}>
      <Box  sx={{typography: 'body1'}}>


     
 
        {isLoading ? <Loading /> : <Outlet />}
 
     </Box>
    </ThemeProvider>
  );
}

export default App;
