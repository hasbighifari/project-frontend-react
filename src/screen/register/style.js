const style = theme => ({    
    input: {
        color: "#495057",
        "&,&::placeholder": {
            fontSize: "14px",
            fontFamily: 'sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        },
        textAlign: 'left'
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#636FA4 !important",
            borderWidth: "1px !important"
        },
        "&:after": {
            borderColor: '#0080ff'
        },
    },
    disabled: {},
    inputIconsColor: {
        color: "#b5b5b5",
        fontSize: '15px'
    },
    form: {
        paddingLeft: '100px',
        paddingRight: '100px',
        paddingBottom: '125px',
        flexBasis: '700px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing.unit * 2,
            paddingRight: theme.spacing.unit * 2
        }
    },
    title: {
        marginTop: theme.spacing.unit * 3,
        textAlign: 'left'
    },
    subtitle: {
        color: theme.palette.text.secondary,
        marginTop: theme.spacing.unit * 0.5,
        paddingBottom: '20px',
        textAlign: 'left'
    },
    fields: {
        marginTop: theme.spacing.unit * 2
    },
    textField: {
        width: '100%',
        '& + & ': {
            marginTop: theme.spacing.unit * 2
        }
    },
    signInButton: {
        marginTop: theme.spacing.unit * 2,
        width: '100%'
    },



})

export default style