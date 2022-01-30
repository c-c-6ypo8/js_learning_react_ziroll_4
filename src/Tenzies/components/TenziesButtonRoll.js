import { useState } from 'react'
import './TenziesButtonRoll.css'

export const TenziesButtonRoll = (props) => {
  const [buttonBlock, setButtonBlock] = useState(false)
  const handleClick = () => {
    if (!buttonBlock) {
      setButtonBlock(true)
      setTimeout(() => setButtonBlock(false), props.timeOut + 200)
      props.isVictorious ? props.newGameStart() : props.diceRoll()
    }
  }

  const setButtonText = () => {
    if (buttonBlock) {
      return 'Rolling...'
    } else if (props.isVictorious) {
      return 'Start new game'
    } else {
      return 'Roll'
    }
  }

  return (
    <div
      className={
        'no-selection tenzies-rollbutton' +
        (buttonBlock ? ' tenzie-rollbutton-disabled' : '')
      }
      onClick={handleClick}
    >
      {setButtonText()}
    </div>
  )
}
