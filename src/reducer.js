import * as coreFunctions from './core'

export default function reducer(state = coreFunctions.INITIAL_STATE, action) {
  switch (action.type) {
  case 'INITIAL_STATE':
    return action.state
  case 'LOGIN':
    return coreFunctions.logIn(state, action.email, action.password)
  case 'LOGIN_SUCCEEDED':
    return coreFunctions.logInSucceeded(state, action.data)
  case 'CHANGE_LOGIN_FORM':
    return coreFunctions.changeLoginForm(state, action.field, action.value)
  case 'LOGIN_FAILED':
    return coreFunctions.logInFailed(state)
  case 'SIGNUP':
    return coreFunctions.signUp(state, action.data)
  case 'SIGNUP_SUCCEEDED':
    return coreFunctions.signUpSucceeded(state, action.data)
  case 'SIGNUP_FAILED':
    return coreFunctions.signUpFailed(state)
  case 'CHANGE_SIGNUP_FORM':
    return coreFunctions.changeSignUpForm(state, action.field, action.value)
  case 'LOGOUT':
    return coreFunctions.logOut(state)

  case 'LOAD_RECORDS':
    return coreFunctions.loadRecords(state, action.records)
  case 'RECORDS_LOADED':
    return coreFunctions.recordsLoaded(state, action.records)
  case 'RECORDS_LOAD_FAILED':
    return coreFunctions.recordsLoadFailed(state)
  case 'CREATE_RECORD':
    return coreFunctions.createRecord(state, action.record)
  case 'RECORD_CREATED':
    return coreFunctions.recordCreated(state, action.record)
  case 'RECORD_CREATION_FAILED':
    return coreFunctions.recordCreationFailed(state)
  case 'CHANGE_RECORD_FORM':
    return coreFunctions.changeRecordForm(state, action.field, action.value)
  case 'DELETE_RECORD':
    return coreFunctions.deleteRecord(state, action.id)
  case 'RECORD_DELETED':
    return coreFunctions.recordDeleted(state, action.id)
  case 'RECORD_DELETION_FAILED':
    return coreFunctions.recordDeletionFailed(state, action.id)

  default:
    return state
  }
}
