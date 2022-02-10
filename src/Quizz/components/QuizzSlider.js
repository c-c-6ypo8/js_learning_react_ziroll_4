import './QuizzSlider.css'

export const QuizzSlider = ({
  name,
  min,
  max,
  step,
  selectedValue,
  handleChange,
}) => {
  return (
    <input
      className='quizz-slider'
      type='range'
      name={name}
      min={min}
      max={max}
      step={step ?? 1}
      value={selectedValue}
      onChange={handleChange}
    />
  )
}
