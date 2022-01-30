import { useState } from 'react'
import { TenziesCloseButton } from './TenziesCloseButton'
import './TenziesHighScore.css'

export const TenziesHighScore = (props) => {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    setVisible(false)
  }
  return (
    <section className={'tenzies-highscore' + (!visible ? ' hidden' : '')}>
      <TenziesCloseButton close={handleClose} />
      <h1>High Score</h1>
      <ul>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
        <li>lorem</li>
      </ul>
    </section>
  )
}
