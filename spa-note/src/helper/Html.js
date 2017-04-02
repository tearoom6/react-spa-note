import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'

export default class Html extends Component {
  render() {
    const { component, initialData } = this.props
    const content = component ? renderToString(component) : ''
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <title>SPA Note</title>
          <link rel="stylesheet" href="/bundle.css" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: content}}/>
          <script id="initial-data" type="text/plain" data-json={JSON.stringify(initialData)}></script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    )
  }
}
