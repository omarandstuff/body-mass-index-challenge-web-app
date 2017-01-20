import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'
import Immutable from 'immutable'

export class LogIn extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]

    this.handleChange = this.handleChange.bind(this)
    this.processLogIn = this.processLogIn.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.SESSION_STATUS === 'LOGGED_IN') this.context.router.push('/')
  }

  processLogIn(e) {
    if (e.preventDefault) e.preventDefault()

    var logInForm = this.props.LOGIN_FORM

    this.props.logIn(logInForm.get('email'), logInForm.get('password'))
  }

  handleChange(e) {
    this.props.changeLoginForm(e.target.name, e.target.value)
  }

  render() {
    let form = this.props.LOGIN_FORM || Immutable.Map()

    return (
      <DocumentTitle title={'LogIn'}>
        <div className="ui container">
          <div className="ui two column centered grid">
            <div className="column">
              <h2 className="ui center">
                Login
              </h2>
              <form className="ui form" onSubmit={ this.processLogIn }>
                <div className="field">
                  <label>Email</label>
                  <input name='email' type='text' value={ form.get('email') || '' } placeholder="Email" onChange={ this.handleChange }/>
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

LogIn.contextTypes = { router: React.PropTypes.object.isRequired }

function mapStateToProps(state) {
  return {
    SESSION_STATUS: state.get('SESSION_STATUS'),
    LOGIN_FORM: state.get('LOGIN_FORM')
  }
}

export const LogInContainer = connect(mapStateToProps, actionCreators)(LogIn)
