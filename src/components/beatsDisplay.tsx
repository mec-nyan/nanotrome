import './beatsDisplay.css'

export default function BeatsDisplay({
  beats,
  beatNumber,
  running,
}: {
  beats: number
  beatNumber: number
  running: boolean
}) {
  // TODO: Beat info may come from props.
  interface Light {
    label: number
    active: boolean
    off: boolean
  }

  let beatInfo: Light[] = []

  for (let i = 0; i < beats; i++) {
    const active = beatNumber === i + 1
    const off = !running
    beatInfo.push({
      label: i + 1,
      active: active,
      off: off,
    })
  }

  const lights = beatInfo.map((beat) => {
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
      <div className='beat-line'>{running && lights}</div>
    </div>
  )
}
