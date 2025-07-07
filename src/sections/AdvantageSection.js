import React from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/AdvantageSection';
import { Box, Divider, Typography } from '@mui/material';


const AdvantageSection = () => {

    const classes = useStyles(); 

    const AdvantageItem = (props) => {

        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Typography className={classes.advantageTitle}>{props.title}</Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography className={classes.advantageSubtitle}>{props.subtitle}</Typography>
                    </Grid>
                </Grid>
            </Box>
        )
    }
    return (
        <Grid container className={classes.container} justifyContent={"center"} spacing={2}>
            <Grid size={12} data-aos={"fade-down"}>
                <Typography className={classes.title} variant='h3'>Nossos diferenciais</Typography>
            </Grid>
            <Grid size={12} data-aos={"fade-up"}>
                <Typography className={classes.subtitle} variant='subtitle1'>Temos uma equipe especialista em veículos para garantir a melhor negociação.</Typography>
            </Grid>
            <Grid size={12}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container className={classes.itensContainer} spacing={4} justifyContent={'center'}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ flexGrow: 1 }}  data-aos={"fade-right"}>
                                <AdvantageItem
                                    title={"TRANSPARÊNCIA"}
                                    subtitle={"Processo transparente, você acompanha cada etapa da venda."}
                                />
                            </Box>
                            <Divider sx={{ my: 2, borderColor: 'grey.700' }} />
                            <Box sx={{ flexGrow: 1 }} data-aos={"fade-right"}>
                                <AdvantageItem
                                    title={"TECNOLOGIA"}
                                    subtitle={"Utilizamos ferramentas e técnicas avançadas para avaliar e divulgar seu veículo no mercado."}
                                />
                            </Box>
                            <Divider sx={{ my: 2, borderColor: 'grey.700' }} />
                            <Box sx={{ flexGrow: 1 }} data-aos={"fade-right"}>
                                <AdvantageItem
                                    title={"REDE"}
                                    subtitle={"Atuamos com uma ampla rede de parceiros comerciais, buscamos a melhor oferta para o seu veículo."}
                                />
                            </Box>
                            <Divider sx={{ my: 2, borderColor: 'grey.700', display: { md: 'none', xs: 'block' } }} />
                        </Grid>

                        {/* Divisor vertical */}
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ borderColor: 'grey.700', display: { xs: 'none', md: 'block' } }}
                        />

                        {/* Coluna da direita */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box sx={{ flexGrow: 1 }} data-aos={"fade-left"}>
                                <AdvantageItem
                                    title={"SEGURANÇA"}
                                    subtitle={"Garantimos segurança em todas as etapas do processo, do início ao fim."}
                                />
                            </Box>
                            <Divider sx={{ my: 2, borderColor: 'grey.700' }} />
                            <Box sx={{ flexGrow: 1 }} data-aos={"fade-left"}>
                                <AdvantageItem
                                    title={"ATENDIMENTO PERSONALIZADO"}
                                    subtitle={"Consultoria especializada para garantir a melhor oferta."}
                                />
                            </Box>
                            <Divider sx={{ my: 2, borderColor: 'grey.700' }} />
                            <Box sx={{ flexGrow: 1 }} data-aos={"fade-left"}>
                                <AdvantageItem
                                    title={"APLICATIVO PRÓPRIO"}
                                    subtitle={"Aplicativo onde você pode cadastrar seu veículo de forma rápida e segura."}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

        </Grid>
    );
};

export default AdvantageSection;
