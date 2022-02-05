import './QuizzApp.css'
import { useState, useEffect, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { data } from './data'
import { QuizzAnswersBlock } from './components/QuizzAnswersBlock'

export const QuizzApp = () => {
  const openTriviaDBUrl = 'https://opentdb.com/api.php?amount=5'
  
  /* App can be in three states: 'welcome', 'quizz', 'checking' */
  const [currentAppState, setCurrentState] = useState('quizz')
  const [questionsData, setQuestionsData] = useState([])

  const questionBlocks = questionsData.map((questionData) => {
    return (
      <article className='quizz-questionblock' key={nanoid()}>
        <h3
          dangerouslySetInnerHTML={{ __html: questionData.question }}
          className='quizz-question'
        />
        <QuizzAnswersBlock
          incorrect_answers={questionData.incorrect_answers}
          correct_answer={questionData.correct_answer}
          currentAppState={currentAppState}
        />
        <hr />
      </article>
    )
  })

  const quizzScreen = useMemo(
    () => <section className='quizz-quizz'>{questionBlocks}</section>,
    [questionBlocks],
  )

  const welcomeScreen = useMemo(
    () => (
      <section className='quizz-welcome'>
        <h1 className='quizz-welcome-title'>Quizzical</h1>
        <p className='quizz-welcome-description'>
          Pass the Quizz with random questions
        </p>
        <div
          className='no-selection quizz-button'
          onClick={() => setCurrentState('started')}
        >
          Start quiz
        </div>
      </section>
    ),
    [],
  )

  useEffect(() => {
    setQuestionsData(data)
    // fetch(openTriviaDBUrl)
    //   .then((response) => response.json())
    //   .then((jsonData) => {
    //     setQuestionsData(jsonData.results)
    //   })
  }, [])

  return (
    <main className='quizz-app'>
      {currentAppState === 'welcome' ? welcomeScreen : quizzScreen}
    </main>
  )
}
