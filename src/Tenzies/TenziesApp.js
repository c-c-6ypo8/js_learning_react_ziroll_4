import React, { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './TenziesApp.css'
import { TenziesDie } from './components/TenziesDie'
import { TenziesButtonRoll } from './components/TenziesRollButton'
import { TenziesHeader } from './components/TenziesHeader'
import { dieRoll as rollDie } from '../libs/random'
import { TenziesHighScore } from './components/TenziesHighScore'

export const TenziesApp = () => {
  const { width, height } = useWindowSize()

  const diceGenerate = (quantity) => {
    let dice = []
    for (let dieNum = 1; dieNum <= quantity; dieNum++) {
      dice.push({
        id: dieNum,
        selected: false,
        value: rollDie(),
      })
    }
    return dice
  }

  const [dice, setDice] = useState(() => diceGenerate(10))
  const [gatheredValue, setGatheredValue] = useState()
  const [timer, setTimer] = useState(0)
  const [timerId, setTimerId] = useState()
  const [rollCounter, setRollCounter] = useState(0)

  // Timeout for blocking Roll button and for dice roll time
  const timeOut = 750

  const rollDice = () => {
    setRollCounter((prev) => prev + 1)
    setDice((prev) => {
      return prev.map((die) =>
        die.selected ? die : { ...die, value: rollDie() },
      )
    })
  }

  const dieSelectToggle = (dieId) => {
    setDice((prev) =>
      prev.map((die) => {
        if (die.id === dieId) {
          if (!gatheredValue) {
            setGatheredValue(die.value)
            startTimer()
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

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    setTimerId(newTimer)
  }

  const clearTimer = useCallback(() => {
    clearInterval(timerId)
    setTimerId()
    setTimer(0)
  }, [timerId])

  const startNewGame = () => {
    setDice(diceGenerate(10))
  }

  const isNewGame = useCallback(() => {
    return dice.filter((die) => die.selected).length === 0
  }, [dice])

  const isVictorious = useCallback(() => {
    return dice.filter((die) => !die.selected).length === 0
  }, [dice])

  useEffect(() => {
    if (isNewGame()) {
      setGatheredValue(undefined)
      setRollCounter(0)
      clearTimer()
    }
    if (isVictorious()) clearInterval(timerId)
  }, [isNewGame, isVictorious, clearTimer, timerId])

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
    <>
      {isVictorious() && <Confetti width={width} height={height} />}
      <main className='tenzies-app'>
        <TenziesHighScore />
        <TenziesHeader
          isVictorious={isVictorious()}
          newGame={isNewGame()}
          gatheredValue={gatheredValue}
          timer={timer}
          rollCounter={rollCounter}
        />
        {diceElements}
        <TenziesButtonRoll
          isVictorious={isVictorious()}
          rollDice={rollDice}
          startNewGame={startNewGame}
          timeOut={timeOut}
        />
      </main>
    </>
  )
}
