import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Typography, Button, MenuItem, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
    rootForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            // width: '25ch',
        },
    },
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    asterisk: {
        color: 'red'
    },
    addButton: {
        color: 'white'
    }
});
const DialogTitle = withStyles(styles)(props => {
    const { children, onClose, classes, ...other } = props

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
})

const DialogTodo = ({ ...props }) => {
    const { children, onClose, classes } = props

    const handleClose = () => {
        props.handleClose(false)
    }


    return (
        <Dialog fullWidth maxWidth={'sm'} open={props.open} onClose={handleClose} scroll={'paper'}>
            <DialogTitle
                id="max-width-dialog-title"
                onClose={handleClose}
            >
                {props.title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <Grid container direction="row" justify='center' alignItems='center' style={{ margin: 5 }}>
                    <Grid container item direction="row" justify='center' alignItems='center' md={6}>
                        <Button color='primary' variant='contained'
                            className={classes.addButton} onClick={props.handleSubmit}>
                            {props.buttonTitle}
                        </Button>
                    </Grid>
                    <Grid container item direction="row" justify='center' alignItems='center' md={6}>
                        <Button onClick={handleClose} color='secondary' variant='contained' className={classes.addButton}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(DialogTodo)