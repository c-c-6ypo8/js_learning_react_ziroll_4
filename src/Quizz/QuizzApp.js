import './QuizzApp.css'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { nanoid } from 'nanoid'
import { shuffleArray } from '../libs/arrays'
import { QuizzQuestionBlock } from './components/QuizzQuestionBlock'

export const QuizzApp = () => {
  /* App can be in three states: 'welcome', 'quizz', 'checking' */
  const [currentAppState, setCurrentAppState] = useState('welcome')
  const [questionsData, setQuestionsData] = useState([])
  const [score, setScore] = useState(0)

  /* Modifying data, that came from server to track answer selection */
  const loadQuestionsData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const dataModified = jsonData.results.map((questionData) => {
          const answers = questionData.incorrect_answers.concat([
            questionData.correct_answer,
          ])

          shuffleArray(answers)

          const questionDataModified = {
            ...questionData,
            answers: answers,
            selected_answer: undefined,
            id: nanoid(),
          }

          delete questionDataModified['incorrect_answers']
          return questionDataModified
        })
        setQuestionsData(dataModified)
      })
  }

  const selectAnswer = (questionNum, answer) => {
    setQuestionsData((prev) => {
      const newData = [...prev]
      newData[questionNum].selected_answer = answer
      countScore()
      return newData
    })
  }

  const openTriviaDBUrl = 'https://opentdb.com/api.php?amount=5'

  const startWelcome = useCallback(() => {
    setCurrentAppState('welcome')
    loadQuestionsData(openTriviaDBUrl)
  }, [])

  const startQuizz = useCallback(() => {
    setCurrentAppState('quizz')
  }, [])

  const startChecking = useCallback(() => {
    setCurrentAppState('checking')
  }, [])

  const areAllSelected = useCallback(
    () =>
      questionsData.filter(
        (questionData) => questionData.selected_answer === undefined,
      ).length === 0,
    [questionsData],
  )

  const countScore = useCallback(() => {
    let counter = 0
    for (let questionData of questionsData) {
      if (questionData.correct_answer === questionData.selected_answer)
        counter++
    }
    setScore(counter)
  }, [questionsData])

  const quizzScreen = (
    <section className='quizz-quizz'>
      {questionsData.map((questionData, index) => {
        return (
          <QuizzQuestionBlock
            key={questionData.id}
            questionData={questionData}
            questionNum={index}
            selectAnswer={selectAnswer}
            currentAppState={currentAppState}
          />
        )
      })}
      {currentAppState === 'quizz' && (
        <button
          className={
            'quizz-button quizz-checkbutton no-selection' +
            (!areAllSelected() ? ' quizz-checkbutton_locked' : '')
          }
          onClick={() => {
            areAllSelected() && startChecking()
          }}
        >
          Check answers
        </button>
      )}
      {currentAppState === 'checking' && (
        <section className='quizz-results'>
          You scored {score}/{questionsData.length} correct answers
          <button
            className='quizz-button quizz-playagainbutton no-selection'
            onClick={startWelcome}
          >
            Play again
          </button>
        </section>
      )}
    </section>
  )

  const welcomeScreen = useMemo(
    () => (
      <section className='quizz-welcome'>
        <h1 className='quizz-welcome-title'>Quizzical</h1>
        <p className='quizz-welcome-description'>
          Pass the Quizz with random questions
        </p>
        <button className='no-selection quizz-button' onClick={startQuizz}>
          Start quiz
        </button>
      </section>
    ),
    [startQuizz],
  )

  useEffect(() => {
    loadQuestionsData(openTriviaDBUrl)
  }, [])

  return (
    <main className='quizz-app'>
      {currentAppState === 'welcome' ? welcomeScreen : quizzScreen}
    </main>
  )
}
