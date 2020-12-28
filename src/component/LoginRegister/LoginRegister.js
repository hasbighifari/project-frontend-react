import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './style'


const LoginRegister = ({ ...props }) => {
    const { classes } = props
    return (
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item lg={7} className={classes.quoteWrapper}>
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
                            <Typography variant='h1' className={classes.quoteText}>
                                Simple Todo List Web
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid className={classes.content} item lg={5} xs={12}>
                    <div className={classes.content}>
                        <div className={classes.contentBody}>
                            {props.children}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>)
}

export default withStyles(styles)(LoginRegister)
