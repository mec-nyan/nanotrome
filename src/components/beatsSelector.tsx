import './beatsSelector.css'

export default function BeatsSelector({
  label,
  num,
  setNum,
}: {
  label: string
  num: number
  setNum: (b: number) => void
}) {
  // TODO: Handle max/min separately for beats and subdivision.
  const maxNum = 10
  const minNum = 1

  type action = 'increment' | 'decrement'

  const handleSetNum = (a: action) => {
    switch (a) {
      case 'increment':
        if (num < maxNum) {
          setNum(num + 1)
        }
        break
      case 'decrement':
        if (num > minNum) {
          setNum(num - 1)
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
        <div className='selector-value'>{num}</div>
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
