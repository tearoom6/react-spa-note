import React from 'react'

export default class GlobalHeader extends React.Component {
  render() {
    return <div className="GlobalHeader">
      <div className="GlobalHeader-inner">
        <h1 className="GlobalHeader-title">SPA Note</h1>
        <div className="GlobalHeader-menu">
          <span className="GlobalHeader-user">
            <img src="/assets/user.svg" width="16" height="16" />
            <span>MyUserName</span>
          </span>
        </div>
      </div>
    </div>
  }
}
