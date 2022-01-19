import './FFactsApp.css'
import './components/FFactsNavbar'
import { FFactsNavbar } from './components/FFactsNavbar'
import { FFactsMain } from './components/FFactsMain'
import { useState } from 'react'

export const FFactsApp = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <div className="ffacts-app">
      <FFactsNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <FFactsMain darkMode={darkMode} />
    </div>
  )
}
