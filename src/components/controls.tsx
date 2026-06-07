import { baseBpm, maxBpm, minBpm } from "../audio/tempo"

export default function Controls({bpm, setBpm}: {bpm: number, setBpm: (n: number) => void}) {
  function handleBpmChange(bpm: number, increment: number) {
    const newBpm = bpm + increment

    if (newBpm > maxBpm ) {
      setBpm(maxBpm)
      return
    }

    if (newBpm < minBpm) {
      setBpm(minBpm)
      return
    }

    setBpm(newBpm)
  }

  return (
    <div className='controls-outer-container'>
      <div className='controls'>
        <div class='control plus-one' onClick={() => handleBpmChange(bpm, 1)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>+1</div>
        </div>
        <div class='control minus-one' onClick={() => handleBpmChange(bpm, -1)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>-1</div>
        </div>
        <div class='control plus-ten' onClick={() => handleBpmChange(bpm, 10)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>+10</div>
        </div>
        <div class='control minus-ten' onClick={() => handleBpmChange(bpm, -10)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>-10</div>
        </div>
        <div class='control reset' onClick={() => setBpm(baseBpm)}>
          <div className='control-button-outer'>
            <div className='control-button-inner'></div>
          </div>
          <div className='control-label'>reset</div>
        </div>
      </div>
    </div>
  )
}
