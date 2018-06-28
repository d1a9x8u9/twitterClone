import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import asyncComponent from '../hoc/asyncComponent'

const AsyncProfile = asyncComponent(() => import('../components/Account/Profile/Profile'))
const AsyncSignup = asyncComponent(() => import('../components/Account/Signup/Signup'))
const AsyncHomepage = asyncComponent(() => import('../components/Posts/Posts'))

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/profile" component={AsyncProfile} />
                    <Route path="/signup" component={AsyncSignup} />
                    <Route path="/" exact component={AsyncHomepage} />
                    <Route render={() => <h1>404</h1>} />
                </Switch>
            </Layout>
        )
    }
}

export default App
