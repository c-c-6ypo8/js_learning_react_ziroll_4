import { useState, useEffect } from 'react'
import './TenziesRollButton.css'

export const TenziesRollButton = ({
  isVictorious,
  rollTimeOut,
  startNewGame,
  rollDice,
}) => {
  const [buttonBlock, setButtonBlock] = useState(false)
  const [buttonText, setButtonText] = useState('Roll')
  const handleClick = () => {
    if (!buttonBlock) {
      setButtonBlock(true)
      setTimeout(() => setButtonBlock(false), rollTimeOut + 50)
      isVictorious ? startNewGame() : rollDice()
    }
  }

  useEffect(() => {
    if (buttonBlock) {
      setButtonText('Rolling...')
    } else if (isVictorious) {
      setButtonText('Restart')
    } else {
      setButtonText('Roll')
    }
  }, [buttonBlock, isVictorious])

  return (
    <div
      className={
        'no-selection tenzies-rollbutton' +
        (buttonBlock ? ' tenzies-rollbutton-disabled' : '')
      }
      onClick={handleClick}
    >
      {buttonText}
    </div>
  )
}
