import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

export default class NotFoundPage extends React.Component {

  constructor(props) {
    super(props)
    this.mixins = [PureRenderMixin]
  }

  render() {
    return (
      <DocumentTitle title={'Page not found'}>
        <div>
          <h1>404</h1>
          <h2>Page not found!</h2>
          <p>
            <Link to="/">Go back to the main page</Link>
          </p>
        </div>
      </DocumentTitle>
    )
  }
}
