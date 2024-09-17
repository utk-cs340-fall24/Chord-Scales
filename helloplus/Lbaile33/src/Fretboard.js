import React from 'react';
import { getScaleNotes, noteNames } from './utils';

const Fretboard = ({ rootNote, scaleType }) => {
  const frets = Array.from({ length: 12 }, (_, index) => index + 1);
  const strings = ['E', 'A', 'D', 'G', 'B', 'E'];
  const scaleNotes = getScaleNotes(rootNote, scaleType);

  return (
    <div className="fretboard">
      {strings.map((string, stringIndex) => (
        <div key={stringIndex} className="string">
          <p>{string}</p>
          {frets.map((fret) => {
            // Convert fret number to note name for highlighting
            const noteAtFret = noteNames[(noteNames.indexOf(string) + fret) % 12];
            return (
              <div 
                key={fret} 
                className={`fret ${scaleNotes.includes(noteAtFret) ? 'highlight' : ''}`}
              >
                <p>{fret}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Fretboard;
