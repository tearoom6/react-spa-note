import React from 'react'
import { Container } from 'flux/utils'
import NoteAction from '../../actions/NoteAction'
import { getStores, getState } from '../../stores'
import Button from '../../components/Button/Button'
import NoteList from '../../components/NoteList/NoteList'

class Dashboard extends React.Component {
  static getStores() {
    return getStores(['dashboardStore'])
  }

  static calculateState() {
    return getState('dashboardStore')
  }

  static prefetch() {
    return NoteAction.fetchMyNotes()
  }

  componentDidMount() {
    Dashboard.prefetch()
  }

  handleClickNew() {
    NoteAction.create()
  }

  render() {
    const note = this.state.notes.find(note => note.id === Number(this.props.params.id))
    return <div className="page-Dashboard">
      <div className="page-Dashboard-list">
        <div className="page-Dashboard-listHeader">
          <Button onClick={() => this.handleClickNew()}>New Note</Button>
        </div>
        <div role="navigation">
          <NoteList notes={this.state.notes} selectedNoteId={this.props.params.id} />
        </div>
      </div>
      <div className="page-Dashboard-main" role="form">
        {this.props.children ? React.cloneElement(this.props.children, { note: note }) : null}
      </div>
    </div>
  }
}

export default Container.create(Dashboard)
