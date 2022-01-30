import './TenziesCloseButton.css'

export const TenziesCloseButton = (props) => {  
  return (
    <div className='tenzies-closebutton' onClick={props.close}>
      ✕
    </div>
  )
}
