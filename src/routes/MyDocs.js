// MyData.js
import React from 'react';
import UserDocs from '../components/UserDocs';
import SideBarUser from '../components/SideBarUser';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
const MyDocs = ({ userId }) => {
  const theme = useTheme();
  return (
    <>
   <SideBarUser /> 
      <Box
        component="main"
        sx={{
          marginTop: 10, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 10, // Reduz a margem para dispositivos móveis
          },
        }}
      >
    
      <UserDocs iduser={userId} />
      </Box></>
    
  );
};

export default MyDocs;
