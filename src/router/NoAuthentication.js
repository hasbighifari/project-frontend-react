import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../screen/login/Login'
import Register from '../screen/register/Register'

const NoAuthentication = () => (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Login" component={Login} />
        <Route path='/register' component={Register}/>
    </Switch>
)

export default NoAuthentication

