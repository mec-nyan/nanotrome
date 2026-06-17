import { useEffect, useRef, useState } from 'preact/hooks'
import {
  baseBpm,
  defaultNumberOfBeatsPerBar,
  defaultSubdivision,
} from '../audio/tempo'
import { type BeatType, MetronomeService } from '../audio/metronomeService'
import Display from './display'
import BeatsConfig from './beatsConfig'
import BeatsDisplay from './beatsDisplay'
import Controls from './controls'
import StartStopButton from './startStopButton'
import './metronome.css'

export default function Metronome() {
  const [bpm, setBpm] = useState(baseBpm)
  const [beats, setBeats] = useState(defaultNumberOfBeatsPerBar)
  const [subdivision, setSubdivision] = useState(defaultSubdivision)
  const [subdivisionIndex, setSubdivisionIndex] = useState(0)
  const [isOn, setIsOn] = useState(false)
  // I'll use 'beatType' to display subdivision.
  const [_currentBeatType, setCurrentBeatType] = useState<BeatType | null>(null)
  const [currentBeatNumber, setCurrentBeatNumber] = useState<number>(0)
  const metronomeRef = useRef<MetronomeService | null>(null)
  const unsubscribeRef = useRef<() => void | null>(null)

  useEffect(() => {
    metronomeRef.current = new MetronomeService(bpm)

    unsubscribeRef.current = metronomeRef.current.onBeat(
      (beatType, beatNumber, subIndex) => {
        setCurrentBeatType(beatType)
        setSubdivisionIndex(subIndex)

        if (beatNumber > 0) {
          setCurrentBeatNumber(beatNumber)
        }
      }
    )

    return () => {
      metronomeRef.current?.stop()
      unsubscribeRef.current?.()
    }
  }, [])

  useEffect(() => {
    metronomeRef.current?.setTempo(bpm)
  }, [bpm])

  useEffect(() => {
    metronomeRef.current?.setSubdivision(subdivision)
  }, [subdivision])

  useEffect(() => {
    metronomeRef.current?.setBeats(beats)
  }, [beats])

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
      <div id='top-group'>
        <Display bpm={bpm} />
        <Controls bpm={bpm} setBpm={setBpm} />
      </div>

      <div id='bottom-group'>
        <BeatsConfig
          beats={beats}
          setBeats={setBeats}
          subdivision={subdivision}
          setSubdivision={setSubdivision}
        />
        <BeatsDisplay
          beats={beats}
          beatIndex={currentBeatNumber}
          subdivisions={beats * subdivision}
          subdivisionIndex={subdivisionIndex}
          running={isOn}
        />
        <StartStopButton isOn={isOn} toggle={toggleMetronome} />
      </div>
    </div>
  )
}
