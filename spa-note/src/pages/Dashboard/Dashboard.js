import React from 'react'
import { Container } from 'flux/utils'
import NoteAction from '../../actions/NoteAction'
import Button from '../../components/Button/Button'
import dashboardStore from '../../stores/dashboardStore'
import NoteList from '../../components/NoteList/NoteList'
import NoteEdit from './NoteEdit/NoteEdit'

class Dashboard extends React.Component {
  static getStores() {
    return [dashboardStore]
  }

  static calculateState() {
    return dashboardStore.getState()
  }

  render() {
    const { notes, selectedNoteId } = this.state
    const selectedNote = notes.find(note => {
      return selectedNoteId === note.id
    })

    return <div className="page-Dashboard">
      <div className="page-Dashboard-list">
        <div className="page-Dashboard-listHeader">
          <Button onClick={NoteAction.create}>
            New Note
          </Button>
        </div>
        <NoteList notes={notes} selectedNoteId={selectedNoteId} />
      </div>
      <div className="page-Dashboard-main">
        <NoteEdit note={selectedNote} />
      </div>
    </div>
  }
}

export default Container.create(Dashboard)
