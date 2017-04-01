import React from 'react'

export default class StarredNoteList extends React.Component {
  render() {
    const list = this.props.notes.map(note => {
      return <li key={note.id}>
        <div className="page-Stars-title">{note.title}</div>
        <div className="page-Stars-meta">
          <span className="page-Stars-author"><img src="/assets/user.svg" width="16" height="16" /> {note.user}</span>
          <span className="page-Stars-updated">{note.updated}</span>
        </div>
      </li>
    })

    return <div className="StarredLinkList">
      <ul>{list}</ul>
    </div>
  }
}
