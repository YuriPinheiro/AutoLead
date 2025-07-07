import React from 'react';
import Grid from "@mui/material/Grid2";
import useStyles from '../styles/sections/HeroSection';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const onClickRegister = () => {
        navigate("/registro");
    }

    const onClickLogin = () => {
        navigate("/login");
    }

    return (
        <div id='home-section'>
            <Grid container className={classes.container} justifyContent={"center"}>
                <div className={classes.overlay} />
                <Grid size={{ xs: 12, md: 6 }} className={classes.content}>
                    <Typography variant='h2' className={classes.title}>Venda seu carro sem burocracia.</Typography>
                    <Typography variant='h5'>Anuncie no app e tenha uma proposta em até 24 horas.</Typography>
                    
                    {/* Adicione alguns benefícios em bullet points */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <span style={{ marginRight: '8px' }}>✓</span> Avaliação gratuita do seu veículo
                        </Typography>
                        <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <span style={{ marginRight: '8px' }}>✓</span> Proposta rápida em até 24h
                        </Typography>
                    </Box>
                </Grid>
                <Grid className={classes.form}>
                    <Card className={classes.formCard}>
                        <CardContent>
                            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                                <Typography variant='h6' sx={{ mb: 2 }}>Comece agora mesmo</Typography>
                                
                                {/* Botão principal com ícone */}
                                <Button 
                                    onClick={onClickRegister}
                                    className={classes.button} 
                                    variant='contained'
                                    size='large'
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    Cadastre-se Gratuitamente
                                </Button>
                                
                                <Typography variant='body2' sx={{ mb: 2 }}>
                                    Ou entre com:
                                </Typography>
                                
                                {/* Botões de login social */}
                                <Button 
                                    onClick={onClickLogin}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 2, color: 'white', borderColor: "white"}}
                                >
                                    Google
                                </Button>
                                
                                <Typography variant='body2' sx={{ mt: 2 }}>
                                    Já tem uma conta? <span 
                                        style={{ color: 'white', cursor: 'pointer' }}
                                        onClick={onClickLogin}
                                    >
                                        Faça login
                                    </span>
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default HeroSection;