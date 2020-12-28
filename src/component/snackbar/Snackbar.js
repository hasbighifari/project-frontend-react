import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { closeSnackbar } from '../../actions/systemAction';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const mapStateToProps = (state) => {
    return {
        user: state.user,
        system: state.system,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _closeSnackbar: () => {
            dispatch(closeSnackbar())
        }
    }
}

class SnackbarView extends React.Component {
    _handleClose() {
        this.props._closeSnackbar()
    }
    render() {
        const { classes } = this.props;
        let status = this.props.system.snackbarStatus
        let msg = this.props.system.snackbarMsg
        if (status === "error") {
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={status === "error"}
                    autoHideDuration={6000}
                    onClose={this._handleClose.bind(this)}
                >
                    <Alert onClose={this._handleClose.bind(this)} severity="error">
                        {msg}
                    </Alert>
                </Snackbar>
            )
        }
        else if (status === "success") {
            console.log('success', msg)
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={status === "success"}
                    autoHideDuration={600000}
                    onClose={this._handleClose.bind(this)}
                >
                   <Alert onClose={this._handleClose.bind(this)} severity="success">
                        {msg}
                    </Alert>
                </Snackbar>
            )
        }
        else {
            return (
                <div>
                </div>
            )
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarView)
