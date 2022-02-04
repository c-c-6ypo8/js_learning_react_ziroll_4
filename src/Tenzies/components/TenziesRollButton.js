import { useState } from 'react'
import './TenziesRollButton.css'

export const TenziesRollButton = ({
  isVictorious,
  isNewGame,
  timeOut,
  startNewGame,
  rollDice,
}) => {
  const [buttonBlock, setButtonBlock] = useState(false)
  const handleClick = () => {
    if (!buttonBlock) {
      setButtonBlock(true)
      setTimeout(() => setButtonBlock(false), timeOut + 50)
      isVictorious ? startNewGame() : rollDice()
    }
  }

  const setButtonText = () => {
    if (buttonBlock) {
      return 'Rolling...'
    } else if (isVictorious) {
      return 'Restart'
    } else {
      return 'Roll'
    }
  }

  return (
    <div
      className={
        'no-selection tenzies-rollbutton' +
        (buttonBlock ? ' tenzies-rollbutton-disabled' : '')
      }
      onClick={handleClick}
    >
      {setButtonText()}
    </div>
  )
}
