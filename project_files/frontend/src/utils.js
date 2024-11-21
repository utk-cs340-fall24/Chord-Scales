const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const getScaleNotes = (rootNote, scaleType) => {
  const scaleIntervals = {
    major: [0, 2, 4, 5, 7, 9, 11], // W W H W W W H
    minor: [0, 2, 3, 5, 7, 8, 10], // W H W W H W W
    diminished: [0, 2, 3, 5, 6, 8, 9], // Diminished scale
    augmented: [0, 3, 4, 7, 8, 11], // Augmented scale
    pentatonic: [0, 2, 4, 7, 9], // Pentatonic scale
  };

  if (!noteNames.includes(rootNote) || !scaleIntervals[scaleType]) return [];

  const rootIndex = noteNames.indexOf(rootNote);
  const intervals = scaleIntervals[scaleType];

  return intervals.map(interval => noteNames[(rootIndex + interval) % 12]);
};

export { noteNames };