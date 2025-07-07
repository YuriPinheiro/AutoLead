import { makeStyles } from '@mui/styles';


// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            margin: '100px 32px 32px 32px'
        },
    },
    title: {
        fontSize: "40px!important",
        fontWeight: 600 + '!important',
        textAlign: 'center!important'
    },
    subtitle: {
        fontSize: "20px!important",
        fontWeight: 100 + '!important',
        textAlign: 'center!important',
        textTransform: 'uppercase',

    },
    videoTitle: {
        fontSize: "25px!important",
        fontWeight: 400+'!important',
        textAlign: 'center!important',
    },

}));

export default useStyles;
