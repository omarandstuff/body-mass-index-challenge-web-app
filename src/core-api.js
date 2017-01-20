import Ajax from 'simple-ajax'
import { store } from './store'
import * as actionCreators from './action_creators'

export const API_URL = 'http://localhost:3000/'
export var TOKEN

function getResponse(event) {
  return JSON.parse(event.target.response)
}

export function logIn(data) {
  var ajax = new Ajax({
        url: this.API_URL + 'login',
        method: 'POST',
        data: JSON.stringify(data.credentials),
        headers: data.token ? { csrf_token: data.token } : null
      })

  ajax.on('success', event => {
    var response = getResponse(event)

    TOKEN = response.token

    store.dispatch(actionCreators.logInSucceeded(response))
  })

  ajax.on('error', event => {
    store.dispatch(actionCreators.logInFailed())
  })

  ajax.send()
}

export function signUp(data) {
  var ajax = new Ajax({
        url: this.API_URL + 'signup',
        method: 'POST',
        data: JSON.stringify(data)
      })

  ajax.on('success', event => {
    var response = getResponse(event)

    TOKEN = response.token

    store.dispatch(actionCreators.signUpSucceeded(response))
  })

  ajax.on('error', event => {
    store.dispatch(actionCreators.signUpFailed())
  })

  ajax.send()
}

export function logOut() {
  var ajax = new Ajax({
        url: this.API_URL + 'logout',
        method: 'DELETE',
        headers: { csrf_token: TOKEN }
      })

  ajax.on('success', event => {
    TOKEN = null
  })

  ajax.on('error', event => {
  })

  ajax.send()
}



export function loadRecords() {
  var ajax = new Ajax({
        url: this.API_URL + 'records',
        method: 'GET',
        headers: { csrf_token: TOKEN }
      })

  ajax.on('success', event => {
    var response = getResponse(event)
    store.dispatch(actionCreators.recordsLoaded(response))
  })

  ajax.on('error', event => {
    store.dispatch(actionCreators.recordsLoadFailed())
  })

  ajax.send()
}

export function createRecord(data) {
  var ajax = new Ajax({
        url: this.API_URL + 'records',
        method: 'POST',
        headers: { csrf_token: TOKEN },
        data: JSON.stringify(data)
      })

  ajax.on('success', event => {
    var response = getResponse(event)

    store.dispatch(actionCreators.recordCreated(response))
  })

  ajax.on('error', event => {
    store.dispatch(actionCreators.recordCreationFailed())
  })

  ajax.send()
}

export function deleteRecord(id) {
  var ajax = new Ajax({
        url: this.API_URL + 'records/' + id,
        method: 'DELETE',
        headers: { csrf_token: TOKEN }
      })

  ajax.on('success', event => {
    store.dispatch(actionCreators.recordDeleted(id))
  })

  ajax.on('error', event => {
    store.dispatch(actionCreators.recordDeletionFailed(id))
  })

  ajax.send()
}
