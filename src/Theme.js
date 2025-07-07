import { createTheme } from '@mui/material/styles';


// Definindo o tema com as cores personalizadas
const theme = createTheme({
  palette: {
    primary: {
      main: '#18E8DB',
      contrastText: '#282828', // Cor do texto quando sobre primary.main
    },
    secondary: {
      main: '#F49841',
      contrastText: '#282828', // Cor do texto quando sobre secondary.main
    },
    background: {
      default: '#FFFFFF',
      paper: '#282828',
      container: '#F2F2F2',
      primary: "#18E8DB"
    },
    text: {
      primary: '#282828',
      secondary: '#FFFFFF'
    },
  },
  colors: {
    primary: '#18E8DB',
    secondary: '#F49841',
    dark: '#282828',
    light: '#FFFFFF'
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f5f5f5',
          '& .MuiAutocomplete-option': {
            '&:hover': {
              backgroundColor: '#e0e0e0', // Cor quando passa o mouse
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: "#282828", // Cor do label normal
            '&.Mui-focused': {
              color: "#18E8DB", // Cor do label quando em foco
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff', // Fundo branco
          color: '#333333', // Cor do texto
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#000000", // Cor preta quando desmarcado
          '&.Mui-checked': {
            color: "#18E8DB", // Cor primária quando marcado
          },
          '&:hover': {
            backgroundColor: 'rgba(24, 232, 219, 0.08)', // Efeito hover sutil
          },
        },
      },
    }
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
