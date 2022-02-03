import './TenziesServiceButton.css'

export const TenziesServiceButton = (props) => {
  return (
    <div
      className={
        'tenzies-servicebutton tenzies-servicebutton-' + props.position
      }
      onClick={props.onClick}
      title={props.title}
    >
      {props.symbol}
    </div>
  )
}
