import './app.css'

export function App() {

  return (
    <div className='app'>
      <AppName />
    </div>
  )
}

function AppName() {
  return (
    <div className='top-bar'>
      <span className='app-name'>nanotrome</span>
    </div>
  )
}
