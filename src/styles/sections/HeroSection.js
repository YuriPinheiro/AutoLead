import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles'; 
import BackgroundImage from '../../assets/LogoCompleto.jpg';


const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        height: '90vh', 
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0, 
        padding: 0, 
        [theme.breakpoints.down('md')]: {
            height: "auto"
        }
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        maxWidth: "50%",
        color: 'white', 
        padding: theme.spacing(12, 12, 12, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1, 2),
            maxWidth: "100%",
            textAlign: "center"
        },
    },
    obs: {
        fontSize: "12px!important",
        fontWeight: "600!important"
    },
    form: {
        position: 'relative',
        zIndex: 2,
        color: 'white', 
        padding: theme.spacing(3, 20),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(10, 2, 2, 2),
        },
    },
    formCard: {
        backgroundColor: alpha(theme.colors.primary, .8) + "!important",
        margin: "24px",
        borderRadius: "12px!important",
        marginTop: "100px",
        padding: theme.spacing(1, 2),
        width: "322px",
        [theme.breakpoints.down('md')]: {
            width: "auto",
             marginTop: "10px",
        },
    },
    button: {
        color: theme.colors.light + "!important",
        background: theme.colors.dark + "!important"
    },
    datePicker: {
        width: "100%",
        '& .MuiOutlinedInput-root': {
            backgroundColor: theme.colors.light,
            border: '1px solid black',
            '&.Mui-focused fieldset': {
                border: '1px solid black',
            },
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.primary, 
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.text.primary, 
        },
    },
    textField: {
        '& .MuiInputBase-root': {
            color: 'black',
            backgroundColor: '#FFFFFF', 
        },
        '& .MuiInputLabel-root': {
            color: 'black', 
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black', 
        },
        '& .MuiInputLabel-root.MuiFormLabel-filled': {
            color: 'black', 
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            },
            '&.Mui-focused fieldset': {
                border: '1px solid black', 
            },
        },
    },
    title: {
        fontWeight: "600!important",
    }
}));

export default useStyles;
