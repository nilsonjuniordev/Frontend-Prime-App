import React, { useState, useEffect } from "react";
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardWellcome = () => {
  const [userName, setUserName] = useState("");
  const themeContext = useTheme();
  const theme = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // API para obter os dados do usuário
    fetch(`/api/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const name = data.nome;
        setUserName(name);
      });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ p: 3 }}
    >
      <Card
        sx={{
          width: '100%', // Largura fixa para dispositivos maiores
          position: 'relative',
          overflow: 'visible',
          padding:1,
          backgroundColor: themeContext.palette.card1?.main,
          borderRadius: 2,
          margin: 'auto', // Centraliza o Card horizontalmente
          minHeight: '140px', 
          [theme.breakpoints.down('sm')]: {
            minHeight: '270px', 
            padding:0,
          },
          maxWidth: '100%', // Define uma largura máxima para dispositivos menores
        }}
      >
        <CardMedia
          component="img"
          src="/assets/man-coff.png"
          alt="coff"
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '50px',
            [theme.breakpoints.down('sm')]: {
              right: -0,
              width: '250px', 
            },
            width: '360px',
            borderRadius: '16px',
           
          }}
        />
        <CardContent>
          <Typography sx={{ width: '100%' }}> Bem vindo, {userName || "visitante"}!</Typography>
          <Typography sx={{ width: '100%' }} color="text.secondary">
            É com grande satisfação que o recebemos em nossa plataforma.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CardWellcome;
