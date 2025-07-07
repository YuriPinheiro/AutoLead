import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa os estilos do AOS
import RegisterPage from './pages/auth/RegisterPage';
import RecoverPasswordPage from './pages/auth/RecoverPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './routes/PrivateRoute';
import TermsAndConditions from './pages/TermsAndConditions';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { styled } from '@mui/system';

const WhatsAppFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: '#25D366',
  color: 'white',
  '&:hover': {
    backgroundColor: '#128C7E',
  },
  zIndex: 1101,
  [theme.breakpoints.down('sm')]: { 
    bottom: theme.spacing(12), 
    right: theme.spacing(1)
  }
}));

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      easing: 'ease-in-out', // Efeito de animação
      once: true, // Se `true`, a animação ocorre apenas uma vez
    });
  }, []);

  const whatsappNumber = '5554981702266'; // Substitua pelo número correto
  const whatsappMessage = 'Olá, gostaria de mais informações!'; // Mensagem padrão

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/recuperar-senha" element={<RecoverPasswordPage />} />
          <Route path="/termos-e-condicoes" element={<TermsAndConditions />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Router>
      {/* Botão flutuante do WhatsApp */}
      <WhatsAppFab
        color="primary"
        aria-label="WhatsApp"
        onClick={handleWhatsAppClick}
      >
        <WhatsAppIcon fontSize="large" />
      </WhatsAppFab>
    </ThemeProvider>
  );
};

export default App;
