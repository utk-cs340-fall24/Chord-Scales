import React, { useState } from 'react';
import './App.css';
import Fretboard from './Fretboard';

function App() {
  const [rootNote, setRootNote] = useState('');
  const [scaleType, setScaleType] = useState('major');
  const [shapeType, setShapeType] = useState('fullScale'); // New state for shape
  const [hoveredNote, setHoveredNote] = useState(null); // Track hovered note state

  // Updated root notes with sharps
  const rootNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const scaleTypes = ['major', 'minor', 'diminished', 'augmented', 'pentatonic'];
  const shapeTypes = ['fullScale', 'triads', 'classic'];

  // Function to play a test sound
  const playTestSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // Sine wave for a basic sound
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Set frequency (A4)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // Play for 0.2 seconds
  };

  // Handle note click by playing a test sound
  const handleNoteClick = (note) => {
    console.log(`Note clicked: ${note}`);
    playTestSound(); // Play sound when a note is clicked
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Fretboard Visualizer</h1>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="ChordScales Logo" className="logo" />
        <p>Select a root note, scale/chord, and shape to visualize on the fretboard</p>
      </header>

      {/* Selection container for dropdowns */}
      <div className="selection-container">
        <label htmlFor="root-note">Root Note: </label>
        <select
          id="root-note"
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value)}
        >
          <option value="">Select123</option>
          {rootNotes.map((note) => (
            <option key={note} value={note}>
              {note}
            </option>
          ))}
        </select>

        <label htmlFor="scale-type">Scale/Chord Type: </label>
        <select
          id="scale-type"
          value={scaleType}
          onChange={(e) => setScaleType(e.target.value)}
        >
          {scaleTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        {/* Shape Selection Dropdown */}
        <label htmlFor="shape-type">Shape: </label>
        <select
          id="shape-type"
          value={shapeType}
          onChange={(e) => setShapeType(e.target.value)}
        >
          {shapeTypes.map((shape) => (
            <option key={shape} value={shape}>
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="fretboard-container">
        {/* Pass setHoveredNote, shapeType, and handleNoteClick as props to Fretboard */}
        <Fretboard 
          rootNote={rootNote} 
          scaleType={scaleType} 
          shapeType={shapeType} 
          setHoveredNote={setHoveredNote}
          handleNoteClick={handleNoteClick} // Pass handleNoteClick to Fretboard
        />
      </div>

      {/* Hovered info below fretboard */}
      {hoveredNote && (
        <div className="hovered-info">
          <p>Hovered Note: {hoveredNote.note} (String: {hoveredNote.string}, Fret: {hoveredNote.fret})</p>
        </div>
      )}
    </div>
  );
}

export default App;
