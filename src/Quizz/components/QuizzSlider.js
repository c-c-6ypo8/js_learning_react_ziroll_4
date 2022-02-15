import { useRef, useEffect, useState } from 'react'
import './QuizzSlider.css'

export const QuizzSlider = ({
  name,
  min,
  max,
  step,
  selectedValue,
  handleChange,
}) => {
  const sliderEl = useRef(null)
  const [style, setStyle] = useState({ left: '0%' })

  useEffect(() => {
    const percent = (selectedValue - min) / (max - min)
    const width = sliderEl.current.offsetWidth - 15
    const offset = -5

    setStyle({ left: percent * width + offset + 'px' })
  }, [selectedValue, sliderEl, max, min])

  return (
    <div className='quizz-slider-container'>
      <div className='quizz-slider-baloon' style={style}>
        {selectedValue}
      </div>
      <input
        ref={sliderEl}
        className='quizz-slider'
        id='quizz-slider'
        type='range'
        name={name}
        min={min}
        max={max}
        step={step ?? 1}
        value={selectedValue}
        onChange={handleChange}
      />
    </div>
  )
}
