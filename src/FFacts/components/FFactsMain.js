import './FFactsMain.css'

export const FFactsMain = (props) => {
  return (
    <main className={`ffacts-main ${props.darkMode ? 'dark' : ''}`}>
      <h1 className="ffacts-main-title">Fun facts about React</h1>
      <ul className="ffacts-main-facts">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100K stars on GitHub</li>
        <li>Is maintained by Facebook</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  )
}
