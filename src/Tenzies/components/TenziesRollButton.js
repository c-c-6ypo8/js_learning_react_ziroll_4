import { useState } from 'react'
import './TenziesRollButton.css'

export const TenziesRollButton = (props) => {
  const [buttonBlock, setButtonBlock] = useState(false)
  const handleClick = () => {
    if (!buttonBlock) {
      setButtonBlock(true)
      setTimeout(() => setButtonBlock(false), props.timeOut + 50)
      props.isVictorious ? props.startNewGame() : props.rollDice()
    }
  }

  const setButtonText = () => {
    if (buttonBlock) {
      return 'Rolling...'
    } else if (props.isVictorious) {
      return 'Restart'
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
