import { nanoid } from 'nanoid'
import { useCallback, useState, useEffect } from 'react'
import { shuffleArray } from '../../libs/arrays'
import { QuizzQuestionBlock } from './QuizzQuestionBlock'
import './QuizzQuizzScreen.css'

export const QuizzQuizzScreen = ({
  quizzData,
  setQuizzData,
  currentAppState,
  setCurrentAppState,
  apiURL,
}) => {
  const [score, setScore] = useState(0)

  /* Modifying data, that came from server to track answer selection */
  const loadQuestionsData = (link) => {
    fetch(link)
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
        setQuizzData(dataModified)
      })
  }

  const selectAnswer = (questionNum, answer) => {
    setQuizzData((prev) => {
      const newData = [...prev]
      newData[questionNum].selected_answer = answer
      countScore()
      return newData
    })
  }

  const areAllSelected = useCallback(
    () =>
      quizzData.filter(
        (questionData) => questionData.selected_answer === undefined,
      ).length === 0,
    [quizzData],
  )

  const countScore = useCallback(() => {
    let counter = 0
    for (let questionData of quizzData) {
      if (questionData.correct_answer === questionData.selected_answer)
        counter++
    }
    setScore(counter)
  }, [quizzData])

  const startChecking = useCallback(() => {
    areAllSelected() && setCurrentAppState('checking')
  }, [areAllSelected, setCurrentAppState])

  const startWelcome = useCallback(() => {
    setCurrentAppState('welcome')
    loadQuestionsData(apiURL)
  }, [setCurrentAppState, apiURL, loadQuestionsData])

  useEffect(() => {
    loadQuestionsData(apiURL)
  }, [apiURL])

  return (
    <section className='quizz-quizz'>
      {quizzData.map((questionData, index) => {
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
          onClick={startChecking}
        >
          Check answers
        </button>
      )}
      {currentAppState === 'checking' && (
        <section className='quizz-results'>
          You scored {score}/{quizzData.length} correct answers
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
}
