import React, { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './TenziesApp.css'
import { TenziesDie } from './components/TenziesDie'
import { TenziesButtonRoll } from './components/TenziesButtonRoll'
import { TenziesHeader } from './components/TenziesHeader'
import { dieRoll } from '../libs/random'

export const TenziesApp = () => {
  const { width, height } = useWindowSize()

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
  const [timer, setTimer] = useState(0)
  // Timeout for blocking Roll button and for dice roll time
  const timeOut = 1000

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
            console.log('Gathered value set to', die.value)
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

  const diceElements = (
    <section className='tenzies-dice'>
      {dice.map((die) => (
        <TenziesDie
          die={die}
          timeOut={timeOut}
          key={die.id}
          onSelect={dieSelectToggle}
          rightValue={gatheredValue}
        />
      ))}
    </section>
  )

  return (
    <main className='tenzies-app'>
      {isVictorious() && <Confetti width={width} height={height} />}
      <TenziesHeader
        isVictorious={isVictorious()}
        newGame={areAllUnchecked()}
        gatheredValue={gatheredValue}
        timer={timer}
      />
      {diceElements}
      <TenziesButtonRoll
        isVictorious={isVictorious()}
        diceRoll={diceRoll}
        newGameStart={newGameStart}
        timeOut={timeOut}
      />
    </main>
  )
}
