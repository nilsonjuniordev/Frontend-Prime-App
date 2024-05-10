// MyData.js
import React from 'react';
import UserData from '../components/UserData';
import SideBarUser from '../components/SideBarUser';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';


const MyData = ({ userId }) => {

  console.log('userId no MyData:', userId);
  
  const theme = useTheme();

  return (
    <>
  <SideBarUser /> 
      <Box
        component="main"
        sx={{
          marginTop: 5, p: 3, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 4, // Reduz a margem para dispositivos móveis
          },
        }}
      >

      
      <UserData iduser={userId} />
      </Box></>
    
  );
};

export default MyData;
