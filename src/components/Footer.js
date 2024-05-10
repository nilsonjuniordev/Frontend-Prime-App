import React from 'react';
import { Box, useTheme} from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const themeContext = useTheme();


  return (
    <Box  sx={{ backgroundColor: themeContext.palette.footer?.main }} >
      
      <p>&copy; Prime TXT {currentYear} - Todos os direitos reservados</p>
  
    </Box>
  );
}

export default Footer;
