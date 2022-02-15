import './QuizzRadio.css'
import { capitalize } from '../../libs/strings'

export const QuizzRadio = ({ name, values, selectedValue, handleChange }) => {
  return (
    <section className='quizz-radio-list'>
      {Object.entries(values).map(([key, value]) => (
        <label
          htmlFor={key}
          key={key}
          title={capitalize(key)}
          className='quizz-radio-label no-selection'
        >
          <input
            className='quizz-radio-button'
            type='radio'
            id={key}
            name={name}
            value={key}
            onChange={handleChange}
            checked={selectedValue === key}
          />
          <span className='quizz-radio-custombutton'></span>
          <div className='quizz-radio-label-text'>{value}</div>
        </label>
      ))}
    </section>
  )
}
