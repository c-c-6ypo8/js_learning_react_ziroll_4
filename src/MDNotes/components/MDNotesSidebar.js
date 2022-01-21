import { findDOMNode } from 'react-dom'
import './MDNotesSidebar.css'

export default function MDNotesSidebar(props) {
  const handleDelete = (index, event) => {
    event.stopPropagation()
    props.deleteNote(index)
    if (props.notes[index].id === props.currentNote.id) {
      props.setCurrentNoteId(props.notes[index + 1]?.id ?? props.notes[0].id)
    }
  }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`mdnotes-sidebar-title ${
          note.id === props.currentNote.id ? 'mdnotes-sidebar-selectednote' : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="mdnotes-sidebar-textsnippet">
          {props.notes[index].body.split('\n')[0] || '(empty)'}
        </h4>
        <div
          className="mdnotes-sidebar-title-closebutton"
          onClick={(event) => handleDelete(index, event)}
        >
          ✕
        </div>
      </div>
    </div>
  ))

  return (
    <section className="pane mdnotes-sidebar">
      <div className="mdnotes-sidebar-header">
        <h3>Notes</h3>
        <button className="mdnotes-sidebar-newnote" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  )
}
