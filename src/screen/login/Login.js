import React, { useState } from 'react'
import LoginRegister from '../../component/LoginRegister/LoginRegister'
import Button from '@material-ui/core/Button'
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockRounded"
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from 'react-router-dom'
import styles from './style'
import { SendToService } from '../../service/serviceClient'
import { loginStatus } from '../../actions/userAction'
import { connect } from 'react-redux'
import Loader from '../../component/Loader/Loader'

const mapStateToProps = state => ({
    user: state.user,
    system:state.system
})

const mapDispatchToProps = dispatch => ({
    _setLoginStatus: val => {
        dispatch(loginStatus(val))
    }
})


const Login = ({ ...props }) => {
    const { classes, _setLoginStatus,system } = props
    const [state, setState] = useState({
        typePassword: 'password'
    })
    const handleChange = id => e => {
        const value = e.target.value
        setState({
            ...state,
            [id]: value
        })
    }
    const handleLogin = () => {
        let request = {
            email: state.email,
            password: state.password
        }
        SendToService(request, 'POST', 'login', response => {
            let token = response.headers['x-auth-token']
            localStorage.setItem('x-auth-token', token)
            _setLoginStatus(true)
            props.history.push('/')
        })
    }
    return (
        <LoginRegister>
            {system.serviceStart?<Loader/>:''}
            <div className={classes.form}>
                <Typography
                    className={classes.title}
                    variant="h2"
                >
                    Sign in
                                    </Typography>
                <Typography
                    className={classes.subtitle}
                    variant="body1"
                >
                    Sign in as user
                                    </Typography>
                <div className={classes.fields}>
                    <TextField
                        fullWidth
                        id='email'
                        variant='outlined'
                        label='Email'
                        onChange={handleChange('email')}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" className={classes.inputIconsColor}>
                                    <Email />
                                </InputAdornment>
                            )

                        }}

                    />
                    <TextField
                        fullWidth
                        className={classes.textField}
                        onChange={handleChange('password')}
                        id='password'
                        variant='outlined'
                        label='Password'
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            type: state.typePassword,
                            startAdornment: (
                                <InputAdornment position="start" className={classes.inputIconsColor}>
                                    <Lock />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="Delete">
                                        {state.typePassword == 'password' ?
                                            <i className="fas fa-eye" style={{ fontSize: '16px' }}></i> :
                                            <i className="fas fa-eye-slash" style={{ fontSize: '16px' }} ></i>
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )


                        }}
                    />
                    <Button
                        className={classes.signInButton}
                        color="primary"
                        style={{ marginBottom: 20 }}
                        size="large"
                        variant="contained"
                        onClick={handleLogin}
                    >
                        Sign in now
                                     </Button>
                    <Link
                        // component={RouterLink}
                        style={{
                            color: '#636FA4', fontSize: '18px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                        }}
                        to="/register"
                        variant="h6"
                    >
                        New Register?
                                </Link>
                </div>
            </div>
        </LoginRegister>

    )
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))