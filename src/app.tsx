import { useEffect, useRef, useState } from 'preact/hooks'
import './app.css'
import { baseBpm, getTempoName, maxBpm, minBpm } from './tempo';

import { type BeatType, MetronomeService } from './metronomeService';


export function App() {

  return (
    <div className='app'>
      <TopBar />
      <Metronome />
      <Footer />
    </div>
  )
}

function Metronome() {
  const [bpm, setBpm] = useState(baseBpm)
  const [isOn, setIsOn] = useState(false);
  const [currentBeatType, setCurrentBeatType] = useState<BeatType | null>(null)
  const [currentBeatNumber, setCurrentBeatNumber] = useState<number>(0)
  const metronomeRef = useRef<MetronomeService | null>(null)
  const unsubscribeRef = useRef<() => void | null>(null)

  useEffect(() => {
    metronomeRef.current = new MetronomeService(bpm)

    unsubscribeRef.current = metronomeRef.current.onBeat((beatType, beatNumber) => {
      setCurrentBeatType(beatType)
      if (beatNumber > 0) {
        setCurrentBeatNumber(beatNumber)
      }
    })

    return () => {
      metronomeRef.current?.stop()
      unsubscribeRef.current?.()
    }
  }, [])

  useEffect(() => {
    metronomeRef.current?.setTempo(bpm)
  }, [bpm])

  const toggleMetronome = () => {
    if (!metronomeRef.current) return

    if (isOn) {
      metronomeRef.current.stop()
      setIsOn(false)
      setCurrentBeatNumber(0)
      setCurrentBeatType(null)
    } else {
      metronomeRef.current.start()
      setIsOn(true)
    }
  }


  return (
    <div className='metronome'>
      <Display bpm={bpm} />
      <Controls bpm={bpm} setBpm={setBpm} />
      <Beats beatNumber={currentBeatNumber} running={isOn} />
      <StartStopButton isOn={isOn} toggle={toggleMetronome} />
    </div>
  )
}

function TopBar() {
  // TODO: Menu isOpen must come from props.
  let isOpen = false
  return (
    <div className='top-bar'>
      <span className='app-name'>nanotrome</span>
      <span className='material-symbols-outlined menu-icon'>{isOpen ? 'close' : 'menu'}</span>
    </div>
  )
}

function Display({bpm}: {bpm: number}) {

  return (
    <div className='display-outer-container'>
      <div className='display-inner-container'>
        <div className='display-tag'>BPM</div>
        <div className='display'>
          <div className='bpm'>{bpm}</div>
          <div className='tempo'>{getTempoName(bpm)}</div>
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

function Beats({beatNumber, running }: { beatNumber: number, running: boolean}) {
  // TODO: Beat info may come from props.
  interface Beat {
    label: number
    active: boolean
    off: boolean
  }

  let beatInfo: Beat[] = []
  for (let i = 0; i < 4; i++) {
    const active = beatNumber === i + 1
    const off = !running
    beatInfo.push({
      label: i+1,
      active: active,
      off: off
    })
  }

  const beats = beatInfo.map((beat) => {
    return (
        <div className={`beat`}>
          <div className={`beat-label ${!beat.active && "hidden"}`}>{beat.label}</div>
          <div className={`beat-indicator ${beat.active && "active"} ${beat.off && "off"}`}></div>
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

function StartStopButton({isOn, toggle}: {isOn: boolean, toggle: () => void}) {

  return (
    <div className='start-stop-container'>
      <div className='start-stop-button-outer'>
        <div className='start-stop-button' onClick={toggle}>{isOn ? 'Stop' : 'Start'}</div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <span className='made-with-love'>
        Made with{' '}
        <span className='material-symbols-outlined love'>favorite</span> by{' '}
        <span className='author'>nano</span>.
      </span>
    </footer>
  )
}
