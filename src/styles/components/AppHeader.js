import { makeStyles } from '@mui/styles';

// Definindo estilos com makeStyles
const useStyles = makeStyles((theme) => ({
    appBar: {
        height: '56px',
        padding: theme.spacing(0, 1),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0, 4),
        },

    },
    container: {
        margin: theme.spacing(3, 12),
        [theme.breakpoints.down('md')]: {
            margin: theme.spacing(3, 4),
        },
    }
}));

export default useStyles;
