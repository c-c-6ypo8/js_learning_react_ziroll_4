import { useState } from 'react'
import { QuizzRadio } from './QuizzRadio'
import { QuizzSelector } from './QuizzSelector'
import { QuizzSlider } from './QuizzSlider'
import './QuizzWelcomeScreen.css'

export const QuizzWelcomeScreen = ({ startQuizz, setQuizzData }) => {
  const [apiURL, setApiURL] = useState()

  let categories = [
    'Films',
    'Music',
    'Any',
    'Any Category Any CategoryAny CategoryAny CategoryAny CategoryAny CategoryAny Category',
  ]

  const difficulties = ['easy', 'medium', 'hard']

  const minAmount = 1
  const maxAmount = 50
  const defaultAmount = 5

  const [options, setOptions] = useState({
    category: 'Any',
    difficulty: 'medium',
    amount: defaultAmount,
  })

  const handleSelect = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setOptions((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className='quizz-welcome'>
      <h1 className='quizz-welcome-title'>Quizzical</h1>
      <p className='quizz-welcome-description'>Customize your Quizz:</p>
      <section className='quizz-welcome-options'>
        <h5 className='quizz-welcome-options-title'>Select category:</h5>
        <QuizzSelector
          name='category'
          values={categories}
          selectedValue={options.category}
          handleChange={handleSelect}
        />
        <h5 className='quizz-welcome-options-title'>Select difficulty:</h5>
        <p>Greater difficulty — greater the reward!</p>
        <QuizzRadio
          name='difficulty'
          values={difficulties}
          selectedValue={options.difficulty}
          handleChange={handleSelect}
        />
        <h5 className='quizz-welcome-options-title'>Select amount:</h5>
        <QuizzSlider
          name='amount'
          min={minAmount}
          max={maxAmount}
          selectedValue={options.amount}
          handleChange={handleSelect}
        />
      </section>

      <button className='no-selection quizz-button' onClick={startQuizz}>
        Start quiz
      </button>
    </main>
  )
}
