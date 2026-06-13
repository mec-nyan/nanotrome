import {
  baseBpm,
  defaultNumberOfBeatsPerBar,
  defaultSubdivision,
} from './tempo'

export type BeatType = 'accent' | 'beat' | 'subdivision'

export type BeatCallback = (
  beatType: BeatType,
  beatNumber: number,
  beatIndex: number,
  subdivisionIndex: number
) => void

export class MetronomeService {
  private audioContext: AudioContext
  private isRunning = false
  private currentBeatIndex = 0
  private tempo = baseBpm
  private beats = defaultNumberOfBeatsPerBar
  private subdivision = defaultSubdivision
  private nextNoteTime = 0
  private sheduleAheadTime = 0.1 // 100ms look-ahead
  private lookAheadTime = 0.025 // check every 25ms
  private sheduleID: number | null = null
  private beatCallbacks: BeatCallback[] = []
  private penidngVisualUpdates: Set<number> = new Set()

  constructor(tempo: number) {
    this.audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )()
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

  setBeats(beats: number) {
    // TODO: I should set some limit on the number of beats.
    // Also, when there's only 1 beat per measure it should play a single click.
    this.beats = beats > 0 ? beats : 1
  }

  setSubdivision(subdivision: number) {
    // TODO: The logic for handling subdivision may belong here.
    // TODO: I should set some limit on this too.
    this.subdivision = subdivision > 0 ? subdivision : 1
  }

  onBeat(callback: BeatCallback) {
    this.beatCallbacks.push(callback)
    return () => {
      this.beatCallbacks = this.beatCallbacks.filter((cb) => cb !== callback)
    }
  }

  private sheduler = () => {
    if (!this.isRunning) {
      return
    }

    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.sheduleAheadTime
    ) {
      this.sheduleNote(this.nextNoteTime, this.currentBeatIndex)
      this.nextNoteTime += this.noteLength()
      this.currentBeatIndex++
    }

    this.sheduleID = window.setTimeout(this.sheduler, this.lookAheadTime * 1000)
  }

  private sheduleNote(time: number, beatIndex: number) {
    const noteType = this.getNoteType(beatIndex)
    const displayBeatNumber =
      beatIndex % this.subdivision === 0
        ? (Math.floor(beatIndex / this.subdivision) % this.beats) + 1
        : -1

    const beatCount = Math.floor(beatIndex / this.subdivision)

    const notesPerBar = this.beats * this.subdivision
    const subdivisionIndex = beatIndex % notesPerBar

    this.playSound(time, noteType)

    const delayMs = Math.max(0, (time - this.audioContext.currentTime) * 1000)
    const updateId = Math.random()
    this.penidngVisualUpdates.add(updateId)

    setTimeout(() => {
      if (!this.penidngVisualUpdates.has(updateId)) {
        return
      }
      this.penidngVisualUpdates.delete(updateId)
      this.beatCallbacks.forEach((cb) => {
        cb(noteType, displayBeatNumber, beatCount, subdivisionIndex)
      })
    }, delayMs)
  }

  private getNoteType(beatIndex: number): BeatType {
    const subdivisionIndex = beatIndex % this.subdivision
    // Yes, a beat is a 'quarter note'.  Some bars may have a different representation on shit music
    // but that's not relevant here.
    const quarterNoteIndex =
      Math.floor(beatIndex / this.subdivision) % this.beats

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
    interface OscConfig {
      wave: OscillatorType
      frequency: number
      volume: number
      attack: number
      duration: number
      end: number
    }

    const config = new Map<BeatType, OscConfig>([
      [
        'accent',
        {
          wave: 'triangle',
          frequency: 880,
          volume: 0.5,
          attack: 0.002,
          duration: 0.04,
          end: 0.05,
        },
      ],
      [
        'beat',
        {
          wave: 'triangle',
          frequency: 440,
          volume: 0.5,
          attack: 0.002,
          duration: 0.04,
          end: 0.05,
        },
      ],
      [
        'subdivision',
        {
          wave: 'sine',
          frequency: 440,
          volume: 0.3,
          attack: 0.002,
          duration: 0.01,
          end: 0.02,
        },
      ],
    ])

    const { wave, frequency, volume, attack, duration, end } = config.get(type)!

    osc.type = wave

    const initialVolume = 0.001

    osc.frequency.value = frequency
    gain.gain.setValueAtTime(initialVolume, time)
    gain.gain.linearRampToValueAtTime(volume, time + attack)
    gain.gain.exponentialRampToValueAtTime(initialVolume, time + duration)

    osc.start(time)
    osc.stop(time + end)
  }

  private noteLength(): number {
    return 60 / this.tempo / this.subdivision
  }
}
