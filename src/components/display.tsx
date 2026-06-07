import { getTempoName } from "../audio/tempo";
import './display.css'

export default function Display({bpm}: {bpm: number}) {

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
