import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
    },
    appBar: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        zIndex: theme.zIndex.drawer + 1,
    },
    sidebar: {
        flexShrink: 0,
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100vh',
        position: 'fixed',
        top: 64,
        zIndex: 999,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    },
    sidebarContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2, 0),
    },
    drawer: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        height: '100%',
    },
    drawerHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.secondary,
    },
    avatar: {
        width: 64,
        height: 64,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(1),
    },
    userMenu: {
        backgroundColor: theme.palette.background.default
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    mainContent: {
        flexGrow: 1,
        padding: theme.spacing(3),
        paddingLeft: "0px",
        paddingRight: "0px",
        marginTop: 64,
        transition: theme.transitions.create(['margin-left'], { // Array com propriedades
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
         [theme.breakpoints.down('md')]: {
            width: "calc(100% - 68px)"
        },
    },
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(8),
        backgroundColor: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius * 2,
    },
    emptyStateIcon: {
        fontSize: 60,
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(2),
    },
    menuItem: {
        justifyContent: 'flex-start',
        marginBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        '&.active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
                backgroundColor: '#15d5c9',
            },
        },
    },
    logoutButton: {
        justifyContent: 'flex-start',
        color: theme.palette.error.main,
    },
    addButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#15d5c9',
        },
    },
}));

export default useStyles;