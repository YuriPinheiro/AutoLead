import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    Typography,
    Divider,
    IconButton,
    MenuItem
} from '@mui/material';
import Grid from "@mui/material/Grid2";
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import userService from '../stores/UserService';

// Lista de estados brasileiros
const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const ProfileModal = ({ open, onClose, userProvider, mode }) => {
    const [user, setUser] = useState({});
    const [phone, setPhone] = useState(user?.phone || '');
    const [displayPhone, setDisplayPhone] = useState('');
    const [city, setCity] = useState(user?.city || '');
    const [state, setState] = useState(user?.state || '');
    const [errors, setErrors] = useState({});
    const theme = useTheme();

    useEffect(() => {
        if (open) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        if (user) {
            setPhone(user?.phone || '');
            setCity(user?.city || '');
            setState(user?.state || '');
            setErrors({});
        }
    }, [user]);

    useEffect(() => {
        if (phone) {
            setDisplayPhone(formatPhone(phone));
        }
    }, [phone]);

    const getUser = async () => {
        const user = await userService.getUserByUid(userProvider.uid);
        setUser(user);
    }

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '');

        if (cleaned.length <= 10) {
            return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
    };

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        const cleaned = input.replace(/\D/g, '');
        setPhone(cleaned);
        setDisplayPhone(formatPhone(input));
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        if (errors.city) setErrors({...errors, city: ''});
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
        if (errors.state) setErrors({...errors, state: ''});
    };

    const validateFields = () => {
        const newErrors = {};
        let isValid = true;

        // Se os campos já estiverem preenchidos no user, não precisa validar
        if (!user?.city && !city) {
            newErrors.city = "Cidade é obrigatória";
            isValid = false;
        }

        if (!user?.state && !state) {
            newErrors.state = "Estado é obrigatório";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = async () => {
        // Verifica se os campos obrigatórios estão preenchidos (apenas se não estiverem no user)
        if (!validateFields()) return;

        try {
            await userService.updateUser(userProvider.uid, {
                phone,
                city: city || user?.city,
                state: state || user?.state
            });
            onClose();
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
        }
    };

    const hasChanges = () => {
        return phone !== (user?.phone || '') ||
            city !== (user?.city || '') ||
            state !== (user?.state || '');
    };

    const canSave = () => {
        // Se não houver mudanças, não pode salvar
        if (!hasChanges()) return false;
        
        // Se os campos já estiverem preenchidos no user, pode salvar
        if (user?.city && user?.state) return true;
        
        // Se não estiverem preenchidos, precisa ter valores válidos
        return city && state;
    };

    return (
        <Dialog open={open} PaperProps={{ sx: { backgroundColor: theme.palette.background.default } }} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Perfil</Typography>
                    <IconButton onClick={onClose} color="inherit">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                    <Avatar
                        sx={{ width: 80, height: 80, mb: 2 }}
                        src={userProvider?.photoURL}
                    />
                    <Typography variant="h6">{user?.name}</Typography>
                    <Typography variant="body2" color="text.primary">{user?.email}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box mt={2}>
                    <TextField
                        label="Nome"
                        value={user?.name || ''}
                        fullWidth
                        margin="normal"
                        disabled
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Email"
                        value={user?.email || ''}
                        fullWidth
                        margin="normal"
                        disabled
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Telefone"
                        value={displayPhone}
                        disabled={mode === 'view'}
                        onChange={handlePhoneChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        placeholder="(99) 99999-9999"
                        inputProps={{
                            maxLength: 15
                        }}
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField
                                label="Cidade"
                                value={city}
                                disabled={mode === 'view'}
                                onChange={handleCityChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                error={!!errors.city}
                                helperText={errors.city}
                                required={!user?.city} // Obrigatório apenas se não estiver preenchido
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                label="Estado"
                                value={state}
                                disabled={mode === 'view'}
                                onChange={handleStateChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                sx={{ minWidth: 120 }}
                                error={!!errors.state}
                                helperText={errors.state}
                                required={!user?.state} // Obrigatório apenas se não estiver preenchido
                            >
                                <MenuItem value=""><em>Selecione</em></MenuItem>
                                {estados.map((estado) => (
                                    <MenuItem key={estado} value={estado}>
                                        {estado}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                {mode !== 'view' && (
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary"
                        disabled={!canSave()}
                    >
                        Salvar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal;