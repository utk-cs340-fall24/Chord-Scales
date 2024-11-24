import { getScaleNotes, noteNames } from './utils';

const stringNotes = { 'E2': 'E', 'A': 'A', 'D': 'D', 'G': 'G', 'B': 'B', 'E': 'E' };

const noteToWavMapping = {
  'C': ['E2_8.wav', 'A_3.wav', 'D_10.wav', 'G_5.wav', 'B_1.wav', 'E_8.wav'],   // Example: C is A string fret 3, D string fret 10
  'C#': ['E2_9.wav', 'A_4.wav', 'D_11.wav', 'G_6.wav', 'B_2.wav', 'E_9.wav'],  // Example: C# is A string fret 4, D string fret 11
  'D': ['E2_10.wav', 'A_5.wav', 'D_0.wav', 'D_12.wav','G_7.wav', 'B_3.wav', 'E_10.wav'],   // Continue for all notes
  'D#': ['E2_11.wav', 'A_6.wav', 'D_1.wav', 'G_8.wav', 'B_4.wav', 'E_11.wav'],
  'E': ['E2_0.wav', 'E2_12.wav', 'A_7.wav', 'D_2.wav', 'G_9.wav', 'B_5.wav', 'E_0.wav', 'E_12.wav'], // Example for E
  'F': ['E2_1.wav', 'A_8.wav', 'D_3.wav', 'G_10.wav', 'B_6.wav', 'E_1.wav'],
  'F#': ['E2_2.wav', 'A_9.wav', 'D_4.wav', 'G_11.wav', 'B_7.wav', 'E_2.wav'],
  'G': ['E2_3.wav', 'A_10.wav', 'D_5.wav', 'G_0.wav', 'G_12.wav', 'B_8.wav', 'E_3.wav'],
  'G#': ['E2_4.wav', 'A_11.wav', 'D_6.wav', 'G_1.wav', 'B_9.wav', 'E_4.wav'],
  'A': ['E2_5.wav', 'A_0.wav', 'A_12.wav', 'D_7.wav', 'G_2.wav', 'B_10.wav', 'E_5.wav'],
  'A#': ['E2_6.wav', 'A_1.wav', 'D_8.wav', 'G_3.wav', 'B_11.wav', 'E_6.wav'],
  'B': ['E2_7.wav', 'A_2.wav', 'D_9.wav', 'G_4.wav', 'B_0.wav', 'B_12.wav', 'E_7.wav'],
};
  // Initialize an empty container to store highlighted `.wav` file names
  let highlightedWavFiles = [];

  // Function to update the highlightedWavFiles container based on displayedNotes
  const updateHighlightedWavFiles = (displayedNotes) => {
    highlightedWavFiles = displayedNotes
      .flatMap(note => noteToWavMapping[note] || []) // Map each note to its `.wav` files
      .filter(Boolean); // Filter out undefined mappings
  };

  function sortHighlightedWavFiles(highlightedWavFiles) {
    // Define the fretboard order of strings
    const stringOrder = ['E2', 'A', 'D', 'G', 'B', 'E'];

    function getFretboardOrder(fileName) {
        // Remove file extension and split into string and fret
        const [string, fret] = fileName.replace('.wav', '').split('_');
        const stringIndex = stringOrder.indexOf(string); // Get the order of the string
        const fretNumber = parseInt(fret, 10); // Convert fret to a number
        // Return a tuple-like array [stringIndex, fretNumber] for sorting
        return [stringIndex, fretNumber];
    }

    // Sort the files based on the string order and fret number
    highlightedWavFiles.sort((fileA, fileB) => {
        const [stringIndexA, fretNumberA] = getFretboardOrder(fileA);
        const [stringIndexB, fretNumberB] = getFretboardOrder(fileB);

        // First compare string indices, then compare fret numbers
        if (stringIndexA !== stringIndexB) {
            return stringIndexA - stringIndexB; // Sort by string
        } else {
            return fretNumberA - fretNumberB; // Sort by fret
        }
    });

    return highlightedWavFiles;
  }
  

const Fretboard = ({ rootNote, scaleType, shapeType, setHoveredNote, handleNoteClick, fretRange, highlightInRange }) => {
  const frets = Array.from({ length: 13 }, (_, index) => index); // 0 to 12 frets
  const strings = ['E2', 'A', 'D', 'G', 'B', 'E']; // Distinguish between low E (E2) and high E
  const scaleNotes = getScaleNotes(rootNote, scaleType);

  let displayedNotes = scaleNotes;
  updateHighlightedWavFiles(displayedNotes);
  highlightedWavFiles = sortHighlightedWavFiles(highlightedWavFiles);

  if (shapeType === 'triads') {
    displayedNotes = [scaleNotes[0], scaleNotes[2], scaleNotes[4]];
    updateHighlightedWavFiles(displayedNotes);
    highlightedWavFiles = sortHighlightedWavFiles(highlightedWavFiles);
  } else if (shapeType === 'classic') {
    displayedNotes = [scaleNotes[0], scaleNotes[3], scaleNotes[4]];
    updateHighlightedWavFiles(displayedNotes);
    highlightedWavFiles = sortHighlightedWavFiles(highlightedWavFiles);
  }
  console.log(getHighlightedWavFiles()); // Output: ['A_3', 'D_10', 'E2_0', 'B_0', 'E_12', 'E2_4', 'G_1']
  return (
    <div className="guitar-neck">
      {strings.map((string, stringIndex) => {
        const baseNoteName = stringNotes[string];
        const baseNoteIndex = noteNames.indexOf(baseNoteName);
        return (
          <div key={stringIndex} className="guitar-string">
            {frets.map((fret) => {
              const noteAtFret = noteNames[(baseNoteIndex + fret) % 12];
              const isHighlighted = displayedNotes.includes(noteAtFret) && fret >= fretRange.min && fret <= fretRange.max;

              return (
                <div
                  key={fret}
                  className={`guitar-fret ${isHighlighted ? 'highlight' : ''}`}
                  onMouseEnter={() => setHoveredNote({ string, fret, note: noteAtFret })}
                  onMouseLeave={() => setHoveredNote(null)}
                  onClick={() => handleNoteClick(string, fret)}
                >
                  <p className="note-label">{noteAtFret}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Fretboard;
// Getter function to pass the container to `app.js`
export const getHighlightedWavFiles = () => highlightedWavFiles;