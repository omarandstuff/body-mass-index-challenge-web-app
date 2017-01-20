import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'

export class Layout extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]

    this.processLogOut = this.processLogOut.bind(this)
  }

  componentDidMount() {
    this.props.logIn()
  }

  processLogOut(e) {
    if(e.preventDefault) e.preventDefault()

    this.props.logOut()

    return false
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <p>
              Body Mass Index Calculator
            </p>
          </Link>
          { this.props.SESSION_STATUS === 'LOGGED_IN' ? (
              <a href='#' onClick={ this.processLogOut }>Log Out</a>
            ) : (
              <div>
                <div>
                  <Link to="/login">Log in</Link>
                </div>
                <div>
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            )}
        </header>
        <div>
          <p>
          ------------------------------------------------------------------------------------------------
          </p>
          { this.props.children }
          <p>
          ------------------------------------------------------------------------------------------------
          </p>
        </div>
        <footer>
          <p>
            David de Anda© 2017
          </p>
          <pre>
            { JSON.stringify(this.props.STATE, null, 2) }
          </pre>
        </footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    STATE: state,
    SESSION_STATUS: state.get('SESSION_STATUS')
  }
}

export const LayoutContainer = connect(mapStateToProps, actionCreators)(Layout)
