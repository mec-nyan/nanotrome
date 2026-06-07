import './app.css'
import Footer from './components/footer'

import Metronome from './components/metronome'
import TopBar from './components/topBar'

export function App() {
  return (
    <div className='app'>
      <TopBar />
      <Metronome />
      <Footer />
    </div>
  )
}
