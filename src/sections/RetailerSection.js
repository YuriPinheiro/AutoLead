import React, { useState, useEffect, useRef } from 'react';
import Grid from "@mui/material/Grid2";
import useStyles from '../styles/sections/RetailerSection';
import { Box, Button, Card, CardContent, Grow, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import LocalConfig from "../LocalConfig";
import InputMask from 'react-input-mask';


const initialHeight = "200px";


function MaskedTextField({ mask, value, onChange, ...props }) {
    const inputRef = useRef(null);

    return (
        <InputMask mask={mask} value={value} onChange={onChange}>
            {(inputProps) => (
                <TextField
                    {...inputProps}
                    {...props}
                    inputRef={(ref) => {
                        inputRef.current = ref; // Atualiza a referência local
                        if (inputProps.ref) {
                            inputProps.ref(ref); // Atualiza a referência do InputMask
                        }
                    }}
                />
            )}
        </InputMask>
    );
}

const RetailerSection = () => {
    const [height, setHeight] = useState(initialHeight);

    // State único para todos os campos de texto
    const [formValues, setFormValues] = useState({
        name: '',
        identity: '',
        cnpj: '',
        phone: '',
        city: ''
    });

    const [error, setError] = useState(false);

    const theme = useTheme(); // Para usar os breakpoints
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é menor que 'md'

    const classes = useStyles(); // Usando o hook de estilos


    useEffect(() => {
    }, [formValues]);
    // Função onChange para atualizar os valores do formulário
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const onClickRegister = () => {
        if (height === initialHeight) {
            if (isMobile) {
                setHeight("720px");
            } else {
                setHeight("500px");
            }
        } else {
            setHeight(initialHeight);
        }
    };

    const onClickSend = () => {
        if (!formValues.name || !formValues.identity || !formValues.cnpj || !formValues.city) {
            setError(true);
            return
        }

        const data = formValues;

        const message = `
Olá, sou lojista e estou entrando em contato através do site!   

*Nome*
${data.name}
        
*Razão Social*
${data.identity}
        
*CNPJ*
${data.cnpj}

*Contato*
${data.phone}
        
*Cidade*
${data.city}
`.trim();

        const encodedMessage = encodeURIComponent(message);

        const url = `${LocalConfig.whatsappURL}?text=${encodedMessage}`;

        window.open(url, '_blank');
    }

    return (
        <Grid container className={classes.parallaxContainer} sx={{ height: height }} justifyContent={"flex-start"} spacing={2}>
            <Grid size={12} data-aos="zoom-in">
                <Typography className={classes.title} variant='h3'>SOU LOJISTA</Typography>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }} data-aos="zoom-in">
                <Button variant='contained' onClick={onClickRegister}> Solicite um cadastro</Button>
            </Grid>
            <Grid size={12} sx={{ textAlign: 'center' }}>
                <Box>
                    <Grid container>
                        <Grow in={height !== initialHeight}>
                            <Grid item className={classes.form}>
                                <Card className={classes.formCard}>
                                    <CardContent >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Nome</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField
                                                                    error={error}
                                                                    fullWidth
                                                                    name="name"
                                                                    value={formValues.nome}
                                                                    onChange={handleInputChange}
                                                                    size='small'
                                                                    variant="outlined"
                                                                    className={classes.textField}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Razão social</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField
                                                                    error={error}

                                                                    fullWidth
                                                                    name="identity"
                                                                    value={formValues.razaoSocial}
                                                                    onChange={handleInputChange}
                                                                    size='small'
                                                                    variant="outlined"
                                                                    className={classes.textField}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>CNPJ</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <MaskedTextField
                                                                    mask="99.999.999/9999-99"
                                                                    fullWidth 
                                                                    name='cnpj'
                                                                    value={formValues.cnpj}
                                                                    onChange={handleInputChange}
                                                                    placeholder={"XX.XXX.XXX/0001-XX"}
                                                                    size='small'
                                                                    variant="outlined"
                                                                    className={classes.textField}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Contato</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                            <MaskedTextField
                                                                    mask="(99) 9999-9999"
                                                                    fullWidth 
                                                                    name='phone'
                                                                    value={formValues.phone}
                                                                    onChange={handleInputChange}
                                                                    size='small'
                                                                    variant="outlined"
                                                                    className={classes.textField}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container>
                                                            <Grid size={12}>
                                                                <Typography className={classes.label}>Cidade</Typography>
                                                            </Grid>
                                                            <Grid size={12}>
                                                                <TextField
                                                                    error={error}

                                                                    fullWidth
                                                                    placeholder={"Caxias do Sul"}
                                                                    name="city"
                                                                    value={formValues.cidade}
                                                                    onChange={handleInputChange}
                                                                    size='small'
                                                                    variant="outlined"
                                                                    className={classes.textField}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }} alignContent={'end'} >
                                                    <Button variant='contained' onClick={onClickSend} className={classes.formButton}>Entre em contato</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grow>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RetailerSection;
