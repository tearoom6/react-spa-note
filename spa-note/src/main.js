import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App/App'
import Dashboard from './pages/Dashboard/Dashboard'
import NoteEdit from './pages/Dashboard/NoteEdit/NoteEdit'

ReactDOM.render(
  <App>
    <Dashboard>
      <NoteEdit />
    </Dashboard>
  </App>,
  document.getElementById('app')
)
