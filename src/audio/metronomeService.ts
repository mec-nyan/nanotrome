export type BeatType = 'accent' | 'beat' | 'subdivision'

export type BeatCallback = (beatType: BeatType, beatNumber: number) => void

export class MetronomeService {
  private audioContext: AudioContext
  private isRunning= false
  private currentBeatIndex= 0
  private tempo = 120
  private subdivisions = 1
  private nextNoteTime = 0
  private sheduleAheadTime = 0.1 // 100ms look-ahead
  private lookAheadTime = 0.025 // check every 25ms
  private sheduleID: number | null = null
  private beatCallbacks: BeatCallback[] = []
  private penidngVisualUpdates: Set<number> = new Set()

  constructor(tempo: number) {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.tempo = tempo
  }

  start() {
    if (this.isRunning) {
      return
    }
    this.isRunning = true
    this.currentBeatIndex = 0
    this.nextNoteTime = this.audioContext.currentTime
    this.sheduler()
  }

  stop() {
    this.isRunning = false
    if (this.sheduleID !== null) {
      clearTimeout(this.sheduleID)
    }
  }

  setTempo(bpm: number) {
    this.tempo = bpm
  }

  onBeat(callback: BeatCallback) {
    this.beatCallbacks.push(callback)
    return () => {
      this.beatCallbacks = this.beatCallbacks.filter(cb => cb !== callback)
    }
  }

  private sheduler = () => {
    if (!this.isRunning) {
      return
    }

    while (this.nextNoteTime < this.audioContext.currentTime + this.sheduleAheadTime) {
      this.sheduleNote(this.nextNoteTime, this.currentBeatIndex)
      this.nextNoteTime += this.noteLength()
      this.currentBeatIndex++
    }

    this.sheduleID = window.setTimeout(this.sheduler, this.lookAheadTime * 1000)
  }

  private sheduleNote(time: number, beatIndex: number) {
    const noteType = this.getNoteType(beatIndex)
    const displayBeatNumber = (beatIndex % this.subdivisions) === 0
      ? Math.floor(beatIndex / this.subdivisions) % 4 + 1
      : -1

    this.playSound(time, noteType)

    const delayMs = Math.max(0, (time - this.audioContext.currentTime) * 1000)
    const updateId = Math.random()
    this.penidngVisualUpdates.add(updateId)

    setTimeout(() => {
      if (!this.penidngVisualUpdates.has(updateId)) {
        return
      }
      this.penidngVisualUpdates.delete(updateId)
      this.beatCallbacks.forEach(cb => cb(noteType, displayBeatNumber))
    }, delayMs)

  }

  private getNoteType(beatIndex: number): BeatType {
    const subdivisionIndex = beatIndex % this.subdivisions
    const quarterNoteIndex = Math.floor(beatIndex / this.subdivisions) % 4

    if (subdivisionIndex === 0) {
      return quarterNoteIndex === 0 ? 'accent' : 'beat'
    }

    return 'subdivision'
  }

  private playSound(time: number, type: BeatType) {
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    // TODO: use a noise generator (or sampled sounds) instead.
    const config = {
      accent: {frequency: 880, duration: 0.1, volume: 0.5},
      beat: {frequency: 440, duration: 0.08, volume: 0.4},
      subdivision: {frequency: 220, duration: 0.05, volume: 0.3},
    }

    const { frequency, duration, volume } = config[type]

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(volume, time)
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration)

    osc.start(time)
    osc.stop(time + duration)
  }

  private noteLength(): number {
    return (60 / this.tempo) / this.subdivisions
  }
}
