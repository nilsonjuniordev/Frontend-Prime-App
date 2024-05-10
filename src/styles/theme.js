import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F4F5FA', // Cor primária
    },
    secondary: {
      main: '#633687', // Cor secundária
    },
    navbar: {
      main: '#F4F5FA', // Cor do navbar
    },
    sidebar: {
      main: '#F4F5FA', // Cor do sidebar
    },
    card1: {
      main: '#F4F5FA' // Cor do logo
    },
    logo: {
      main: '#F4F5FA', // Cor do logo
    },
    footer: {
      main: '#633687', // Cor do footer
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Definindo a fonte global como Roboto
    // Outras configurações de tipografia
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '5rem', // Tamanho das bolinhas
        },
        active: {
          color: '#633687', // Cor das bolinhas ativas
        },
        completed: {
          color: '#F4F5FA', // Cor das bolinhas completadas
        },
      },
    },
  },
  // Outras configurações de tema
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#633687', // Cor primária
    },
    secondary: {
      main: '#F4F5FA', // Cor secundária
    },
    navbar: {
      main: '#633687', // Cor do navbar
    },
    sidebar: {
      main: '#633687', // Cor do sidebar
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Definindo a fonte global como Roboto
    // Outras configurações de tipografia
  },
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          fontSize: '2rem', // Tamanho das bolinhas
        },
        active: {
          color: '#F4F5FA', // Cor das bolinhas ativas
        },
        completed: {
          color: '#633687', // Cor das bolinhas completadas
        },
      },
    },
  },
  // Outras configurações de tema
});

export { lightTheme, darkTheme }; // Exportando ambas as variáveis
