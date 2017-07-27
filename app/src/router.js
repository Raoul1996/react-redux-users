import React from 'react'
import { hashHistory, Route, Router } from 'react-router'

import AppComponent from './components/app'
import Register from './components/users/Register'
import DemoContainer from './containers/demo.container'

const RouterApp = () => (
  <Router history={hashHistory}>
    <Route path="/" component={AppComponent}>
      <Route path="demo" component={DemoContainer} />
      <Route path="register" component={Register} />
    </Route>

  </Router>
)

export default RouterApp