import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(4),
        width: '100%',
        borderRadius: 8,
        backgroundColor: theme.palette.background.default + "!important",
    },
    googleButton: {
        marginTop: theme.spacing(1),
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        color: '#000',
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing(1),
    },

    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    title: {
        fontWeight: 'bold',
        color: theme.palette.text.primary,
    },
    subtitle: {
        color: theme.palette.text.primary,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.text.primary,
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: theme.palette.primary.main,
        },
    },
    forgotPassword: {
        textAlign: 'right',
        marginTop: theme.spacing(1),
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    button: {
        '&.MuiButton-root': {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(1.5),
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#15d5c9',
            },
        }
    },
    dividerText: {
        color: theme.palette.text.primary,
    },
    registerLink: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default useStyles;
