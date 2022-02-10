import Slider from '@mui/material/Slider'
import './QuizzSlider.css'

export const QuizzSlider = ({ value, minValue, maxValue, onChange }) => {
  return (        
      <Slider
        value={value}
        min={minValue}
        max={maxValue}
        onChange={onChange}
        name='amount'
        aria-label='Amount'
        valueLabelDisplay='auto'        
      />    
  )
}
