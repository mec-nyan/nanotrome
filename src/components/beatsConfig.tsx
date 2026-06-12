import BeatsSelector from './beatsSelector'
import './beatsConfig.css'
import {
  maxBeatsPerBar,
  maxSubdivisions,
  minBeatsPerBar,
  minSubdivisions,
} from '../audio/tempo'

export default function BeatsConfig({
  beats,
  setBeats,
  subdivision,
  setSubdivision,
}: {
  beats: number
  setBeats: (s: number) => void
  subdivision: number
  setSubdivision: (s: number) => void
}) {
  return (
    <div className='beat-config-container'>
      <div className='beat-config'>
        <BeatsSelector
          label='Beats'
          value={beats}
          setValue={setBeats}
          minValue={minBeatsPerBar}
          maxValue={maxBeatsPerBar}
        />

        <BeatsSelector
          label='Sub'
          value={subdivision}
          setValue={setSubdivision}
          minValue={minSubdivisions}
          maxValue={maxSubdivisions}
        />
      </div>
    </div>
  )
}
