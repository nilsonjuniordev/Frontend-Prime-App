// MyAccount.js
import React from "react";
import "../styles/styles.css";
import SideBarUser from "../components/SideBarUser";
import StatusUserStep from "../components/StatusUserStep";
import Box from '@mui/material/Box';
import CardWellcome from "../components/CardWellcome";
import { useTheme } from '@mui/material';

const MyAccount = ({ toggleTheme }) => {
  const theme = useTheme();

  return (
    <>
      <SideBarUser /> 
      <Box
        component="main"
        sx={{
          marginTop: 15, // Margem para o AppBar
          [theme.breakpoints.down('sm')]: {
            marginTop: 10, // Reduz a margem para dispositivos móveis
          },
        }}
      >
        <CardWellcome/>
        <StatusUserStep />
      </Box>
    </>
  );
};

export default MyAccount;
