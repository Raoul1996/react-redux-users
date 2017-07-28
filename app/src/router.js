import React from 'react'
import {hashHistory, Route, Router, IndexRoute} from 'react-router'

import AppComponent from './components/app'
import Register from './components/users/Register'
import VerifyMail from './components/users/Register/VerifyMail'
import Actived from './components/users/Register/VerifyMail/Actived'

const RouterApp = () => (
  <Router history={hashHistory}>
    <Route path="/" component={AppComponent}>
      <Route path="register">
        <IndexRoute component={Register}/>
        <Route path="verify" component={VerifyMail} >
          <Route path=":vcode" component={VerifyMail} />
        </Route>
        <Route path="active" component={VerifyMail} />
        <Route path="actived" component={Actived} />
      </Route>
    </Route>

  </Router>
)

export default RouterApp