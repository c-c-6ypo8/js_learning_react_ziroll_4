import './TenziesDie.css'

export const TenziesDie = ({ die, onSelect }) => {
  return (
    <div
      className={`no-selection tenzies-dice-die ${
        die.selected ? 'tenzies-dice-die-selected' : ''
      }`}
      onClick={() => onSelect(die.id)}
    >
      {die.value}
    </div>
  )
}
