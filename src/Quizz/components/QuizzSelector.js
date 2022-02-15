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
      {Object.entries(values).map(([id, name]) => {
        return (
          <option key={id} value={id}>
            {name}
          </option>
        )
      })}
    </select>
  )
}
