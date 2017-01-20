import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DocumentTitle from 'react-document-title'
import {connect} from 'react-redux'
import * as actionCreators from '../action_creators'

export class IndexPage extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]
  }

  componentWillMount() {
    if(this.props.SESSION_STATUS === 'NOT_LOGGED_IN') this.context.router.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.SESSION_STATUS === 'NOT_LOGGED_IN') this.context.router.push('/login')
  }

  render() {
    return (
      <DocumentTitle title={'Home'}>
        <h1>
          Body Mass Index Calculator!!!
        </h1>
      </DocumentTitle>
    )
  }
}

IndexPage.contextTypes = { router: React.PropTypes.object.isRequired }

function mapStateToProps(state) {
  return {
    SESSION_STATUS: state.get('SESSION_STATUS')
  }
}

export const IndexPageContainer = connect(mapStateToProps, actionCreators)(IndexPage)
