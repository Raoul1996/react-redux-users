import React from 'react'
import { hashHistory, Route, Router ,IndexRoute} from 'react-router'

import AppComponent from './components/app'
import Register from './components/users/Register'
import DemoContainer from './containers/demo.container'

const RouterApp = () => (
  <Router history={hashHistory}>
    <Route path="/" component={AppComponent}>
      <IndexRoute component={Register} />
      <Route path="register" component={Register} />
    </Route>

  </Router>
)

export default RouterApp