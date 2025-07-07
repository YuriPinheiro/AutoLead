import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(4, 24),
        [theme.breakpoints.down('md')]: {
            margin: '32px 32px 32px 32px'
        },
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
    textPrimary: {
        color: theme.colors.light
    },
    comment: {
        color: theme.colors.light+'!important'
    }

}));

export default useStyles;
