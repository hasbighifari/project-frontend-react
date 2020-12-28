import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../screen/Dashboard/Dashboard'

const Authentication = () => (
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/Dashboard" component={Dashboard} />
    </Switch>
)

export default Authentication