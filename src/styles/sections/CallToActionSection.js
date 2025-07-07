import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.colors.dark,
        color: theme.colors.light,
        padding: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            padding: '32px 32px 32px 32px'
        },
    },
    title: {
        fontSize: "40px!important",
        fontWeight: 600 + '!important',
        textAlign: 'center!important'
    },
    contactItem: {
        fontSize: "24px!important",
        [theme.breakpoints.down('md')]: {
            fontSize: "1.1rem!important",
        },
    },
    form: {
        position: 'relative',
        zIndex: 2,
        color: 'white', 
        padding: theme.spacing(3, 6),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 2),
        },
    },
    textField: {
        '& .MuiInputBase-root': {
            color: 'black', // Cor do texto de entrada
            backgroundColor: '#FFFFFF', // Fundo branco
        },
        '& .MuiInputLabel-root': {
            color: 'black', // Cor do texto do label
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black', // Cor do texto do label quando está em foco
        },
        '& .MuiInputLabel-root.MuiFormLabel-filled': {
            color: 'black', // Cor do texto do label quando o campo está preenchido
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            },
            '&.Mui-focused fieldset': {
                border: '1px solid black', // Cor da borda quando está em foco
            },
        },
    },
    formCard: {
        backgroundColor: alpha(theme.colors.primary, .8) + "!important",
        margin: "24px",
        borderRadius: "12px!important",
        padding: theme.spacing(1, 2),
        width: "322px"
    },
    formButton: {
        backgroundColor: theme.colors.dark+'!important',
        color: theme.colors.light+'!important'
    },
}));

export default useStyles;
