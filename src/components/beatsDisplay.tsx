import './beatsDisplay.css'

export default function BeatsDisplay({
  index,
  beats,
  beatIndex,
  subdivisions,
  subdivisionIndex,
  running,
}: {
  index: number
  beats: number
  beatIndex: number
  subdivisions: number
  subdivisionIndex: number
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
    const active = beatIndex === i + 1
    const off = !running
    beatInfo.push({
      label: i + 1,
      active: active,
      off: off,
    })
  }

  const lights = beatInfo.map((beat, i) => {
    return (
      <div className={`beat`}>
        <div className={`beat-label ${!beat.active ? 'hidden' : ''}`}>
          {beat.label}
        </div>
        {beats === 1 ? (
          <div
            key={index}
            className={`beat-indicator ${beat.active ? 'active' : ''} ${beat.off && 'off'}`}
          ></div>
        ) : (
          <div
            key={i}
            className={`beat-indicator ${beat.active ? 'active' : ''} ${beat.off && 'off'}`}
          ></div>
        )}
      </div>
    )
  })

  // Let's show the subdivisions per beat.
  // Maybe add "1 & 2 &..."
  let lines = []
  for (let i = 0; i < subdivisions / beats; i++) {
    lines.push(
      <div
        className={`subdivision-line ${i === subdivisionIndex % (subdivisions / beats) ? 'current' : ''}`}
      ></div>
    )
  }

  return (
    <div className='beat-outer-container'>
      <div className={`beat-line ${lights.length === 1 && 'only'}`}>
        {running && lights}
      </div>

      <div className='subdivision-display'>
        {subdivisions > beats && running && lines}
      </div>
    </div>
  )
}
