import { useEffect, useState } from 'react'
import { dieRoll } from '../../libs/random'
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
  const [dieImage, setDieImage] = useState(() =>
    generateDieImage(props.die.value),
  )

  useEffect(() => {
    if (!props.static) {
      const timeOutStep = props.timeOut / Math.floor(Math.random() * 10 + 2)
      const generateDieImages = (time, value) => {
        time > 0 &&
          setTimeout(() => {
            if (time - timeOutStep > 0) {
              setDieImage(generateDieImage(dieRoll()))
              generateDieImages(time - timeOutStep)
            } else {
              setDieImage(generateDieImage(props.die.value))
            }
          }, timeOutStep)
      }
      generateDieImages(props.timeOut)
    }
  }, [props.die.value, props.static, props.timeOut])

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
