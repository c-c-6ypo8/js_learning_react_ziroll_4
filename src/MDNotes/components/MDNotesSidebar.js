import './MDNotesSidebar.css'

export default function MDNotesSidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`mdnotes-sidebar-title ${
          note.id === props.currentNote.id
            ? 'mdnotes-sidebar-selectednote'
            : ''
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className="mdnotes-sidebar-textsnippet">Note {index + 1}</h4>
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
