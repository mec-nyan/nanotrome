export default function StartStopButton({isOn, toggle}: {isOn: boolean, toggle: () => void}) {

  return (
    <div className='start-stop-container'>
      <div className='start-stop-button-outer'>
        <div className='start-stop-button' onClick={toggle}>{isOn ? 'Stop' : 'Start'}</div>
      </div>
    </div>
  )
}
