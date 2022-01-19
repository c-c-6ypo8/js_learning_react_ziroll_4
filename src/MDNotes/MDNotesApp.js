import { useState } from 'react'
import { nanoid } from 'nanoid'
import Split from 'react-split'

import './MDNotesApp.css'
import { data } from './data'
import MDNotesSidebar from './components/MDNotesSidebar'
import MDNotesEditor from './components/MDNotesEditor'

export const MDNotesApp = () => {
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || '',
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote
      }),
    )
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  return (
    <div className="mdnotes-app">
      <main className="mdnotes-main">
        {notes.length > 0 ? (
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="mdnotes-main-split"
          >
            <MDNotesSidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
            />
            {currentNoteId && notes.length > 0 && (
              <MDNotesEditor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            )}
          </Split>
        ) : (
          <div className="mdnotes-main-nonotes">
            <h1>You have no notes</h1>
            <button className="mdnotes-main-firstnote" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
