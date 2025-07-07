import React, { useState } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/CallToActionSection';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

import { ReactComponent as PhoneContactIcon } from "../assets/PhoneContactIcon.svg";
import { ReactComponent as HomeContactIcon } from "../assets/HomeContactIcon.svg";
import { ReactComponent as HourContactIcon } from "../assets/HourContactIcon.svg";
import { ReactComponent as EmailContactIcon } from "../assets/EmailContactIcon.svg";

import LocalConfig from '../LocalConfig';

const CallToActionSection = () => {

    const classes = useStyles(); 

    const [formValues, setFormValues] = useState({
        name: "",
        contact: "",
        message: ""
    });

    const [error, setError] = useState(false);

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const onClickSend = () => {
        if (!formValues.name || !formValues.contact || !formValues.message) {
            setError(true);
            return
        }

        const data = formValues;

        const message = `
Olá, me chamo ${data.name}.

${data.message}

Contato: ${data.contact}
`.trim();

        const encodedMessage = encodeURIComponent(message);

        const url = `${LocalConfig.whatsappURL}?text=${encodedMessage}`;

        window.open(url, '_blank');
    }


    return (
        <div id='contacts-section'>
            <Grid container className={classes.container} justifyContent={"center"} spacing={2}>
                <Grid size={12} data-aos="fade-down">
                    <Typography className={classes.title} variant='h3'>CONTATOS</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ margin: "32px" }}>
                        <Grid container spacing={2}>
                            <Grid size={12} data-aos={'fade-right'}>
                                <Box>
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid alignSelf={'end'}>
                                            <PhoneContactIcon />
                                        </Grid>
                                        <Grid size={10}>
                                            <Typography className={classes.contactItem}>
                                                <a href={`tel:00000000000`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    (00) 00000-0000
                                                </a>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid size={12} data-aos={'fade-right'}>
                                <Box>
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid alignSelf={'end'}>
                                            <HomeContactIcon />
                                        </Grid>
                                        <Grid size={10}>
                                            <Typography className={classes.contactItem}>Cidade</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid size={12} data-aos={'fade-right'}>
                                <Box>
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid alignSelf={'end'}>
                                            <HourContactIcon />
                                        </Grid>
                                        <Grid size={10}>
                                            <Typography className={classes.contactItem}>Seg-Sex das 8:00h as 18:00h</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid size={12} data-aos={'fade-right'}>
                                <Box>
                                    <Grid container spacing={2} alignItems={'center'}>
                                        <Grid alignSelf={'end'}>
                                            <EmailContactIcon />
                                        </Grid>
                                        <Grid size={10}>
                                            <Typography className={classes.contactItem}>
                                                <a href="mailto:example@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    example@example.com
                                                </a>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} data-aos={'zoom-in-up'}>
                    <Grid container justifyContent={'center'}>
                        <Card className={classes.formCard}>
                            <CardContent >
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={3}>

                                        <Grid size={12}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid container>
                                                    <Grid size={12}>
                                                        <Typography className={classes.label}>Nome</Typography>
                                                    </Grid>
                                                    <Grid size={12}>
                                                        <TextField fullWidth name='name' error={error} onChange={onChange} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid container>
                                                    <Grid size={12}>
                                                        <Typography className={classes.label}>Telefone</Typography>
                                                    </Grid>
                                                    <Grid size={12}>
                                                        <TextField fullWidth name='contact' error={error} onChange={onChange} placeholder={"Telefone ou Email"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <Box sx={{ flexGrow: 1 }}>
                                                <Grid container>
                                                    <Grid size={12}>
                                                        <Typography className={classes.label}>Mensagem</Typography>
                                                    </Grid>
                                                    <Grid size={12}>
                                                        <TextField fullWidth multiline name='message' error={error} onChange={onChange} placeholder={"Gostaria de agendar uma avaliação"} id="outlined-basic" size='small' variant="outlined" className={classes.textField} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid size={12}>
                                            <Button className={classes.formButton} onClick={onClickSend} fullWidth variant='outlined'>Enviar</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid >
        </div>
    );
};

export default CallToActionSection;
