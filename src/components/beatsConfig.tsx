import { useState } from 'preact/hooks'
import BeatsSelector from './beatsSelector'
import './beatsConfig.css'

export default function BeatsConfig({
  subdivision,
  setSubdivision,
}: {
  subdivision: number
  setSubdivision: (s: number) => void
}) {
  // NOTE: These should come as props.
  const [beat, setBeat] = useState(4)
  // const [sub, setSub] = useState(1) // No subdivision.

  return (
    <div className='beat-config-container'>
      <div className='beat-config'>
        <BeatsSelector label='Beats' num={beat} setNum={setBeat} />

        <BeatsSelector label='Sub' num={subdivision} setNum={setSubdivision} />
      </div>
    </div>
  )
}
