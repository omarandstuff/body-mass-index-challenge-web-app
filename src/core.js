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

  return Immutable.Map({ SESSION_STATUS: 'LOGGED_IN', USER: Immutable.Map(data.user) })
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

export function loadRecords(state) {
  CoreApi.loadRecords()

  return state.set('RECORDS_STATUS', 'LOADING')
}

export function recordsLoaded(state, records) {
  return state.set('RECORDS', Immutable.List()).mergeIn(['RECORDS'], records).set('RECORDS_STATUS', 'LOADED')
}

export function recordsLoadFailed(state) {
  return state.set('RECORDS_STATUS', 'LOAD_FAILED')
}

export function createRecord(state, record) {
  CoreApi.createRecord(record)

  return state.set('RECORD_STATUS', 'CREATING')
}

export function recordCreated(state, record) {
  return state.update('RECORDS', records => records.unshift(Immutable.Map(record))).set('RECORD_STATUS', 'CREATED').remove('RECORD_FORM')
}

export function changeRecordForm(state, field, value) {
  return state.setIn(['RECORD_FORM', field], value)
}

export function recordCreationFailed(state) {
  return state.set('RECORD_STATUS', 'CREATION_FAILED')
}

export function deleteRecord(state, id) {
  CoreApi.deleteRecord(id)

  return state.setIn(['RECORDS_STATUSES', id], 'DELETING')
}

export function recordDeleted(state, id) {
  return state.update('RECORDS', records => records.filterNot(record => record.get('id') === id)).deleteIn(['RECORDS_STATUSES', id])
}

export function recordDeletionFailed(state, id) {
  return state.setIn(['RECORDS_STATUSES', id], 'DELETION_FAILED')
}
