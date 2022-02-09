import { useState, useMemo } from 'react'
import './QuizzWelcomeScreen.css'

export const QuizzWelcomeScreen = ({ startQuizz }) => {
  let categories = ['Films', 'Music', 'Any Category']
  const difficulties = ['Any Difficulty', 'Easy', 'Medium', 'Hard']
  const maxAmount = 50
  const amounts = useMemo(() => {
    const newArr = []
    for (let i = 5; i <= maxAmount; i += 5) {
      newArr.push(i)
    }
    return newArr
  }, [])

  const [options, setOptions] = useState({
    category: 'Any Category',
    difficulty: 'Any Difficulty',
    amount: 5,
  })

  const handleSelect = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setOptions((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className='quizz-welcome'>
      <h1 className='quizz-welcome-title'>Quizzical</h1>
      <p className='quizz-welcome-description'>Customize your Quizz:</p>
      <select value={options.category} name='category' onChange={handleSelect}>
        {categories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          )
        })}
      </select>
      <select
        value={options.difficulty}
        name='difficulty'
        onChange={handleSelect}
      >
        {difficulties.map((difficulty) => {
          return (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          )
        })}
      </select>
      <select value={options.amount} name='amount' onChange={handleSelect}>
        {amounts.map((amount) => {
          return (
            <option key={amount} value={amount}>
              {amount}
            </option>
          )
        })}
      </select>

      <button className='no-selection quizz-button' onClick={startQuizz}>
        Start quiz
      </button>
    </section>
  )
}
