import './TenziesHeader.css'
import './TenziesDie.css'
import { TenziesDie } from './TenziesDie'

export const TenziesHeader = ({ isVictorious, newGame, gatheredValue }) => {
  const headerStartup = (
    <section className='tenzies-header'>
      <h1 className='tenzies-header-title'>Tenzies</h1>
      <div className='tenzies-header-desc'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </div>
    </section>
  )

  const date = new Date()
  const currentTime = `${date.getMinutes()}:${date.getSeconds()}`

  const headerStats = (
    <section className='tenzies-header'>
      <div className='tenzies-header-stats'>
        <div className='tenzies-header-stats-gathering'>
          You gather:
          <div className="tenzies-header-die">
            <TenziesDie die={{value: gatheredValue}} />
          </div>
        </div>
        <div className='tenzies-header-stats-time'>
          Time passed:
          <div className='tenzies-header-stats-time-timer'>{currentTime}</div>
        </div>
      </div>
    </section>
  )

  const headerCongrats = (
    <section className='tenzies-header'>
      <h1 className='tenzies-header-title'>Congratulations!</h1>
      <div className='tenzies-header-desc'>You've gathered all the dice!</div>
    </section>
  )
  return (
    (isVictorious && headerCongrats) ||
    (newGame && headerStartup) ||
    headerStats
  )
}
