import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Posts from '../components/Posts/Posts'
import Signup from '../components/Account/Signup/Signup'

class App extends Component {
  render() {
    return (
        <Layout>
            <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/" exact component={Posts} />
                <Route render={() => <h1>404</h1>} />
            </Switch>
        </Layout>
    )
  }
}

export default App;
