import React, { useCallback, useEffect, useState } from 'react'
import { TenziesDie } from './components/TenziesDie'
import './TenziesApp.css'

export const TenziesApp = () => {
  const dieRoll = () => {
    return Math.floor(Math.random() * 6) + 1
  }

  const diceGenerate = (quantity) => {
    let dice = []
    for (let dieNum = 1; dieNum <= quantity; dieNum++) {
      dice.push({
        id: dieNum,
        selected: false,
        value: dieRoll(),
      })
    }
    return dice
  }

  const [dice, setDice] = useState(() => diceGenerate(10))
  const [gatheredValue, setGatheredValue] = useState()

  const diceRoll = () => {
    setDice((prev) => {
      return prev.map((die) =>
        die.selected ? die : { ...die, value: dieRoll() },
      )
    })
  }

  const dieSelectToggle = (dieId) => {
    setDice((prev) => {
      return prev.map((die) => {
        console.log('before', gatheredValue, die.id, die.value)
        if (die.id === dieId) {
          if (!gatheredValue) setGatheredValue(die.value)
          return die.value === gatheredValue
            ? { ...die, selected: !die.selected }
            : die
        } else {
          return die
        }
      })
    })
  }

  const diceElements = dice.map((die) => (
    <TenziesDie die={die} key={die.id} onSelect={dieSelectToggle} />
  ))

  const isVictorious = useCallback(() => {
    return dice.filter((die) => (die.selected ? false : true)).length === 0
  }, [dice])

  useEffect(() => {
    if (isVictorious()) {
      console.log('You won!')
    }
  }, [isVictorious])

  return (
    <main className='tenzies-app'>
      <div className='tenzies-header'>
        <h1 className='tenzies-header-title'>Tenzies</h1>
        <div className='tenzies-header-desc'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </div>
      </div>
      <div className='tenzies-dice'>{diceElements}</div>
      <div className='no-selection tenzies-rollbutton' onClick={diceRoll}>
        Roll
      </div>
    </main>
  )
}
