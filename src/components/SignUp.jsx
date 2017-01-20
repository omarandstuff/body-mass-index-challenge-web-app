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
        <div className="ui container">
          <div className="ui two column centered grid">
            <div className="column">
              <h2 className="ui center">
                SignUp
              </h2>
              <form className="ui form" onSubmit={ this.processSignUp }>
                <div className="field">
                  <label>Email</label>
                  <input name='email' type='text' value={ form.get('email') || '' } placeholder="Email" onChange={ this.handleChange }/>
                </div>
                <div className="field">
                  <label>Firstname</label>
                  <input name='firstname' type='text' value={ form.get('firstname') || '' } placeholder="Firstname" onChange={ this.handleChange }/>
                </div>
                <div className="field">
                  <label>Lastname</label>
                  <input name='lastname' type='text' value={ form.get('lastname') || '' } placeholder="Lastname" onChange={ this.handleChange }/>
                </div>
                <div className="field">
                  <label>Password</label>
                  <input name='password' type='password' value={ form.get('password') || '' } placeholder="Password" onChange={ this.handleChange }/>
                </div>
                <button className="ui button" type="submit">Submit</button>
              </form>
            </div>
          </div>
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
