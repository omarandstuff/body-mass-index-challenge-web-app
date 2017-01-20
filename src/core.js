import * as CoreApi from './core-api'
import Immutable from 'immutable'
import empty from 'is-empty'
import Cookies from 'cookies-js'

export const INITIAL_STATE = Immutable.Map({ SESSION_STATUS: 'NOT_LOGGED_IN' })

export function logIn(state, email = '', password = '') {
  let token = Cookies.get('token')

  if(empty(token) && (empty(email) || empty(password))) {
    return Immutable.Map({ SESSION_STATUS: 'NOT_LOGGED_IN' })
  }
  else {
    CoreApi.logIn({ token: token, credentials:{ email: email, password: password }})

    return state.set('SESSION_STATUS', 'LOGGING_IN')
  }
}

export function logInSucceeded(state, data) {
  Cookies.set('token', data.token)

  return Immutable.Map({ SESSION_STATUS: 'LOGGED_IN', USER: Immutable.Map(data.user) })
}

export function changeLoginForm(state, field, value) {
  return state.setIn(['LOGIN_FORM', field], value)
}

export function logInFailed(state) {
  return Immutable.Map({SESSION_STATUS: 'NOT_LOGGED_IN'})
}

export function signUp(state, data) {
  CoreApi.signUp({ user: data })

  return state.set('SIGN_UP_STATUS', 'SIGNING_UP')
}

export function signUpSucceeded(state, data) {
  Cookies.set('token', data.token)

  return Immutable.Map({ SESSION_STATUS: 'LOGGED_IN', USER: data.user })
}

export function signUpFailed(state) {
  return Immutable.Map({SESSION_STATUS: 'NOT_LOGGED_IN'})
}

export function changeSignUpForm(state, field, value) {
  return state.setIn(['SIGN_UP_FORM', field], value)
}

export function logOut(state) {
  CoreApi.logOut()

  return INITIAL_STATE
}
