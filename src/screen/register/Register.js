import React, { useState } from 'react'
import LoginRegister from '../../component/LoginRegister/LoginRegister'
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockRounded"
import IconButton from '@material-ui/core/IconButton';
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from 'react-router-dom'
import styles from './style'
import { SendToService } from '../../service/serviceClient'
import { loginStatus } from '../../actions/userAction'
import Loader from '../../component/Loader/Loader'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
    user: state.user,
    system: state.system
})

const mapDispatchToProps = dispatch => ({
    _setLoginStatus: val => {
        dispatch(loginStatus(val))
    }
})


const Register = ({ ...props }) => {
    const { classes, _setLoginStatus } = props
    const [state, setState] = useState({
        typePassword: 'password'
    })
    const [register, setRegister] = useState({})

    const handleChangeEyes = () => {
        if (state.typePassword === 'password') {
            setState({ typePassword: '' })
        }
        else {
            setState({ typePassword: 'password' })
        }
    }
    const handleChange = id => e => {
        setRegister({
            ...register,
            [id]: e.target.value
        })
    }

    const handleSubmitRegister = () => {
        SendToService({ ...register }, 'POST', 'register', response => {
            let token = response.headers['x-auth-token']
            localStorage.setItem('x-auth-token', token)
            _setLoginStatus(true)
            props.history.push('/')
        })
    }
    return (<div>
        <LoginRegister>
            <div className={classes.form}>
                <Typography
                    className={classes.title}
                    variant="h2"
                >
                    Register
                </Typography>
                <Typography
                    className={classes.subtitle}
                    variant="body1"
                >
                    Register as user
                </Typography>
                <div className={classes.fields}>
                    <TextField
                        fullWidth
                        id='name'
                        variant='outlined'
                        label='Name'
                        onChange={handleChange('name')}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start" className={classes.inputIconsColor}>
                                    <Icon className={clsx(classes.inputIconsColor, 'fas fa-user')} />
                                </InputAdornment>
                            )

                        }}

                    />
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
                        id='password'
                        variant='outlined'
                        onChange={handleChange('password')}
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
                                    <IconButton aria-label="Delete" onClick={handleChangeEyes}>
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
                        onClick={handleSubmitRegister}
                    >
                        Register now
                                     </Button>
                    <Link
                        style={{
                            color: '#636FA4', fontSize: '18px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center'
                        }}
                        to="/Login"
                        variant="h6"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </LoginRegister>
    </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))