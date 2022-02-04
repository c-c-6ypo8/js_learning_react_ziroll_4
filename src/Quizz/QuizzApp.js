import './QuizzApp.css'
import { useState } from 'react'
import { data } from './data'
import { nanoid } from 'nanoid'

export const QuizzApp = () => {
  const [questions, setQuestions] = useState(data)
  const questionElements = questions.map((question) => {
    const answers = question.incorrect_answers.concat([question.correct_answer])
    return (
      <article className='quizz-questionblock' key={nanoid()}>
        <h3 className='quizz-question'>{question.question}</h3>
        <div className='quizz-question-answerbuttonscontainer'>
          {answers.map((answer) => (
            <div className='quizz-answerbutton no-selection' key={answer}>
              {answer}
            </div>
          ))}
        </div>
        <hr />
      </article>
    )
  })

  const quizzScreen = (
    <section className='quizz-quizz'>{questionElements}</section>
  )

  const welcomeScreen = (
    <section className='quizz-welcome'>
      <h1 className='quizz-welcome-title'>Quizzical</h1>
      <p className='quizz-welcome-description'>
        Pass the Quizz with random questions
      </p>
      <div
        className='no-selection quizz-button'
        onClick={() => setCurrentScreen(quizzScreen)}
      >
        Start quiz
      </div>
    </section>
  )
  const [currentScreen, setCurrentScreen] = useState(quizzScreen)

  return <main className='quizz-app'>{currentScreen}</main>
}
