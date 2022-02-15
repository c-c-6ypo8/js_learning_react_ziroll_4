import { useState } from 'react'
import { useLocalStorage } from '../../libs/useLocalStorage'
import { useOpenTriviaDB } from '../api/OpenTriviaDB'
import { QuizzRadio } from './QuizzRadio'
import { QuizzSelector } from './QuizzSelector'
import { QuizzServiceButton } from './QuizzServiceButton'
import { QuizzSlider } from './QuizzSlider'
import './QuizzWelcomeScreen.css'

export const QuizzWelcomeScreen = ({
  startQuizz,
  setQuizzData,
  difficulties,
}) => {
  let { settings, categories, areCategoriesLoading } = useOpenTriviaDB()

  const minAmount = 5
  const maxAmount = 15
  const defaultAmount = 5

  const [options, setOptions] = useLocalStorage('quizzical', {
    category: 9,
    difficulty: 'medium',
    amount: defaultAmount,
  })

  const [optionsVisible, setOptionsVisible] = useState(false)

  const openOptions = () => {
    setOptionsVisible(true)
  }

  const closeOptions = () => {
    setOptionsVisible(false)
  }

  const handleSelect = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setOptions((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main className='quizz-welcome'>
      <h1 className='quizz-welcome-title'>Quizzical</h1>
      <section className='quizz-welcome-options-container'>
        <h5 className='quizz-welcome-options-title'>
          Category:
          <span className='quizz-welcome-options-value'>
            {areCategoriesLoading ? 'loading...' : categories[options.category]}
          </span>
        </h5>
        <h5 className='quizz-welcome-options-title'>
          Difficulty:<span> {difficulties[options.difficulty]}</span>
        </h5>
        <h5 className='quizz-welcome-options-title'>
          Questions:<span> {options.amount} </span>
        </h5>
        <div className='quizz-welcome-customizelink' onClick={openOptions}>
          Customize
        </div>
      </section>
      <section
        className={'quizz-welcome-options' + (!optionsVisible ? ' hidden' : '')}
      >
        <h4>
          <strong>Select options:</strong>
        </h4>
        <QuizzServiceButton
          position='topright'
          title='Close'
          onClick={closeOptions}
          symbol='✕'
        />
        <h5 className='quizz-welcome-options-title'>Category:</h5>
        <QuizzSelector
          name='category'
          values={categories}
          selectedValue={options.category}
          handleChange={handleSelect}
        />
        <h5 className='quizz-welcome-options-title'>Difficulty:</h5>
        <QuizzRadio
          name='difficulty'
          values={difficulties}
          starDifficulties={difficulties}
          selectedValue={options.difficulty}
          handleChange={handleSelect}
        />
        <h5 className='quizz-welcome-options-title'>Number:</h5>
        <QuizzSlider
          name='amount'
          min={minAmount}
          max={maxAmount}
          selectedValue={options.amount}
          handleChange={handleSelect}
        />
        <button
          className='no-selection quizz-button quizz-welcome-options-okbutton'
          onClick={closeOptions}
        >
          Ok
        </button>
      </section>

      <button className='no-selection quizz-button' onClick={startQuizz}>
        Start quiz
      </button>
    </main>
  )
}
