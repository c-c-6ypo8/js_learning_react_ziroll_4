import { QuizzAnswerButton } from './QuizzAnswerButton'
import './QuizzQuestionBlock.css'

export const QuizzQuestionBlock = ({
  questionData,
  questionNum,  
  selectAnswer,
  currentAppState,
}) => {
  const buttons = questionData.answers.map((answer) => {
    return (
      <QuizzAnswerButton
        key={questionData.id + answer}
        answer={answer}
        isCorrect={answer === questionData.correct_answer}
        isSelected={questionData.selected_answer === answer}
        select={() => selectAnswer(questionNum, answer)}
        currentAppState={currentAppState}
      />
    )
  })
  return (
    <article className='quizz-questionblock'>
      <h3
        dangerouslySetInnerHTML={{ __html: questionData.question }}
        className='quizz-question'
      />
      <div className='quizz-answersblock'>{buttons}</div>
      <hr />
    </article>
  )
}
