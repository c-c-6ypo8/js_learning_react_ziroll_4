import { useCallback, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Split from 'react-split'

import './MDNotesApp.css'
import MDNotesSidebar from './components/MDNotesSidebar'
import MDNotesEditor from './components/MDNotesEditor'
import { moveArrayElement } from '../libs/arrays'

const notesLSName = 'notes'

export const MDNotesApp = () => {
  const loadNotesFromLS = () => {
    const notesLS = localStorage.getItem(notesLSName)
    if (notesLS) {
      console.info('Notes loaded')
      return JSON.parse(notesLS)
    } else {
      console.info('No notes were found')
      return []
    }
  }

  const [notes, setNotes] = useState(() => loadNotesFromLS())
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || '',
  )

  const saveNotesToLS = useCallback(() => {
    localStorage.setItem(notesLSName, JSON.stringify(notes))
    console.info('Notes saved')
  }, [notes])

  const moveCurrentNoteToTop = useCallback(() => {
    let currentNotePosition
    for (let [index, note] of notes.entries()) {
      if (note.id === currentNoteId) {
        currentNotePosition = index
        break
      }
    }
    setNotes((prev) => moveArrayElement(prev, currentNotePosition, 0))
  }, [notes, currentNoteId])

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  const updateNote = (text) => {
    moveCurrentNoteToTop()
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        if (oldNote.id === currentNoteId) {
          return { ...oldNote, body: text }
        } else {
          return oldNote
        }
      }),
    )
  }

  const findCurrentNote = () => {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  const deleteNote = (index) => {
    setNotes((prev) => {
      let next = [...prev]
      next.splice(index, 1)
      return next
    })
    /* If deleted note is the selected one and it is not the last, then move 
    selection to the end, otherwise, if it is the last — move it to the top */
    if (notes[index].id === findCurrentNote().id) {
      setCurrentNoteId(notes[index + 1]?.id ?? notes[0].id)
    }
  }

  useEffect(() => {
    saveNotesToLS()
  }, [saveNotesToLS])

  return (
    <div className='mdnotes-app'>
      <main className='mdnotes-main'>
        {notes.length > 0 ? (
          <Split
            sizes={[30, 70]}
            direction='horizontal'
            className='mdnotes-main-split'
          >
            <MDNotesSidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {currentNoteId && notes.length > 0 && (
              <MDNotesEditor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            )}
          </Split>
        ) : (
          <div className='mdnotes-main-nonotes'>
            <h1>You have no notes</h1>
            <button className='mdnotes-main-firstnote' onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
