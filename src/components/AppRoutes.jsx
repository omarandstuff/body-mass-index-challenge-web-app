import React from 'react'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from '../routes'
import { store } from '../store'

export default class AppRoutes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
      </Provider>
    )
  }
}
