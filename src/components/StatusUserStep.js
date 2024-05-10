import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';

const StatusUserStep = () => {
  const [userData, setUserData] = useState(null);
  const themeContext = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    //API para obter os dados do usuário
    fetch(`/api/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados do usuário:", error);
      });
  }, []);

  const steps = [
    'Complete seu cadastro',
    'Documentos solicitados',
    'Envio de exames',
  ];

  let activeStep = 0;

  if (userData) {
    if (!userData.rg || !userData.cep || !userData.rua || !userData.numero) {
      activeStep = 0;
    } else if (!userData.uploadsPath) {
      activeStep = 1;
    } else if (!userData.uploadsPathAso) {
      activeStep = 2;
    } else {
      activeStep = 3;
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="left"
      sx={{ p: 3 }}
    >
      <Box sx={{ width: '100%' ,  p: 3, backgroundColor: themeContext.palette.card1?.main, borderRadius: 3, }}>
        <Typography >Para concluir o processo solicitado, convidamos você a seguir os passos abaixo</Typography>
        <Grid container direction="column" alignItems="left">
          <Grid item>
          <Stepper  activeStep={activeStep} sx={{ borderRadius: '16px', flexDirection: { xs: 'column', sm: 'row' } }}>
  {steps.map((label, index) => (
    <Step sx={{ p:2}} display="flex" alignItems="flex-start" key={label} completed={index < activeStep}>
      <StepLabel StepIconProps={{ style: { color: index === activeStep ? '#FDEE00' : '#633687' } }}>{label}</StepLabel>
    </Step>
  ))}
</Stepper>


          </Grid>
          <Grid item>
            <Box>
              {activeStep === 0 && (
                <Typography>
                  Por favor, complete seu cadastro. <Link to="/MyData">Ir para Cadastro</Link>
                </Typography>
              )}
              {activeStep === 1 && (
                <Typography>
                  Obrigado por completar seu cadastro! <Link to="/Upload">Enviar Documentos</Link>
                </Typography>
              )}
              {activeStep === 2 && (
                <Typography>
                  Obrigado por enviar os documentos! <Link to="/UploadExame">Enviar Exames</Link>
                </Typography>
              )}
              {activeStep === 3 && (
                <Box>
                  <Typography variant="h5" component="div">
                    Parabéns! Seu processo foi concluído com sucesso!
                  </Typography>
                  <Typography sx={{ mt: 2 }} color="text.secondary">
                    ...
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default StatusUserStep;
