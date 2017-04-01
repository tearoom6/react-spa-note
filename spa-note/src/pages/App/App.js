import React from 'react'
import GlobalHeader from '../../components/GlobalHeader/GlobalHeader'
import { announcePageTitle } from '../../announcer'

export default class App extends React.Component {
  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname
    const curtPath = this.props.location.pathname
    if (prevPath !== curtPath) announcePageTitle()
  }

  render() {
    return <div className="page-App">
      <div className="page-App-header" role="header">
        <GlobalHeader />
      </div>
      <div className="page-App-main" role="main">
        {this.props.children}
      </div>
    </div>
  }
}
