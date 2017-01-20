export function logIn(email = '', password = '') {
  return {
    type: 'LOGIN',
    email: email,
    password: password
  }
}

export function logInSucceeded(data) {
  return {
    type: 'LOGIN_SUCCEEDED',
    data: data
  }
}

export function logInFailed() {
  return {
    type: 'LOGIN_FAILED'
  }
}

export function changeLoginForm(field, value) {
  return {
    type: 'CHANGE_LOGIN_FORM',
    field: field,
    value: value
  }
}

export function signUp(data) {
  return {
    type: 'SIGNUP',
    data: data
  }
}

export function signUpSucceeded(data) {
  return {
    type: 'SIGNUP_SUCCEEDED',
    data: data
  }
}

export function signUpFailed() {
  return {
    type: 'SIGNUP_FAILED'
  }
}

export function changeSignUpForm(field, value) {
  return {
    type: 'CHANGE_SIGNUP_FORM',
    field: field,
    value: value
  }
}

export function logOut() {
  return {
    type: 'LOGOUT'
  }
}
