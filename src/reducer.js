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

  default:
    return state
  }
}
