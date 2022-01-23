import { useEffect, useState } from 'react'
import './TenziesDie.css'

export const TenziesDie = ({ die, rightValue, onSelect }) => {
  const [dieReaction, setDieReaction] = useState()

  useEffect(() => {
    setTimeout(() => setDieReaction(undefined), 820)
  }, [dieReaction])

  const handleClick = () => {
    if (die.value === rightValue || !rightValue) {
      if (!die.selected) {
        setDieReaction('right')
      }
    } else {
      setDieReaction('wrong')
    }
    onSelect(die.id)
  }

  return (
    <div
      className={`no-selection tenzies-dice-die 
      ${die.selected ? 'tenzies-dice-die-selected' : ''} 
      ${dieReaction ? 'tenzies-dice-die-reaction-' + dieReaction : ''}`}
      onClick={handleClick}
    >
      {die.value}
    </div>
  )
}
