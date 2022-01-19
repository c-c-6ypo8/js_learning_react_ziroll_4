import './FFactsNavbar.css'
import logo from '../assets/react-icon-small.png'

export const FFactsNavbar = (props) => {
  return (
    <nav className={`ffacts-nav ${props.darkMode ? 'dark' : ''}`}>
      <div className="ffacts-nav-logo">
        <img src={logo} alt="logo" />
        <h2 className="ffacts-nav-logo-text">ReactFacts</h2>
      </div>
      <div className="ffacts-nav-toggler">
        <p className="ffacts-nav-toggler-textlight">Light</p>
        <div
          className="ffacts-nav-toggler-slider"
          onClick={props.toggleDarkMode}
        >
          <div className="ffacts-nav-toggler-slider-circle"></div>
        </div>
        <p className="ffacts-nav-toggler-textdark">Dark</p>
      </div>
    </nav>
  )
}
