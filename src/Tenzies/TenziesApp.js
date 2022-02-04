import React, { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './TenziesApp.css'
import { TenziesDie } from './components/TenziesDie'
import { TenziesRollButton } from './components/TenziesRollButton'
import { TenziesHeader } from './components/TenziesHeader'
import { rollDie } from '../libs/random'
import { TenziesHighScore } from './components/TenziesHighScore'
import { loadDataFromLS, saveDataToLS } from '../libs/localStorage'
import { getCurrentFullDate } from '../libs/date'
import { nanoid } from 'nanoid'
import { TenziesServiceButton } from './components/TenziesServiceButton'

export const TenziesApp = () => {
  const diceGenerate = (quantity) => {
    let dice = []
    for (let dieNum = 1; dieNum <= quantity; dieNum++) {
      dice.push({
        id: dieNum,
        isSelected: false,
        value: rollDie(),
      })
    }
    return dice
  }

  const tenziesLSName = 'tenzies'
  const tenziesHighScoreLinesQuantity = 6
  const { width, height } = useWindowSize()

  const [dice, setDice] = useState(() => diceGenerate(10))
  const [gatheredValue, setGatheredValue] = useState()
  const [timer, setTimer] = useState(0)
  const [timerId, setTimerId] = useState()
  const [rollCounter, setRollCounter] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const highScoreData = loadDataFromLS(tenziesLSName)
    return highScoreData?.data ? highScoreData : { data: [] }
  })

  // Timeout for blocking Roll button and for dice roll time
  const timeOut = 500

  const rollDice = () => {
    setRollCounter((prev) => prev + 1)
    setDice((prev) => {
      return prev.map((die) =>
        die.isSelected ? die : { ...die, value: rollDie() },
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
            return { ...die, isSelected: true }
          }
          if (die.value === gatheredValue) {
            return { ...die, isSelected: true }
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
    return dice.filter((die) => die.isSelected).length === 0
  }, [dice])

  const isVictorious = useCallback(() => {
    return dice.filter((die) => !die.isSelected).length === 0
  }, [dice])

  useEffect(() => {
    if (isNewGame()) {
      setGatheredValue(undefined)
      setRollCounter(0)
      clearTimer()
    }
  }, [isNewGame, clearTimer])

  useEffect(() => {
    if (isVictorious()) {
      clearInterval(timerId)
      setHighScore((prev) => {
        const newData = { data: [] }
        newData.data = [...prev.data]
        /* Setting off the 'last' flag (for marking current score line in the 
        high score table) */
        newData.data = newData.data.map((value) => ({
          ...value,
          last: false,
        }))
        newData.data.push({
          id: nanoid(),
          date: getCurrentFullDate(),
          time: timer,
          rolls: rollCounter,
          value: gatheredValue,
          last: true,
        })
        newData.data
          .sort((first, second) => {
            if (first.time < second.time) {
              return -1
            } else if (first.time === second.time) {
              return 1
            } else return 0
          })
          .splice(tenziesHighScoreLinesQuantity)
        return newData
      })
    }
  }, [isVictorious, rollCounter, timerId, timer, gatheredValue])

  useEffect(() => {
    saveDataToLS(tenziesLSName, highScore)
  }, [highScore])

  const diceElements = (
    <section className='tenzies-dice'>
      {dice.map((die) => (
        <TenziesDie
          key={die.id}
          die={die}
          isStatic={false}
          timeOut={timeOut}
          onSelect={dieSelectToggle}
          rightValue={gatheredValue}
          rollCounter={rollCounter}
        />
      ))}
    </section>
  )

  return (
    <>
      {isVictorious() && <Confetti width={width} height={height} />}
      <main className='tenzies-app'>
        <TenziesHeader
          isVictorious={isVictorious()}
          isNewGame={isNewGame()}
          gatheredValue={gatheredValue}
          timer={timer}
          rollCounter={rollCounter}
        />
        {diceElements}
        <div className='tenzies-button-group'>
          {isVictorious() && (
            <TenziesHighScore
              highScore={highScore}
              setHighScore={setHighScore}
            />
          )}
          <TenziesRollButton
            isVictorious={isVictorious()}
            isNewGame={isNewGame()}
            rollDice={rollDice}
            startNewGame={startNewGame}
            timeOut={timeOut}
          />
          {!isNewGame() && !isVictorious() && (
            <TenziesServiceButton
              symbol='↻'
              position='bottomright'
              title='Restart Game'
              onClick={startNewGame}
            />
          )}
        </div>
      </main>
    </>
  )
}
