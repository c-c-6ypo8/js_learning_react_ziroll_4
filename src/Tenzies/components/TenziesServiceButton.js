import './TenziesServiceButton.css'

export const TenziesServiceButton = ({ position, onClick, title, symbol }) => {
  return (
    <div
      className={'tenzies-servicebutton tenzies-servicebutton-' + position}
      onClick={onClick}
      title={title}
    >
      {symbol}
    </div>
  )
}
