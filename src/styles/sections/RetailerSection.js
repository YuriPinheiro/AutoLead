import { makeStyles } from '@mui/styles';
import BackgroundImage from '../../assets/LojistaBackground.jpg';
import { alpha } from '@mui/material/styles'; 



const useStyles = makeStyles((theme) => ({
    parallaxContainer: {
        backgroundAttachment: 'fixed', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover', 
        display: 'flex',
        transition: 'height 0.5s ease', 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BackgroundImage})`, 
        color: 'white', 
        padding: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 4),
        }
    },
    title: {
        fontSize: "30px!important",
        fontWeight: 600 + '!important',
        textAlign: 'center!important',
        textTransform: 'uppercase',
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
    form: {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        padding: theme.spacing(3, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 2),
        },
    },
    formCard: {
        backgroundColor: alpha(theme.colors.primary, .8) + "!important",
        margin: "24px",
        borderRadius: "12px!important",
        padding: theme.spacing(1, 2),
    },
    formButton: {
        backgroundColor: theme.colors.dark+'!important',
        color: theme.colors.light+'!important'
    },
    label:{
        textAlign: 'left'
    }
}));

export default useStyles;
