import React, { useState } from 'react';
import './App.css';
import Fretboard from './Fretboard';
import Metronome from './Metronome';

function App() {
  const [rootNote, setRootNote] = useState('');
  const [scaleType, setScaleType] = useState('major');
  const [shapeType, setShapeType] = useState('fullScale');
  const [hoveredNote, setHoveredNote] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  const rootNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const scaleTypes = ['major', 'minor', 'diminished', 'augmented', 'pentatonic'];
  const shapeTypes = ['fullScale', 'triads', 'classic'];

  const handleNoteClick = (string, fret) => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/${string}_${fret}.wav`);
    audio.play().catch((error) => {
      console.error(`Error playing sound: ${error}`);
    });
  };

  const addToPlaylist = () => {
    if (rootNote && scaleType && shapeType) {
      const newEntry = `${rootNote} ${scaleType} (${shapeType})`;
      if (!playlist.includes(newEntry)) {
        setPlaylist((prevPlaylist) => [...prevPlaylist, newEntry]);
      }
    }
  };

  const handlePlaylistClick = (entry) => {
    const regex = /^([A-G]#?)\s+(\w+)\s+\(([^)]+)\)$/;
    const match = entry.match(regex);
    if (match) {
      const [, root, scale, shape] = match;
      setRootNote(root);
      setScaleType(scale);
      setShapeType(shape);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="metronome-header">
          <Metronome />
        </div>
        <h1>Dynamic Fretboard Visualizer</h1>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="ChordScales Logo" className="logo" />
        <p>Select a root note, scale/chord, and shape to visualize on the fretboard</p>
      </header>

      <div className="selection-container">
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

        <button onClick={addToPlaylist}>Add to Playlist</button>
      </div>

      <div className="fretboard-container">
        <Fretboard 
          rootNote={rootNote} 
          scaleType={scaleType} 
          shapeType={shapeType} 
          setHoveredNote={setHoveredNote}
          handleNoteClick={handleNoteClick}
        />
      </div>

      <div className="hovered-info-container">
        <div className="hovered-info" style={{ visibility: hoveredNote ? 'visible' : 'hidden', height: '40px' }}>
          <p>Hovered Note: {hoveredNote ? `${hoveredNote.note} (String: ${hoveredNote.string}, Fret: ${hoveredNote.fret})` : ''}</p>
        </div>
      </div>

      {/* Playlist display */}
      <div className="playlist-container">
        <h3>Playlist</h3>
        <ul>
          {playlist.map((entry, index) => (
            <li key={index} onClick={() => handlePlaylistClick(entry)} style={{ cursor: 'pointer' }}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
