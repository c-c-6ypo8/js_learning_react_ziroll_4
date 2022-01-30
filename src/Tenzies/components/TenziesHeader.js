import './TenziesHeader.css'
import './TenziesDie.css'
import { TenziesDie } from './TenziesDie'

export const TenziesHeader = (props) => {
  const headerStartup = (
    <section className='tenzies-header'>
      <h1 className='tenzies-header-title'>Tenzies</h1>
      <div className='tenzies-header-desc'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </div>
    </section>
  )

  const headerStats = (
    <section className='tenzies-header'>
      <div className='tenzies-header-stats'>
        <div className='tenzies-header-stats-gathering'>
          <div className='tenzies-header-stats-title'>You gather</div>
          <div className='tenzies-header-die'>
            <TenziesDie die={{ value: props.gatheredValue }} static={true} />
          </div>
        </div>
        <div className='tenzies-header-stats-rolls'>
          <div className='tenzies-header-stats-title'>Rerolls made</div>
          <div className='tenzies-header-stats-rollscounter'>
            {props.rollCounter}
          </div>
        </div>
        <div className='tenzies-header-stats-time'>
          <div className='tenzies-header-stats-title'>Time passed</div>
          <div className='tenzies-header-stats-time-timer'>{props.timer}</div>
        </div>
      </div>
    </section>
  )

  const headerCongrats = (
    <section className='tenzies-header'>
      <h1 className='tenzies-header-title'>Congratulations!</h1>
      <span className='tenzies-header-desc'>
        You've gathered all dice
        <br /> in <strong>{props.timer}</strong> seconds and
        <strong> {props.rollCounter}</strong> rerolls!
      </span>
    </section>
  )
  return (
    (props.isVictorious && headerCongrats) ||
    (props.newGame && headerStartup) ||
    headerStats
  )
}
