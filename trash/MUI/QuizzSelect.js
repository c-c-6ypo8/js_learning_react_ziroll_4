import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'
import Select from '@mui/material/Select'
import './QuizzSelect.css'

export const QuizzSelect = () => {
  const [age, setAge] = useState(10)

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),      
    },
  }))

  return (
    <div>
      <Select value={age} onChange={handleChange} input={<BootstrapInput />}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>
          Twenty Twenty Twenty Twenty Twenty Twenty
          TwentyTwentyTwentyTwentyTwenty
        </MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </div>
  )
}
