import React, { useEffect } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/CommentsSection';
import { Avatar, Box, Card, CardContent, Rating, Typography } from '@mui/material';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const testimonials = [
    {
        name: 'Daniela Fabiao',
        date: 'Maio de 2024',
        rating: 5,
        comment: 'Atendimento excelente! Confiamos a venda  da nossa caminhonete fiat toro diesel, que foi feita dentro do prazo de dois dias pelo diretor da empresa, o Sr. Rafael, que vendeu o carro com preço justo de mercado.  Uma vergonha o valor avaliado pelas concessionárias na troca do seu usado por um carro novo. Valeu muito a pena fazer negócio com a goodbye Car! Com certeza faremos novos negócios!',
    },
    {
        name: 'Rosimeri Luz',
        date: 'Maio de 2024',
        rating: 5,
        comment: 'Com muita seriedade, comprometimento, profissionalismo. Super recomendo.',
    },
    {
        name: 'Boss Auto multimarcas',
        date: 'Maio de 2024',
        rating: 5,
        comment: 'Excelente atendimento, precisão no trabalho, agilidade, transparência na negociação. Recomendo o trabalho desta empresa.',
    },
];

const CommentsSection = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const classes = useStyles(); 

    const settings = {
        dots: true, 
        infinite: true, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
        autoplay: true, 
        autoplaySpeed: 5000, 
    };

    const getInitial = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };

    const onClickComment = () => {
        const url = "https://www.google.com.br/search?kgmid=/g/11vxxnp6ty&hl=en-BR&q=Goodbye+Car+Brasil+(+Compramos+seu+carro)&shndl=30&shem=lrnole,lsde,vslcea&source=sh/x/loc/osrp/m5/1&kgs=65ced66748145f34#lrd=0x951ea3feaed25223:0xc29e80a6ddbceaed,1,,,,";
        window.open(url, '_blank'); // Abre o link em uma nova aba
    };


    return (
        <Grid container className={classes.container} justifyContent={"center"} spacing={4}>
            <Grid size={12} data-aos="fade-down">
                <Typography className={classes.title} variant='h3'>O Que Nossos Clientes Dizem</Typography>
            </Grid>

            <Grid size={12} data-aos="zoom-in-up">
                <Box sx={{ py: 5 }}>

                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <Box key={index} px={2} >
                                <Card sx={{ maxWidth: 600, mx: 'auto' }} onClick={onClickComment}>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Avatar sx={{ mr: 2, bgcolor: '#18E8DB' }}>
                                                {getInitial(testimonial.name)}
                                            </Avatar>
                                            <Box>
                                                <Typography className={classes.textPrimary} variant="h6">{testimonial.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {testimonial.date}
                                                </Typography>
                                                <Rating value={testimonial.rating} readOnly size="small" />
                                            </Box>
                                        </Box>
                                        <Typography className={classes.comment} variant="body1" color="textPrimary">
                                            "{testimonial.comment}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>

                </Box>
            </Grid>
        </Grid>
    );
};

export default CommentsSection;
