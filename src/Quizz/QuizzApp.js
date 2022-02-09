import './QuizzApp.css'
import { useState, useCallback } from 'react'
import { QuizzWelcomeScreen } from './components/QuizzWelcomeScreen'
import { QuizzQuizzScreen } from './components/QuizzQuizzScreen'

export const QuizzApp = () => {
  const [apiURL, setApiURL] = useState()
  /* App can be in three states: 'welcome', 'quizz', 'checking' */
  const [currentAppState, setCurrentAppState] = useState('welcome')

  const startQuizz = useCallback(() => {
    setCurrentAppState('quizz')
  }, [])

  return (
    <main className='quizz-app'>
      {currentAppState === 'welcome' ? (
        <QuizzWelcomeScreen startQuizz={startQuizz} setApiURL={setApiURL}/>
      ) : (
        <QuizzQuizzScreen
          currentAppState={currentAppState}
          setCurrentAppState={setCurrentAppState}
          apiURL={apiURL}
        />
      )}
    </main>
  )
}
