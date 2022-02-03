import { useState } from 'react'
import { TenziesServiceButton } from './TenziesServiceButton'
import { TenziesDie } from './TenziesDie'
import './TenziesDie.css'
import './TenziesHighScore.css'

export const TenziesHighScore = ({ highScore, setHighScore }) => {
  const [highScoreVisible, setHighScoreVisible] = useState(false)

  const highScoreElements = highScore.data.map((scoreLine) => (
    <li
      key={scoreLine.id}
      className={scoreLine.last ? 'tenzies-highscore-currentline' : ''}
    >
      <div className='tenzies-highscore-die'>
        <TenziesDie die={{ value: scoreLine.value }} isStatic={true} />
      </div>
      <div className='tenzies-highscore-line-text'>
        <div>
          <strong>{scoreLine.rolls}</strong> rolls in{' '}
          <strong>{scoreLine.time}</strong> seconds
        </div>
        <div className='tenzies-highscore-line-text-date'>{scoreLine.date}</div>
      </div>
    </li>
  ))

  return (
    <>
      <div
        className='tenzies-highscorebutton no-selection'
        onClick={() => setHighScoreVisible(true)}
      >
        High Score
      </div>
      <section
        className={'tenzies-highscore' + (!highScoreVisible ? ' hidden' : '')}
      >
        <TenziesServiceButton
          symbol='✕'
          position='topright'
          title='Close Score Table'
          onClick={() => setHighScoreVisible(false)}
        />
        <TenziesServiceButton
          symbol='🗑'
          position='bottomright'
          title='Clear Score Table'
          onClick={() => setHighScore({ data: [] })}
        />
        <h1>High Score</h1>
        <ol>{highScoreElements}</ol>
      </section>
    </>
  )
}
