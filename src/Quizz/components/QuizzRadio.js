import './QuizzRadio.css'
import { capitalize } from '../../libs/strings'

export const QuizzRadio = ({ name, values, selectedValue, handleChange }) => {
  const starValues = {
    easy: '⭐',
    medium: '⭐⭐',
    hard: '⭐⭐⭐',
  }
  return (
    <section className='quizz-radio-list'>
      {values.map((value) => (
        <label
          htmlFor={value}
          key={value}
          title={starValues[value] ? capitalize(value) : false}
          className='quizz-radio-label no-selection'
        >
          <input
            className='quizz-radio-button'
            type='radio'
            id={value}
            name={name}
            value={value}
            onChange={handleChange}
            checked={selectedValue === value}
          />
          <span className='quizz-radio-custombutton'></span>
          <div
            className={
              starValues[value]
                ? 'quizz-radio-label-star'
                : 'quizz-radio-label-text'
            }
          >
            {starValues[value] ?? capitalize(value)}
          </div>
        </label>
      ))}
    </section>
  )
}
