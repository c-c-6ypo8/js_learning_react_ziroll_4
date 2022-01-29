import { useEffect, useMemo, useState } from 'react'
import './TenziesDie.css'

export const TenziesDie = (props) => {
  const [dieReaction, setDieReaction] = useState()

  useEffect(() => {
    setTimeout(() => setDieReaction(undefined), 820)
  }, [dieReaction])

  const handleClick = () => {
    if (props.onSelect) {
      if (props.die.value === props.rightValue || !props.rightValue) {
        if (!props.die.selected) {
          setDieReaction('right')
        }
      } else {
        setDieReaction('wrong')
      }
      props.onSelect(props.die.id)
    }
  }

  const dieDotted = useMemo(() => {
    const dieDotsNames = ['one', 'two', 'three', 'four', 'five', 'six']
    const dieDots = Array.apply(null, Array(props.die.value)).map(
      (value, index) => (
        <div className='tenzies-die-dot' key={index}>
          &nbsp;
        </div>
      ),
    )    
    return (
      <div className={`tenzies-die-${dieDotsNames[props.die.value - 1]}`}>
        {dieDots}
      </div>
    )
  }, [props.die.value])

  return (
    <div
      onClick={handleClick}
      className={`no-selection tenzies-die ${
        props.die?.selected ? 'tenzies-die-selected' : ''
      } ${dieReaction ? 'tenzies-die-reaction-' + dieReaction : ''}`}
    >
      {dieDotted}
    </div>
  )
}
