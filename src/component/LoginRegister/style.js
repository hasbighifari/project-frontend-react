import background from '../../assets/img/todo-list.jpg'

const style = theme => ({
    root: {
        // backgroundColor: theme.palette.background.default,
        height: '100vh'
    },
    grid: {
        height: '100%'
    },
    quoteWrapper: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        // backgroundColor: theme.palette.common.neutral,
        backgroundColor: '#E4E7EB',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.9
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.common.white,
        fontWeight: 500,
        fontSize: '40px'
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
})

export default style