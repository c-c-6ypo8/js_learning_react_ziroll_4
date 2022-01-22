import React from 'react'
import './TenziesApp.css'

export const TenziesApp = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const dice = numbers.map((number) => (
    <div className='no-selection tenzies-dice-die tenzies-dice-die-selected' key={number}>
      {number}
    </div>
  ))

  return (
    <main className='tenzies-app'>
      <div className='tenzies-header'>
        <h1 className='tenzies-header-title'>Tenzies</h1>
        <div className='tenzies-header-desc'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </div>
      </div>
      <div className='tenzies-dice'>{dice}</div>
      <div className='no-selection tenzies-rollbutton'>Roll</div>
    </main>
  )
}
