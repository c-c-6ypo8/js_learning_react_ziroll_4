import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { FFactsApp } from './FFacts/FFactsApp'
import { MDNotesApp } from './MDNotes/MDNotesApp'
import { TenziesApp } from './Tenzies/TenziesApp'

const rootElement = document.getElementById('root')
const linkFFacts = document.getElementById('ffacts')
const linkMDNotes = document.getElementById('mdnotes')
const linkTenzies = document.getElementById('tenzies')

const apps = [
  { link: linkFFacts, app: <FFactsApp /> },  
  { link: linkMDNotes, app: <MDNotesApp /> },  
  { link: linkTenzies, app: <TenziesApp /> },  
]

const renderApp = (app) => {
  ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, rootElement)
}

const choose = (target) => {
  apps.forEach((el) => {
    el.link.classList.remove('chosen')
  })
  target.classList.add('chosen')
  for (let el of apps) {
    if (el.link === target) {
      renderApp(el.app)
      break
    }
  }
}

for (let app of apps) {
  app.link.addEventListener('click', (e) => {
    e.preventDefault()  
    choose(app.link)
  })
}

choose(linkMDNotes)
