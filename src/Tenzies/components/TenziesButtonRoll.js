import './TenziesButtonRoll.css'

export const TenziesButtonRoll = ({ isVictorious, newGameStart, diceRoll }) => {
  return (
    <div
      className='no-selection tenzies-rollbutton'
      onClick={isVictorious ? newGameStart : diceRoll}
    >
      {isVictorious ? 'Start a new game' : 'Roll'}
    </div>
  )
}
