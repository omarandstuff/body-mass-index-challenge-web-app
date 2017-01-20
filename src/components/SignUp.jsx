import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import Immutable from 'immutable'

export class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]

    this.handleChange = this.handleChange.bind(this)
    this.processSignUp = this.processSignUp.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.SESSION_STATUS === 'LOGGED_IN') this.context.router.push('/')
  }

  processSignUp(e) {
    if (e.preventDefault) e.preventDefault()

    var payload = this.props.SIGN_UP_FORM.toJS()

    this.props.signUp(payload)
  }

  handleChange(e) {
    this.props.changeSignUpForm(e.target.name, e.target.value)
  }

  render() {
    let form = this.props.SIGN_UP_FORM || Immutable.Map()

    return (
      <DocumentTitle title={'SignUp'}>
        <div>
          <h2>
            SignUp
          </h2>
          <form onSubmit={ this.processSignUp }>
            <div>
              <label>Email</label>
              <input name='email' type='email' value={ form.get('email') || '' } onChange={ this.handleChange }/>
            </div>
            <div>
              <label>Firstname</label>
              <input name='firstname' type='text' value={ form.get('firstname') || '' } onChange={ this.handleChange }/>
            </div>
            <div>
            <label>Lastname</label>
              <input name='lastname' type='text' value={ form.get('lastname') || '' } onChange={ this.handleChange }/>
            </div>
            <div>
              <label>Password</label>
              <input name='password' type='password' value={ form.get('password') || '' } onChange={ this.handleChange }/>
            </div>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}

SignUp.contextTypes = { router: React.PropTypes.object.isRequired }

function mapStateToProps(state) {
  return {
    SESSION_STATUS: state.get('SESSION_STATUS'),
    SIGN_UP_FORM: state.get('SIGN_UP_FORM')
  }
}

export const SignUpContainer = connect(mapStateToProps, actionCreators)(SignUp)
