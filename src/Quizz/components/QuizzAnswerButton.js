import { useState, useEffect, useCallback } from 'react'
import './QuizzAnswerButton.css'

export const QuizzAnswerButton = ({
  answer,
  isCorrect,
  isSelected,
  currentAppState,
  select,
}) => {
  const defineButtonStyle = useCallback(() => {
    if (currentAppState === 'checking') {
      if (isCorrect) {
        return 'correct'
      } else {
        return isSelected
          ? 'wrong quizz-answerbutton-blocked'
          : 'default quizz-answerbutton-blocked'
      }
    } else {
      return isSelected ? 'selected' : 'default'
    }
  }, [isSelected, currentAppState, isCorrect])

  const [buttonStyle, setButtonStyle] = useState(() => defineButtonStyle())

  useEffect(() => {
    setButtonStyle(defineButtonStyle())
  }, [defineButtonStyle])

  return (
    <div
      className={'no-selection quizz-answerbutton_' + buttonStyle}
      dangerouslySetInnerHTML={{ __html: answer }}
      onClick={() =>
        !(currentAppState === 'checking') && !isSelected && select()
      }
    />
  )
}
