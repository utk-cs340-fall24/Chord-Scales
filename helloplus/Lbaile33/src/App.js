import React, { useState } from 'react';
import './App.css';
import Fretboard from './Fretboard'; 

function App() {
  const [rootNote, setRootNote] = useState('');
  const [scaleType, setScaleType] = useState('major');
  const rootNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const scaleTypes = ['major', 'minor']; // Add more scale types if needed

  return (
    <div className="App">
      <h1>Scale Visualizer</h1>
      <p>Select a root note and scale to visualize it on the fretboard!</p>

      <label htmlFor="root-note">Root Note: </label>
      <select
        id="root-note"
        value={rootNote}
        onChange={(e) => setRootNote(e.target.value)}
      >
        <option value="">Select</option>
        {rootNotes.map((note) => (
          <option key={note} value={note}>
            {note}
          </option>
        ))}
      </select>

      <label htmlFor="scale-type">Scale Type: </label>
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

      <p>Selected Root Note: {rootNote || 'None'}</p>
      <p>Selected Scale Type: {scaleType || 'Major'}</p>

      {/* Fretboard visualization */}
      <Fretboard rootNote={rootNote} scaleType={scaleType} />
    </div>
  );
}

export default App;
