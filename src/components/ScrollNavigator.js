import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Slide, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../styles/components/Header';
import Grid from "@mui/material/Grid2";
import { useNavigate } from 'react-router-dom';

const ScrollNavigationBar = () => {
    const classes = useStyles();
    const [show, setShow] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 110) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onClickRedirect = () => {
        navigate("/login")
    }

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = -100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY + offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });

            if (isMobile) {
                setIsDrawerOpen(false);
            }
        }
    };

    return (
        <Slide direction="down" in={show}>
            <AppBar position="fixed" color="primary" className={classes.scrollNavBar}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%"
                        }}
                    >
                        <Grid>
                            {isMobile ? (
                                <Grid container sx={{alignItems: "center"}}>
                                    <Grid>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            onClick={() => setIsDrawerOpen(true)}
                                        >
                                            <MenuIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid>
                                        <Typography>GoodbyeCarBrasil</Typography>
                                    </Grid>
                                    <Drawer
                                        anchor="left"
                                        open={isDrawerOpen}
                                        onClose={() => setIsDrawerOpen(false)}
                                    >
                                        <List>
                                            <ListItem button onClick={() => scrollToSection('home-section')}>
                                                <ListItemText className={classes.drawerItem} primary="Início" />
                                            </ListItem>
                                            <ListItem button onClick={() => scrollToSection('steps-section')}>
                                                <ListItemText className={classes.drawerItem} primary="Como funciona" />
                                            </ListItem>
                                            <ListItem button onClick={() => scrollToSection('about-section')}>
                                                <ListItemText className={classes.drawerItem} primary="Sobre nós" />
                                            </ListItem>
                                            <ListItem button onClick={() => scrollToSection('contacts-section')}>
                                                <ListItemText className={classes.drawerItem} primary="Contatos" />
                                            </ListItem>
                                        </List>
                                    </Drawer>
                                </Grid>
                            ) : (
                                <>
                                    <Button color="inherit" onClick={() => scrollToSection('home-section')}>
                                        <Typography className={classes.menuItem}>
                                            Início
                                        </Typography>
                                    </Button>
                                    <Button color="inherit" onClick={() => scrollToSection('steps-section')}>
                                        <Typography className={classes.menuItem}>
                                            Como funciona
                                        </Typography>
                                    </Button>
                                    <Button color="inherit" onClick={() => scrollToSection('about-section')}>
                                        <Typography className={classes.menuItem}>
                                            Sobre nós
                                        </Typography>
                                    </Button>
                                    <Button color="inherit" onClick={() => scrollToSection('contacts-section')}>
                                        <Typography className={classes.menuItem}>
                                            Contatos
                                        </Typography>
                                    </Button>
                                </>
                            )}
                        </Grid>
                        <Grid>
                            <Button onClick={onClickRedirect} sx={{ color: "black" }}> Acesse ja</Button>
                        </Grid>
                    </Grid>
                </Toolbar>

            </AppBar>
        </Slide>
    );
};

export default ScrollNavigationBar;
