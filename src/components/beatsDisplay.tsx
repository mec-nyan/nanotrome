import './beatsDisplay.css'

export default function BeatsDisplay({
  beatNumber,
  running,
}: {
  beatNumber: number
  running: boolean
}) {
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
      label: i + 1,
      active: active,
      off: off,
    })
  }

  const beats = beatInfo.map((beat) => {
    return (
      <div className={`beat`}>
        <div className={`beat-label ${!beat.active && 'hidden'}`}>
          {beat.label}
        </div>
        <div
          className={`beat-indicator ${beat.active && 'active'} ${beat.off && 'off'}`}
        ></div>
      </div>
    )
  })

  return (
    <div className='beat-outer-container'>
      <div className='beat-line'>{running && beats}</div>
    </div>
  )
}
