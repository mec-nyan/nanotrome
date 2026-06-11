import BeatsSelector from './beatsSelector'
import './beatsConfig.css'

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
        <BeatsSelector label='Beats' num={beats} setNum={setBeats} />

        <BeatsSelector label='Sub' num={subdivision} setNum={setSubdivision} />
      </div>
    </div>
  )
}
