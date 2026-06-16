import './topBar.css'

export default function TopBar() {
  // TODO: Menu isOpen must come from props.
  let isOpen = false
  return (
    <div className='top-bar'>
      <span className='app-name'>nanotrome</span>
      <span className='material-symbols-outlined menu-icon'>
        {isOpen ? 'close' : 'more_vert'}
      </span>
    </div>
  )
}
