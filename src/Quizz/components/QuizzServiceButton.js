import './QuizzServiceButton.css'

export const QuizzServiceButton = ({ position, onClick, title, symbol }) => {
  // Position can be 'topright' or 'bottomright'
  return (
    <div
      className={'quizz-servicebutton quizz-servicebutton-' + position}
      onClick={onClick}
      title={title}
    >
      {symbol}
    </div>
  )
}
