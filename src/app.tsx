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
      <Beats />
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
  // TODO: Implement types and methods to retrieve the tempo's
  // name according to the current BPM.
  const [tempo, _setTempo] = useState('Allegro')

  return (
    <div className='display-outer-container'>
      <div className='display-inner-container'>
        <div className='display-tag'>BPM</div>
        <div className='display'>
          <div className='bpm'>{bpm}</div>
          <div className='tempo'>{tempo}</div>
        </div>
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
    <div className='controls-outer-container'>
      <div className='controls'>
        <div class='control plus-one' onClick={() => handleBpmChange(bpm, 1)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>+1</div>
        </div>
        <div class='control minus-one' onClick={() => handleBpmChange(bpm, -1)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>-1</div>
        </div>
        <div class='control plus-ten' onClick={() => handleBpmChange(bpm, 10)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>+10</div>
        </div>
        <div class='control minus-ten' onClick={() => handleBpmChange(bpm, -10)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>-10</div>
        </div>
        <div class='control reset' onClick={() => setBpm(baseBpm)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>reset</div>
        </div>
      </div>
    </div>
  )
}

function Beats() {
  // TODO: Beat info may come from props.
  interface Beat {
    label: number
    active: boolean
  }

  const beatInfo: Beat[] = [
    {
      label: 1,
      active: true,
    },
    {
      label: 2,
      active: false,
    },
    {
      label: 3,
      active: false,
    },
    {
      label: 4,
      active: false,
    },
  ]

  const beats = beatInfo.map((beat) => {
    return (
        <div className={`beat ${beat.active && "active"}`}>
          <div className={`beat-label ${!beat.active && "hidden"}`}>{beat.label}</div>
          <div className='beat-indicator'></div>
        </div>
    )
  })

  return (
    <div className='beat-outer-container'>
      <div className='beat-line'>

        {beats}

      </div>
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
