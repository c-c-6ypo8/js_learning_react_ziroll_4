import './QuizzApp.css'
import { useState, useCallback } from 'react'
import { QuizzWelcomeScreen } from './components/QuizzWelcomeScreen'
import { QuizzQuizzScreen } from './components/QuizzQuizzScreen'

export const QuizzApp = () => {
  const [quizzData, setQuizzData] = useState([])
  /* App can be in three states: 'welcome', 'quizz', 'checking' */
  const [currentAppState, setCurrentAppState] = useState('welcome')

  const difficulties = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  }

  const startQuizz = useCallback(() => {
    setCurrentAppState('quizz')
  }, [])

  return (
    <main className='quizz-app'>
      {currentAppState === 'welcome' ? (
        <QuizzWelcomeScreen
          startQuizz={startQuizz}
          setQuizzData={setQuizzData}
          difficulties={difficulties}
        />
      ) : (
        <QuizzQuizzScreen
          quizzData={quizzData}
          setQuizzData={setQuizzData}
          currentAppState={currentAppState}
          setCurrentAppState={setCurrentAppState}
        />
      )}
    </main>
  )
}
