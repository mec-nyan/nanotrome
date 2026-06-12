import './beatsSelector.css'

export default function BeatsSelector({
  label,
  value,
  setValue,
  minValue,
  maxValue,
}: {
  label: string
  value: number
  setValue: (b: number) => void
  minValue: number
  maxValue: number
}) {
  type action = 'increment' | 'decrement'

  const handleSetNum = (a: action) => {
    switch (a) {
      case 'increment':
        if (value < maxValue) {
          setValue(value + 1)
        }
        break
      case 'decrement':
        if (value > minValue) {
          setValue(value - 1)
        }
        break
    }
  }

  return (
    <div className='selector-outer-container'>
      <div className='selector-label'>{label}</div>

      <div className='selector-inner-container'>
        <div
          className='selector-minus'
          onClick={() => handleSetNum('decrement')}
        >
          -
        </div>
        <div className='selector-value'>{value}</div>
        <div
          className='selector-plus'
          onClick={() => handleSetNum('increment')}
        >
          +
        </div>
      </div>
    </div>
  )
}
