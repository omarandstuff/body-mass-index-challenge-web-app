import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { LayoutContainer } from './components/Layout'
import { IndexPageContainer } from './components/IndexPage'
import NotFoundPage from './components/NotFoundPage'
import { SignUpContainer} from './components/SignUp'
import { LogInContainer} from './components/LogIn'

const routes = (
  <Route path="/" component={ LayoutContainer }>
    <IndexRoute component={ IndexPageContainer }/>
    <Route path="login" component={ LogInContainer }/>
    <Route path="signup" component={ SignUpContainer }/>
    <Route path="*" component={ NotFoundPage }/>
  </Route>
)

export default routes
