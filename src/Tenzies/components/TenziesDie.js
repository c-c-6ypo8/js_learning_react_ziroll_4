import { useEffect, useState } from 'react'
import { rollDie } from '../../libs/random'
import './TenziesDie.css'

export const TenziesDie = (props) => {
  const generateDieImage = (dieValue) => {    
    const dieDotsNames = ['one', 'two', 'three', 'four', 'five', 'six']
    const dieDots = Array.apply(null, Array(dieValue)).map((value, index) => (
      <div className='tenzies-die-dot' key={index}>
        &nbsp;
      </div>
    ))
    return (
      <div className={`tenzies-die-${dieDotsNames[dieValue - 1]}`}>
        {dieDots}
      </div>
    )
  }

  const [dieReaction, setDieReaction] = useState()
  const dieReactionTimeout = 820
  const [dieImage, setDieImage] = useState(() =>
    generateDieImage(props.die.value),
  )

  useEffect(() => {
    if (!props.static && !props.die.selected) {
      const timeOutStep = Math.floor(
        props.timeOut / Math.floor(Math.random() * 10 + 2),
      )
      const generateDieImages = (time) => {
        let currentValue = props.die.value
        time > 0 &&
          setTimeout(() => {
            if (time - timeOutStep > 0) {
              let generatedValue
              do {
                generatedValue = rollDie()
              } while (generatedValue === currentValue)
              setDieImage(generateDieImage(generatedValue))
              generateDieImages(time - timeOutStep)
            } else {
              setDieImage(generateDieImage(props.die.value))
            }
          }, timeOutStep)
      }
      generateDieImages(props.timeOut)
    }
  }, [props.rollCounter, props.die, props.static, props.timeOut])

  // Resets die reaction after timeout
  useEffect(() => {
    setTimeout(() => setDieReaction(undefined), dieReactionTimeout)
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

  return (
    <div
      onClick={handleClick}
      className={
        'no-selection tenzies-die' +
        (props.die?.selected ? ' tenzies-die-selected ' : '') +
        (dieReaction ? ` tenzies-die-reaction-${dieReaction}` : '')
      }
    >
      {dieImage}
    </div>
  )
}
