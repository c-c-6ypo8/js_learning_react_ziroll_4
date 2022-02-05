import { useState } from 'react'
import { shuffleArray } from '../../libs/arrays'
import { QuizzAnswerButton } from './QuizzAnswerButton'
import './QuizzAnswersBlock.css'

export const QuizzAnswersBlock = ({
  incorrect_answers,
  correct_answer,
  currentAppState,
}) => {
  const [answers] = useState(() => {
    const allAnswers = incorrect_answers.concat([correct_answer])
    shuffleArray(allAnswers)
    return allAnswers
  })

  const [selectedAnswer, setSelectedAnswer] = useState()

  const buttons = answers.map((answer) => (
    <QuizzAnswerButton
      key={answer}
      answer={answer}
      correct_answer={correct_answer}
      isChecking={currentAppState === 'checking'}
      isSelected={answer === selectedAnswer}
      onSelect={setSelectedAnswer}
    />
  ))

  return <div className='quizz-answersblock'>{buttons}</div>
}
