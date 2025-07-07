import React, { useEffect } from "react"
import { useLocation } from 'react-router-dom';
import { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  InputAdornment,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth"
import { auth } from "../../stores/FirebaseStore";

const RecoverPasswordPage = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [codeError, setCodeError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const location = useLocation();

  const theme = useTheme()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const oobCode = queryParams.get('oobCode');
    const modeParam = queryParams.get('mode');

    if (oobCode && modeParam === 'resetPassword') {
      setCode(oobCode);
      setActiveStep(1) // Pula direto para a verificação
      // Opcional: verificar automaticamente o código
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setEmail(email); 
          setActiveStep(2);
        })
        .catch((error) => {
          setCodeError('Código inválido ou expirado');
        });
    }
  }, [location]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleRequestCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setEmailError("")

    if (!email) {
      setEmailError("Email é obrigatório")
      setLoading(false)
      return
    } else if (!validateEmail(email)) {
      setEmailError("Email inválido")
      setLoading(false)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setActiveStep(1)
    } catch (error) {
      console.error("Erro ao enviar email de recuperação:", error)
      setEmailError("Erro ao enviar email. Verifique se o email está correto.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setCodeError("")

    if (!code) {
      setCodeError("Código é obrigatório")
      setLoading(false)
      return
    }

    try {
      // Verifica se o código de redefinição é válido
      await verifyPasswordResetCode(auth, code)
      setActiveStep(2)
    } catch (error) {
      console.error("Erro ao verificar código:", error)
      setCodeError("Código inválido ou expirado")
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPasswordError("")
    setConfirmPasswordError("")

    let isValid = true

    if (!password) {
      setPasswordError("Nova senha é obrigatória")
      isValid = false
    } else if (password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres")
      isValid = false
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirme sua nova senha")
      isValid = false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("As senhas não coincidem")
      isValid = false
    }

    if (!isValid) {
      setLoading(false)
      return
    }

    try {
      await confirmPasswordReset(auth, code, password)
      setSuccess(true)
    } catch (error) {
      console.error("Erro ao redefinir senha:", error)
      setPasswordError("Erro ao redefinir senha. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const steps = ["Email", "Verificação", "Nova Senha"]

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" onSubmit={handleRequestCode} noValidate>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              Digite seu email para receber um código de verificação.
            </Typography>
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.primary.main,
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.primary,
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#15d5c9",
                },
              }}
            >
              {loading ? 'Enviando...' : 'Enviar Código'}
            </Button>
          </Box>
        )
      case 1:
        return (
          <Box component="form" onSubmit={handleVerifyCode} noValidate>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              Digite o código de verificação enviado para {email}.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Código de Verificação"
              name="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={!!codeError}
              helperText={codeError}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.primary.main,
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                onClick={() => setActiveStep(0)}
                disabled={loading}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1,
                  px: 3,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#15d5c9",
                  },
                }}
              >
                {loading ? 'Verificando...' : 'Verificar'}
              </Button>
            </Box>
          </Box>
        )
      case 2:
        return (
          <Box component="form" onSubmit={handleResetPassword} noValidate>
            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
              Crie uma nova senha para sua conta.
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Nova Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
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
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.primary.main,
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar Nova Senha"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.primary.main,
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                onClick={() => setActiveStep(1)}
                disabled={loading}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1,
                  px: 3,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#15d5c9",
                  },
                }}
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </Box>
          </Box>
        )
      default:
        return "Passo desconhecido"
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            borderRadius: 2,
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography component="h1" variant="h5" color="text.primary" fontWeight="bold">
              Recuperar Senha
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {success ? (
            <Box>
              <Alert severity="success" sx={{ mb: 2 }}>
                Senha redefinida com sucesso!
              </Alert>
              <Typography variant="body2" paragraph>
                Sua senha foi alterada. Agora você pode fazer login com sua nova senha.
              </Typography>
              <Button
                component={RouterLink}
                to="/login"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#15d5c9",
                  },
                }}
              >
                Ir para Login
              </Button>
            </Box>
          ) : (
            getStepContent(activeStep)
          )}

          {!success && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.primary">
                Lembrou sua senha?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Voltar para Login
                </Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  )
}

export default RecoverPasswordPage