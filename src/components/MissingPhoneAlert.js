import React from 'react';
import { 
  Box,
  Typography,
  Button,
  Collapse,
  IconButton
} from '@mui/material';
import { Close, Phone } from '@mui/icons-material';

const MissingPhoneAlert = ({ show, onClose, onAddPhoneClick }) => {
  return (
    <Collapse in={show}>
      <Box
        sx={{
          position: 'fixed',
          top: 64, // Ajuste conforme a altura da sua AppBar
          left: 0,
          right: 0,
          zIndex: 1100, // Abaixo da AppBar (que geralmente tem zIndex: 1200)
          backgroundColor: '#fff3f3', // Fundo levemente vermelho
          color: '#d32f2f', // Texto vermelho
          borderBottom: '1px solid #ffcdd2',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box display="flex" alignItems="center">
          <Phone color="error" sx={{ mr: 1 }} />
          <Typography variant="body2">
            <strong>Atenção:</strong> Você não tem um telefone cadastrado. Por favor, adicione um telefone para contato para poder cadastrar veículos.
          </Typography>
        </Box>
        
        <Box>
          <Button 
            variant="text" 
            size="small" 
            onClick={onAddPhoneClick}
            sx={{ color: '#d32f2f', mr: 1 }}
          >
            Adicionar telefone
          </Button>
          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Collapse>
  );
};

export default MissingPhoneAlert;