import './QuizzApp.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { data } from './data'
import { shuffleArray } from '../libs/arrays'
import { QuizzQuestionBlock } from './components/QuizzQuestionBlock'

export const QuizzApp = () => {
  /* App can be in three states: 'welcome', 'quizz', 'checking' */
  const [currentAppState, setCurrentAppState] = useState('welcome')
  const [questionsData, setQuestionsData] = useState([])
  const [selections, setSelections] = useState({})
  const [score, setScore] = useState(0)

  /* Modifying data, that came from server to track answer selection */
  const loadQuestionsData = (url) => {
    const dataModified = data.map((questionData) => {
      const answers = questionData.incorrect_answers.concat([
        questionData.correct_answer,
      ])

      shuffleArray(answers)

      const questionDataModified = {
        ...questionData,
        answers: answers,
        id: nanoid(),
      }

      delete questionDataModified['incorrect_answers']
      return questionDataModified
    })
    setQuestionsData(dataModified)
    setSelections(
      Object.fromEntries(dataModified.map((value) => [value.id, undefined])),
    )
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((jsonData) => {
    //     setQuestionsData(jsonData.results)
    //   })
  }

  const selectAnswer = (questionId, answer) => {
    setSelections((prev) => {
      const newSelections = { ...prev }
      newSelections[questionId] = answer
      return newSelections
    })
  }

  const openTriviaDBUrl = 'https://opentdb.com/api.php?amount=5'

  const startNewQuizz = useCallback(() => {
    setCurrentAppState('welcome')
    loadQuestionsData(openTriviaDBUrl)
  }, [])

  const checkQuizz = useCallback(() => {
    setCurrentAppState('checking')
    
  }, [])

  const quizzScreen = useMemo(
    () => (
      <section className='quizz-quizz'>
        {questionsData.map((questionData) => {
          return (
            <QuizzQuestionBlock
              key={questionData.id}
              questionData={questionData}
              selectedAnswer={selections[questionData.id]}
              selectAnswer={selectAnswer}
              currentAppState={currentAppState}
            />
          )
        })}
        {currentAppState === 'quizz' && (
          <button
            className='quizz-button quizz-checkbutton no-selection'
            onClick={checkQuizz}
          >
            Check answers
          </button>
        )}
        {currentAppState === 'checking' && (
          <section className='quizz-results'>
            You scored {5}/{5} correct answers
            <button
              className='quizz-button quizz-playagainbutton no-selection'
              onClick={startNewQuizz}
            >
              Play again
            </button>
          </section>
        )}
      </section>
    ),
    [currentAppState, questionsData, selections, startNewQuizz, checkQuizz],
  )

  const welcomeScreen = useMemo(
    () => (
      <section className='quizz-welcome'>
        <h1 className='quizz-welcome-title'>Quizzical</h1>
        <p className='quizz-welcome-description'>
          Pass the Quizz with random questions
        </p>
        <button
          className='no-selection quizz-button'
          onClick={() => setCurrentAppState('quizz')}
        >
          Start quiz
        </button>
      </section>
    ),
    [],
  )

  useEffect(() => {
    loadQuestionsData()
  }, [])

  return (
    <main className='quizz-app'>
      {currentAppState === 'welcome' ? welcomeScreen : quizzScreen}
    </main>
  )
}
