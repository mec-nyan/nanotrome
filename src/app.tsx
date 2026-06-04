import { useState } from 'preact/hooks'
import './app.css'

// TODO: Check these values.
const baseBpm = 120
const maxBpm = 300
const minBpm = 40

export function App() {

  return (
    <div className='app'>
      <AppName />
      <Metronome />
      <Footer />
    </div>
  )
}

function Metronome() {
  const [bpm, setBpm] = useState(baseBpm)
  return (
    <div className='metronome'>
      <Display bpm={bpm} />
      <Controls bpm={bpm} setBpm={setBpm} />
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

function Display({bpm}: {bpm: number}) {
  return (
    <div className='display-container'>
      <div className='display'>
        <div className='display-tag'>BPM</div>
        <div className='bpm'>{bpm}</div>
      </div>
    </div>
  )
}

function Controls({bpm, setBpm}: {bpm: number, setBpm: (n: number) => void}) {
  function handleBpmChange(bpm: number, increment: number) {
    const newBpm = bpm + increment

    if (newBpm > maxBpm ) {
      setBpm(maxBpm)
      return
    }

    if (newBpm < minBpm) {
      setBpm(minBpm)
      return
    }

    setBpm(newBpm)
  }

  return (
    <div className='controls'>
      <button class='control plus-one' onClick={() => handleBpmChange(bpm, 1)}>＋1</button>
      <button class='control minus-one' onClick={() => handleBpmChange(bpm, -1)}>−1</button>
      <button class='control plus-ten' onClick={() => handleBpmChange(bpm, 10)}>＋10</button>
      <button class='control minus-ten' onClick={() => handleBpmChange(bpm, -10)}>−10</button>
      <button class='control reset' onClick={() => setBpm(120)}>Reset</button>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      Made with <span className='material-symbols-outlined love'>favorite</span> by <span className='author'>nano</span>.
    </footer>
  )
}
