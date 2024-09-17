const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const getScaleNotes = (rootNote, scaleType) => {
  const scaleIntervals = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    // Add more scales as needed
  };

  if (!noteNames.includes(rootNote) || !scaleIntervals[scaleType]) return [];

  const rootIndex = noteNames.indexOf(rootNote);
  const intervals = scaleIntervals[scaleType];

  return intervals.map(interval => noteNames[(rootIndex + interval) % 12]);
};

export { noteNames }; // Export noteNames
