import { registerServiceWorker } from './service-worker.ts'
import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'

registerServiceWorker()

render(<App />, document.getElementById('app')!)
