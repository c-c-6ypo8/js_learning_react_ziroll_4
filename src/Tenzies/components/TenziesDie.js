import { useEffect, useState } from 'react'
import { rollDie } from '../../libs/random'
import './TenziesDie.css'

export const TenziesDie = ({
  die,
  isStatic,
  timeOut,
  rollCounter,
  onSelect,
  rightValue,
}) => {
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
  const [dieImage, setDieImage] = useState(() => generateDieImage(die.value))

  useEffect(() => {
    if (!isStatic && !die.selected) {
      const timeOutStep = Math.floor(
        timeOut / Math.floor(Math.random() * 10 + 2),
      )
      const generateDieImages = (time) => {
        let currentValue = die.value
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
              setDieImage(generateDieImage(die.value))
            }
          }, timeOutStep)
      }
      generateDieImages(timeOut)
    }
  }, [rollCounter, die, isStatic, timeOut])

  // Resets die reaction after timeout
  useEffect(() => {
    setTimeout(() => setDieReaction(undefined), dieReactionTimeout)
  }, [dieReaction])

  const handleClick = () => {
    if (onSelect) {
      if (die.value === rightValue || !rightValue) {
        if (!die.selected) {
          setDieReaction('right')
        }
      } else {
        setDieReaction('wrong')
      }
      onSelect(die.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={
        'no-selection tenzies-die' +
        (die?.selected ? ' tenzies-die-selected ' : '') +
        (dieReaction ? ` tenzies-die-reaction-${dieReaction}` : '')
      }
    >
      {dieImage}
    </div>
  )
}
