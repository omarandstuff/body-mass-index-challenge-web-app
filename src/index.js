import React from 'react'
import ReactDOM from 'react-dom'
import AppRoutes from './components/AppRoutes'
import { store } from './store'
import Immutable from 'immutable'

store.dispatch({ type: 'INITIAL_STATE', state: Immutable.Map({ SESSION_STATUS: 'CHECKING_SESSION' }) })

ReactDOM.render(<AppRoutes/>, document.getElementById('root'))
