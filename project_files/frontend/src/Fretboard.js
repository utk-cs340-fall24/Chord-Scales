import { getScaleNotes, noteNames } from './utils';

const stringNotes = { 'E2': 'E', 'A': 'A', 'D': 'D', 'G': 'G', 'B': 'B', 'E': 'E' };

const Fretboard = ({ rootNote, scaleType, shapeType, setHoveredNote, handleNoteClick }) => {
  const frets = Array.from({ length: 13 }, (_, index) => index); // 0 to 12 frets
  const strings = ['E2', 'A', 'D', 'G', 'B', 'E']; // Distinguish between low E (E2) and high E
  const scaleNotes = getScaleNotes(rootNote, scaleType);

  let displayedNotes = scaleNotes;

  if (shapeType === 'triads') {
    displayedNotes = [scaleNotes[0], scaleNotes[2], scaleNotes[4]];
  } else if (shapeType === 'classic') {
    displayedNotes = [scaleNotes[0], scaleNotes[3], scaleNotes[4]];
  }

  return (
    <div className="guitar-neck">
      {strings.map((string, stringIndex) => {
        const baseNoteName = stringNotes[string];
        const baseNoteIndex = noteNames.indexOf(baseNoteName);
        return (
          <div key={stringIndex} className="guitar-string">
            {frets.map((fret) => {
              const noteAtFret = noteNames[(baseNoteIndex + fret) % 12];

              return (
                <div
                  key={fret}
                  className={`guitar-fret ${displayedNotes.includes(noteAtFret) ? 'highlight' : ''}`}
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