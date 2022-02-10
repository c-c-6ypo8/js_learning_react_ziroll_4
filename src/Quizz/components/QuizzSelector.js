import './QuizzSelector.css'

export const QuizzSelector = ({
  name,
  values,
  selectedValue,
  handleChange,
}) => {
  return (
    <select
      value={selectedValue}
      name={name}
      onChange={handleChange}
      className='quizz-selector'
    >
      {values.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        )
      })}
    </select>
  )
}
