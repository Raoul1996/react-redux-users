import React from 'react'
import {hashHistory, Route, Router, IndexRoute, Redirect} from 'react-router'

import AppComponent from './components/app'
// this is the register about components start
import Register from './components/users/Register'
import VerifyMail from './components/users/Register/VerifyMail'
import Actived from './components/users/Register/VerifyMail/Actived'
import Login from './components/users/Login'
import Password from './components/users/Password'
import EditUserInfo from './containers/editUserInfo.container'
const RouterApp = () => (
  <Router history={hashHistory}>
    {/* because I only have the register component this moment, so I Redirect the root path to the register route */ }
    {/*<Redirect path="/" to="login"/>*/}
    <Route path="/" component={AppComponent}>
      <Route path="register">
        <IndexRoute component={Register}/>
        <Route path="verify" component={VerifyMail}>
          <Route path=":vcode" component={VerifyMail}/>
        </Route>
        <Route path="active" component={VerifyMail}/>
        <Route path="actived" component={Actived}/>
      </Route>
      <Route path="login">
        <IndexRoute component={Login}/>
      </Route>
      <Route path="password">
        <IndexRoute component={Password}/>
        <Route path=':type' component={Password} />
      </Route>
      <Route path="info">
        <IndexRoute component={EditUserInfo}/>
      </Route>
    </Route>

  </Router>
)

export default RouterApp