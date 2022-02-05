import { useState, useEffect } from 'react'
import './QuizzAnswerButton.css'

export const QuizzAnswerButton = ({
  answer,
  correct_answer,
  isChecking,
  isSelected,
  onSelect,
}) => {
  const [buttonStyle, setButtonStyle] = useState()

  useEffect(() => {
    if (isChecking) {
      if (isSelected) {
        if (answer === correct_answer) {
          setButtonStyle('correct')
        } else {
          setButtonStyle('wrong')
        }
      } else {
        setButtonStyle()
      }
    } else if (isSelected) {
      setButtonStyle('selected')
    } else {
      setButtonStyle()
    }
  }, [isSelected, isChecking, correct_answer, answer])

  return (
    <div
      className={
        'quizz-answerbutton no-selection' +
        (buttonStyle ? ' quizz-answerbutton_' + buttonStyle : '')
      }
      dangerouslySetInnerHTML={{ __html: answer }}
      onClick={() => !isChecking && onSelect(answer)}
    />
  )
}
