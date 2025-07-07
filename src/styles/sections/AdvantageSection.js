import { makeStyles } from '@mui/styles';


// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(4, 4),
        },
        color: theme.colors.light,
        backgroundColor: theme.colors.dark
    },
    title: {
        fontSize: "40px!important",
        fontWeight: 600 + '!important',
        textAlign: 'center!important',
        textTransform: 'uppercase',
    },
    subtitle: {
        fontSize: "20px!important",
        fontWeight: 100 + '!important',
        textAlign: 'center!important',
        textTransform: 'uppercase',
    },
    itensContainer: {
        margin: theme.spacing(2, 10),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(2, 4),
        },
    },
    advantageTitle: {
        fontSize: "24px!important",
        fontWeight: 500+'!important',
        color: theme.colors.primary
    },
    advantageSubtitle: {
        fontSize: "18px!important",
        fontWeight: 100+'!important',
    },
    divider: {
        backgroundColor: theme.colors.light
    }
    
}));

export default useStyles;
