import React from 'react'
import { Container } from 'flux/utils'
import NoteHeader from '../../components/NoteHeader/NoteHeader'
import NoteBody from '../../components/NoteBody/NoteBody'
import NoteAction from '../../actions/NoteAction'
import StarAction from '../../actions/StarAction'
import { getStores, getState } from '../../stores'

class Note extends React.Component {
  static getStores() {
    return getStores(['noteStore'])
  }

  static calculateState() {
    return getState('noteStore')
  }

  static prefetch(props) {
    return NoteAction.fetch(Number(props.params.id))
  }

  componentDidMount() {
    Note.prefetch(this.props)
  }

  handleChangeStar(starred) {
    const note = Object.assign({}, this.state.note, { starred })
    this.setState({ note })

    if (starred) {
      StarAction.create(note.id)
    }
    else {
      StarAction.delete(note.id)
    }
  }

  render() {
    const note = this.state.note
    if (!note || !note.id) return null

    return <div className="page-Note">
      <NoteHeader note={note} onChangeStar={this.handleChangeStar.bind(this)} />
      <NoteBody body={note.body} />
    </div>
  }
}

export default Container.create(Note)
