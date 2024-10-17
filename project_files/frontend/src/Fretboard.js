import React from 'react';
import { getScaleNotes, noteNames } from './utils';

const Fretboard = ({ rootNote, scaleType, shapeType, setHoveredNote }) => {
  const frets = Array.from({ length: 12 }, (_, index) => 12 - index); // Reverse fret numbering
  const strings = ['E', 'A', 'D', 'G', 'B', 'E']; // Guitar standard tuning
  const scaleNotes = getScaleNotes(rootNote, scaleType);

  let displayedNotes = scaleNotes;

  if (shapeType === 'triads') {
    displayedNotes = [scaleNotes[0], scaleNotes[2], scaleNotes[4]];
  } else if (shapeType === 'classic') {
    displayedNotes = [scaleNotes[0], scaleNotes[3], scaleNotes[4]];
  }

  const playTestSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Sine wave for a basic sound
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency (A4)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // Play for 0.2 seconds
  };

  return (
    <div className="guitar-neck">
      {strings.map((string, stringIndex) => (
        <div key={stringIndex} className="guitar-string">
          {frets.map((fret) => {
            const noteAtFret = noteNames[(noteNames.indexOf(string) + (12 - fret)) % 12];

            return (
              <div
                key={fret}
                className={`guitar-fret ${displayedNotes.includes(noteAtFret) ? 'highlight' : ''}`}
                onMouseEnter={() => setHoveredNote({ string, fret, note: noteAtFret })}
                onMouseLeave={() => setHoveredNote(null)}
                onClick={playTestSound} // Add click event to play sound
              >
                <p className="note-label">{noteAtFret}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Fretboard;
