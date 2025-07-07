import React, { useState } from 'react';
import Grid from "@mui/material/Grid2";

import useStyles from '../styles/sections/AboutSection';
import { Box, Typography } from '@mui/material';

import Slider from "react-slick";
import { Card, CardMedia } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const videoData = [
    { id: 1, title: "Como funciona", thumbnail: "/thumb1.png", videoUrl: "/videos/GoodbyeCarBrasil.mp4" },
    { id: 2, title: "Sobre nós", thumbnail: "/thumb2.png", videoUrl: "/videos/GoodbyeCarBrasil2.mp4" }
];

const AboutSection = () => {

    const [selectedVideo, setSelectedVideo] = useState(videoData[0].videoUrl);

    const classes = useStyles();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleThumbnailClick = (videoUrl) => {
        setSelectedVideo(videoUrl);
    };

    return (
        <div id='about-section'>
            <Grid container className={classes.container} justifyContent={"center"} spacing={4}>
                <Grid size={12} data-aos={'fade-down'}>
                    <Typography className={classes.title} variant='h3'>SOBRE NÓS</Typography>
                </Grid>
                <Grid size={12} data-aos={'zoom-in-up'}>
                    <Typography className={classes.subtitle} variant='subtitle1'>Somos uma empresa séria que prioriza o cliente e garantimos ótimos resultados para a negociação do seu veículo.</Typography>
                </Grid>

                <Grid size={12} data-aos={"flip-down"}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container className={classes.itensContainer} spacing={2} justifyContent={'center'}>
                            <Grid size={12}>
                                <Typography className={classes.videoTitle} variant='subtitle1'>Confira como nosso processo é prático e descomplicado.</Typography>
                            </Grid>

                            <Grid size={12} sx={{ textAlign: 'center' }}>
                                <Box
                                    component="video"
                                    src={selectedVideo}
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    sx={{
                                        width: '80%',
                                        maxHeight: '500px',
                                        borderRadius: '8px',
                                        boxShadow: 3,
                                    }}
                                />
                            </Grid>

                            <Grid
                                size={12}
                                sx={{
                                    textAlign: "center",
                                    maxWidth: {
                                        xs: "80%", // Para dispositivos móveis (xs: extra-small)
                                        md: "50%", // Para telas maiores (md: medium ou superior)
                                    },
                                }}
                            >
                                <Box>
                                    <Slider {...settings}>
                                        {videoData.map((video) => (
                                            <Box
                                                key={video.id}
                                                sx={{
                                                    maxWidth: {
                                                        xs: "440px", // Para dispositivos móveis (xs: extra-small)
                                                        md: "240px", // Para telas maiores (md: médium ou superior)
                                                    },
                                                }}
                                            >
                                                <Card onClick={() => handleThumbnailClick(video.videoUrl)}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{
                                                            height: {
                                                                xs: "90px", // Altura em dispositivos móveis (xs: extra-small)
                                                                md: "140px", // Altura em telas maiores (md: médium ou superior)
                                                            },
                                                        }}
                                                        image={video.thumbnail}
                                                        alt={`Thumbnail of video ${video.id}`}
                                                    />
                                                </Card>
                                                <Typography>{video.title}</Typography>
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
};

export default AboutSection;
