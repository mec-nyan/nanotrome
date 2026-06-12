// TODO: Check these values.
export const baseBpm = 120
export const maxBpm = 210
export const minBpm = 40
// TODO: Review these settings,
// and maybe allow the user to override some limits on advanced settings.
export const minBeatsPerBar = 1
export const maxBeatsPerBar = 12
export const defaultNumberOfBeatsPerBar = 4
export const minSubdivisions = 1
export const maxSubdivisions = 8
export const defaultSubdivision = 1

export function getTempoName(bpm: number): string {
  // TODO: There isn't a strict relationship between these names
  // and the BPM.  See if we can improve this correlation.  Also,
  // check if we're gonna use values under 40 or over 200.
  if (bpm < 40) {
    return '...'
  } else if (bpm < 50) {
    return 'Largo'
  } else if (bpm < 60) {
    return 'Adaggio'
  } else if (bpm < 108) {
    return 'Andante'
  } else if (bpm < 120) {
    return 'Moderato'
  } else if (bpm < 156) {
    return 'Allegro'
  } else if (bpm < 168) {
    return 'Vivace'
  } else if (bpm < 201) {
    return 'Presto'
  } else {
    return '...'
  }
}
