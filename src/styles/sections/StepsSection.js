import { makeStyles } from '@mui/styles';



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
        textAlign: 'center!important'
    },
    stepsContainer: {
        margin: theme.spacing(2)
    },
    circle: {
        width: "100px",
        height: "100px",
        backgroundColor: theme.colors.secondary,
        borderRadius: "50%",
        textAlign: 'center',
        alignContent: 'center',
        color: theme.colors.light
    },
    stepLabel: {
        fontSize: "50px!important",
        fontWeight: 600 + '!important'
    },
    stepTitle: {
        fontSize: "24px!important",
        fontWeight: 500 + '!important',
        color: theme.colors.secondary,
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },
    stepSubtitle: {
        fontSize: "18px!important",
        fontWeight: 200 + '!important',
        [theme.breakpoints.down('md')]: {
            textAlign: 'center'
        }
    },

}));

export default useStyles;
