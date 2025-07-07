import React, { useState, useEffect } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Container, 
    Paper, 
    Link, 
    InputAdornment, 
    IconButton, 
    Divider, 
    useTheme,
    CircularProgress,
    Alert
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { 
    signInWithEmailAndPassword, 
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    AuthErrorCodes 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import useStyles from "../../styles/pages/LoginPage";
import { auth, db } from "../../stores/FirebaseStore";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [googleLoading, setGoogleLoading] = useState(false);

    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();

    // Verifica o resultado do redirect quando a página carrega
    useEffect(() => {
        const checkRedirectResult = async () => {
            try {
                setGoogleLoading(true);
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;

                    // Verifica se o usuário já existe no Firestore
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (!userSnap.exists()) {
                        await setDoc(userRef, {
                            name: user.displayName,
                            email: user.email,
                            phone: user.phoneNumber || "",
                            createdAt: serverTimestamp(),
                            isGoogleAccount: true,
                            lastLogin: serverTimestamp()
                        });
                    } else {
                        // Atualiza último login
                        await setDoc(userRef, {
                            lastLogin: serverTimestamp()
                        }, { merge: true });
                    }

                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Erro no login com Google:", error);
                setError("Erro ao fazer login com Google. Tente novamente.");
            } finally {
                setGoogleLoading(false);
            }
        };

        checkRedirectResult();
    }, [navigate]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao fazer login:", error.code, error.message);
            
            // Tratamento de erros específicos do Firebase
            switch(error.code) {
                case AuthErrorCodes.INVALID_EMAIL:
                    setEmailError("Email inválido");
                    break;
                case AuthErrorCodes.USER_DELETED:
                    setEmailError("Usuário não encontrado");
                    break;
                case AuthErrorCodes.INVALID_PASSWORD:
                    setPasswordError("Senha incorreta");
                    break;
                case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
                    setError("Muitas tentativas. Tente novamente mais tarde.");
                    break;
                default:
                    setError("Erro ao fazer login. Tente novamente.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");
        setPasswordError("");
        setError(null);

        // Validate
        let isValid = true;

        if (!email) {
            setEmailError("Email é obrigatório");
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Email inválido");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Senha é obrigatória");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Senha deve ter pelo menos 6 caracteres");
            isValid = false;
        }

        if (isValid) {
            handleLogin();
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Erro ao iniciar login com Google:", error);
            setError("Erro ao iniciar login com Google. Tente novamente.");
        }
    };

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box className={classes.container}>
                    <Paper elevation={3} className={classes.paper}>
                        <Box className={classes.titleContainer}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Bem-vindo de volta
                            </Typography>
                            <Typography variant="body2" className={classes.subtitle}>
                                Entre com suas credenciais para acessar sua conta
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box 
                            component="form" 
                            onSubmit={handleSubmit} 
                            noValidate 
                            className={classes.form}
                            aria-label="Formulário de login"
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!emailError}
                                helperText={emailError}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: theme.palette.primary.main }} />
                                        </InputAdornment>
                                    ),
                                }}
                                className={classes.textField}
                                aria-describedby="email-error"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: theme.palette.primary.main }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton 
                                                aria-label="toggle password visibility" 
                                                onClick={handleClickShowPassword} 
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                className={classes.textField}
                                aria-describedby="password-error"
                            />

                            <Box sx={{ textAlign: "right", mt: 1 }}>
                                <Link
                                    component={RouterLink}
                                    to="/recuperar-senha"
                                    variant="body2"
                                    className={classes.forgotPassword}
                                >
                                    Esqueceu sua senha?
                                </Link>
                            </Box>

                            <Button 
                                type="submit" 
                                fullWidth 
                                variant="contained" 
                                className={classes.button}
                                disabled={loading || googleLoading}
                                aria-busy={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
                            </Button>

                            <Button
                                onClick={handleGoogleLogin}
                                fullWidth
                                variant="outlined"
                                className={classes.googleButton}
                                disabled={googleLoading}
                                startIcon={
                                    <img 
                                        src="/google-icon.svg" 
                                        alt="Google" 
                                        width={20} 
                                        height={20} 
                                        aria-hidden="true"
                                    />
                                }
                            >
                                {googleLoading ? <CircularProgress size={24} color="inherit" /> : "Entrar com Google"}
                            </Button>

                            <Divider sx={{ my: 2 }}>
                                <Typography variant="body2" className={classes.dividerText}>
                                    ou
                                </Typography>
                            </Divider>

                            <Box sx={{ textAlign: "center", mt: 1 }}>
                                <Typography variant="body2">
                                    Não tem uma conta?{" "}
                                    <Link 
                                        component={RouterLink} 
                                        to="/registro" 
                                        className={classes.registerLink}
                                    >
                                        Registre-se
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;