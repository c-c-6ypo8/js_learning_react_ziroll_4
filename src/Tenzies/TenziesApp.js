import React, { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './TenziesApp.css'
import { TenziesDie } from './components/TenziesDie'
import { TenziesButtonRoll } from './components/TenziesButtonRoll'
import { TenziesHeader } from './components/TenziesHeader'

export const TenziesApp = () => {
  const { width, height } = useWindowSize()
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
    setDice((prev) =>
      prev.map((die) => {
        if (die.id === dieId) {
          if (!gatheredValue) {
            setGatheredValue(die.value)
            return { ...die, selected: !die.selected }
          }
          if (die.value === gatheredValue) {
            return { ...die, selected: !die.selected }
          } else {
            return die
          }
        } else {
          return die
        }
      }),
    )
  }

  const diceElements = (
    <section className='tenzies-dice'>
      {dice.map((die) => (
        <TenziesDie
          die={die}
          key={die.id}
          onSelect={dieSelectToggle}
          rightValue={gatheredValue}
        />
      ))}
    </section>
  )

  const newGameStart = () => {
    setDice(diceGenerate(10))
  }

  const areAllUnchecked = useCallback(() => {
    return dice.filter((die) => die.selected).length === 0
  }, [dice])

  const isVictorious = useCallback(() => {
    return dice.filter((die) => !die.selected).length === 0
  }, [dice])

  useEffect(() => {
    if (areAllUnchecked()) setGatheredValue(undefined)
    if (isVictorious()) {
      console.log('You won!')
    }
  }, [areAllUnchecked, isVictorious])

  return (
    <main className='tenzies-app'>
      {isVictorious() && <Confetti width={width} height={height} />}
      <TenziesHeader
        isVictorious={isVictorious()}
        newGame={areAllUnchecked()}
        gatheredValue={gatheredValue}
      />
      {diceElements}
      <TenziesButtonRoll
        isVictorious={isVictorious()}
        diceRoll={diceRoll}
        newGameStart={newGameStart}
      />
    </main>
  )
}
