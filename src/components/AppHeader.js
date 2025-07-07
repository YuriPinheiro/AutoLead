import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Typography,
    useTheme,
    IconButton,
    Toolbar,
    Avatar,
    Menu,
    MenuItem,
    useMediaQuery
} from '@mui/material';

import {
    Menu as MenuIcon
} from '@mui/icons-material';

import useStyles from '../styles/components/AppHeader';
import { useMenu } from '../contexts/MenuContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import ProfileModal from './ProfileModal';
import MissingPhoneAlert from './MissingPhoneAlert';
import userService from '../stores/UserService';

const AppHeader = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { toggleMenu } = useMenu();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user, logout } = useAuth();


    // User menu
    const [anchorEl, setAnchorEl] = useState(null)
    const [profileOpen, setProfileOpen] = useState(false)
    const [showPhoneAlert, setShowPhoneAlert] = useState(false)
    const userMenuOpen = Boolean(anchorEl)

    useEffect(() => {
        verifyPhone();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, profileOpen]);

    const verifyPhone = async () => {
        try {
            const hasPhone = await userService.hasPhoneNumber(user.uid);
            setShowPhoneAlert(!hasPhone);
        } catch (error) {
            console.error("Erro ao verificar telefone:", error);
        }
    };

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleUserMenuClose = () => {
        setAnchorEl(null)
    }

    const getNameInitials = () => {
        if (user) {

            const name = user.displayName || user.email;
            const parts = name.trim().split(/\s+/);
            if (parts.length >= 2) {
                return (parts[0][0] + parts[1][0]).toUpperCase();
            } else {
                return parts[0].substring(0, 2).toUpperCase();
            }
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            handleUserMenuClose();
            navigate("/login"); // Redireciona para a página de login após logout
        } catch (error) {
            console.error("Falha ao fazer logout:", error);
        }
    };

    const handleDrawerToggle = () => {
        toggleMenu();
    }
    return (
        <>
            {/* App Bar */}
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {!isMobile &&
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                    }
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h6" noWrap component="div" fontWeight="bold">
                            GoodByeCar Brasil
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        onClick={handleUserMenuClick}
                        size="small"
                        aria-controls={userMenuOpen ? "user-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={userMenuOpen ? "true" : undefined}
                    >
                        {user.photoURL &&
                            <Avatar sx={{ bgcolor: theme.palette.secondary.main, color: theme.palette.text.secondary }} alt='profile photo' src={user.photoURL} />
                        }
                        {!user.photoURL &&
                            <Avatar id={"NoPhotoURL"} sx={{ bgcolor: theme.palette.background.paper, color: theme.palette.text.secondary }}>
                                {getNameInitials()}
                            </Avatar>
                        }

                    </IconButton>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={userMenuOpen}
                        onClose={handleUserMenuClose}
                        MenuListProps={{
                            "aria-labelledby": "user-button",
                        }}
                    >
                        <MenuItem onClick={() => { setProfileOpen(true) }}>Meu Perfil</MenuItem>
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </Menu>
                </Toolbar>
                <ProfileModal open={profileOpen} onClose={() => { setProfileOpen(false) }} userProvider={user} />
            </AppBar>
            <MissingPhoneAlert show={showPhoneAlert} onClose={() => { setShowPhoneAlert(false) }} onAddPhoneClick={() => { setProfileOpen(true) }} />
        </>
    );
};

export default AppHeader;
