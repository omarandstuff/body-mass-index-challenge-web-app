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

export function loadRecords() {
  return {
    type: 'LOAD_RECORDS'
  }
}

export function recordsLoaded(records) {
  return {
    type: 'RECORDS_LOADED',
    records: records
  }
}

export function recordsLoadFailed() {
  return {
    type: 'RECORDS_LOAD_FAILED'
  }
}

export function createRecord(record) {
  return {
    type: 'CREATE_RECORD',
    record: record
  }
}

export function recordCreated(record) {
  return {
    type: 'RECORD_CREATED',
    record: record
  }
}

export function recordCreationFailed() {
  return {
    type: 'RECORD_CREATION_FAILED'
  }
}

export function changeRecordForm(field, value) {
  return {
    type: 'CHANGE_RECORD_FORM',
    field: field,
    value: value
  }
}

export function deleteRecord(id) {
  return {
    type: 'DELETE_RECORD',
    id: id
  }
}

export function recordDeleted(id) {
  return {
    type: 'RECORD_DELETED',
    id: id
  }
}

export function recordDeletionFailed(id) {
  return {
    type: 'RECORD_DELETION_FAILED',
    id: id
  }
}
