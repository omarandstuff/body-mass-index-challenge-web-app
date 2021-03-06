import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actionCreators from '../action_creators'
import Immutable from 'immutable'

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
    let loggedIn = this.props.SESSION_STATUS === 'LOGGED_IN'
    var sesssionBar = void 0
    var welcome = ""
    let user = this.props.USER || Immutable.Map()

    if(loggedIn) {
      welcome = (
        <div className="header item">
          Welcome { user.get('firstname') }
        </div>
      )
      sesssionBar = (
        <a className="item" onClick={ this.processLogOut }>Log Out</a>
      )
    } else {
      sesssionBar = (
        <Link to="/signup" className="item">Sign Up</Link>
      )
    }
    return (
      <div className="ui container">
        <div className="ui masthead vertical segment">
          <h2 className="ui center aligned icon header">
            <i className="circular empty red heart icon"></i>
            <Link to="/"> Body Mass Index Calculator</Link>
          </h2>
          <div className="ui menu">
            { welcome }
            <div className="right menu">
              { sesssionBar }
            </div>
          </div>
        </div>
        
        <div className="ui vertical segment">
          { this.props.children }
        </div>

        <div className="ui warning message">
          <div className="header">
            Learn more about Body Mass Index
          </div>
          <a href="https://en.wikipedia.org/wiki/Body_mass_index" target="blank"> Wikipedia </a>
        </div>
        <footer>
          
        </footer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    STATE: state,
    SESSION_STATUS: state.get('SESSION_STATUS'),
    USER: state.get('USER')
  }
}

export const LayoutContainer = connect(mapStateToProps, actionCreators)(Layout)
