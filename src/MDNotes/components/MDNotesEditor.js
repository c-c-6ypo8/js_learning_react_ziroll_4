import { useState } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'

import './MDNotesEditor.css'
import 'react-mde/lib/styles/css/react-mde-all.css'

export default function MDNotesEditor({ currentNote, updateNote }) {
  const [selectedTab, setSelectedTab] = useState('write')

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  return (
    <section className="pane mdnotes-editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={65}
        minPreviewHeight={60}
        heightUnits="vh"
      />
    </section>
  )
}
