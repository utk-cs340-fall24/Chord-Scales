import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import './App.css';
import Fretboard from './Fretboard';
import Metronome from './Metronome';
import ScaleInfoSidebar from './ScaleInfoSidebar';
import Login from './Login';

function App() {
  const { changeTheme } = useTheme();
  const [rootNote, setRootNote] = useState('');
  const [category, setCategory] = useState('');
  const [scaleType, setScaleType] = useState('');
  const [extensionType, setExtensionType] = useState('');
  const [bluesPentatonicType, setBluesPentatonicType] = useState('');
  const [hoveredNote, setHoveredNote] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [showMetronome, setShowMetronome] = useState(true); // State to control the visibility of the Metronome

  const rootNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  const scaleOptions = ['Major', 'Minor'];
  const chordOptions = ['Major', 'Minor', 'Diminished', 'Augmented'];
  const bluesPentatonicOptions = ['Blues', 'Pentatonic'];
  const extensions = ['Suspended 2', 'Suspended 4', 'Extended 7', 'Extended 9', 'Extended 11', 'Extended 13'];

  const handleNoteClick = (string, fret) => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/${string}_${fret}.wav`);
    audio.play().catch((error) => {
      console.error(`Error playing sound: ${error}`);
    });
  };

  const addToPlaylist = () => {
    if (rootNote && category && scaleType) {
      const newEntry = `${rootNote} ${category} ${scaleType}${bluesPentatonicType ? ` (${bluesPentatonicType})` : ''}${extensionType ? ` (${extensionType})` : ''}`;
      if (!playlist.includes(newEntry)) {
        setPlaylist((prevPlaylist) => [...prevPlaylist, newEntry]);
      }
    }
  };

  const handlePlaylistClick = (entry) => {
    const regex = /^([A-G]#?)\s+(Scale|Chord)\s+(\w+)(?:\s+\(([^)]+)\))?(?:\s+\(([^)]+)\))?$/;
    const match = entry.match(regex);
    if (match) {
      const [, root, cat, scale, bluesPentatonic, extension] = match;
      setRootNote(root);
      setCategory(cat);
      setScaleType(scale);
      setBluesPentatonicType(bluesPentatonic || '');
      setExtensionType(extension || '');
    }
  };

  const playPlaylist = () => {
    if (playlist.length === 0) return;

    let currentIndex = 0;
    const playNext = () => {
      if (currentIndex >= playlist.length) {
        return;
      }
      const regex = /^([A-G]#?)\s+(Scale|Chord)\s+(\w+)(?:\s+\(([^)]+)\))?(?:\s+\(([^)]+)\))?$/;
      const match = playlist[currentIndex].match(regex);
      if (match) {
        const [, root] = match;
        const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/${root}.wav`);
        audio.addEventListener('ended', () => {
          currentIndex++;
          playNext();
        });
        audio.play().catch((error) => {
          console.error(`Error playing sound: ${error}`);
          currentIndex++;
          playNext();
        });
      } else {
        currentIndex++;
        playNext();
      }
    };
    playNext();
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        {showMetronome && <div className="metronome-header">
          <Metronome />
        </div>}
        <button onClick={() => setShowMetronome(!showMetronome)}>{showMetronome ? 'Hide Metronome' : 'Show Metronome'}</button>
        <h1>Dynamic Fretboard Visualizer</h1>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="ChordScales Logo" className="logo" />
        <p>Select a root note and scale/chord to visualize on the fretboard</p>
        <div style={{ display: 'inline-block' }}>
          <label htmlFor="theme-select" style={{ marginRight: '10px' }}>Themes:</label>
          <select id="theme-select" onChange={(e) => changeTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="coolBlues">Cool Blues</option>
            <option value="warmSunset">Warm Sunset</option>
            <option value="nightOwl">Night Owl</option>
          </select>
        </div>
        <Login />
      </header>

      <div className="selection-container">
        <label htmlFor="root-note">Root Note: </label>
        <select id="root-note" value={rootNote} onChange={(e) => setRootNote(e.target.value)}>
          {rootNotes.map((note) => (
            <option key={note} value={note}>{note}</option>
          ))}
        </select>

        <label htmlFor="category">Scale or Chord: </label>
        <select id="category" value={category} onChange={(e) => { setCategory(e.target.value); setScaleType(''); setExtensionType(''); setBluesPentatonicType(''); }}>
          <option value="">Select...</option>
          <option value="Scale">Scale</option>
          <option value="Chord">Chord</option>
        </select>

        {category && (
          <>
            <label htmlFor="scale-type">{category} Type: </label>
            <select id="scale-type" value={scaleType} onChange={(e) => setScaleType(e.target.value)}>
              <option value="">Select...</option>
              {(category === 'Scale' ? scaleOptions : chordOptions).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </>
        )}

        {category === 'Scale' && scaleType && (
          <>
            <label htmlFor="blues-pentatonic-type">Blues or Pentatonic: </label>
            <select id="blues-pentatonic-type" value={bluesPentatonicType} onChange={(e) => setBluesPentatonicType(e.target.value)}>
              <option value="">None</option>
              {bluesPentatonicOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </>
        )}

        {category === 'Chord' && scaleType && (
          <>
            <label htmlFor="extension-type">Extension: </label>
            <select id="extension-type" value={extensionType} onChange={(e) => setExtensionType(e.target.value)}>
              <option value="">None</option>
              {extensions.map((extension) => (
                <option key={extension} value={extension}>{extension}</option>
              ))}
            </select>
          </>
        )}

        <button onClick={addToPlaylist}>Add to Playlist</button>
      </div>

      <div className="fretboard-container">
        <Fretboard 
          rootNote={rootNote} 
          scaleType={scaleType} 
          setHoveredNote={setHoveredNote}
          handleNoteClick={handleNoteClick}
        />
      </div>

      <ScaleInfoSidebar scaleType={scaleType} />

      <div className="hovered-info-container">
        <div className="hovered-info" style={{ visibility: hoveredNote ? 'visible' : 'hidden', height: '40px' }}>
          <p>Hovered Note: {hoveredNote ? `${hoveredNote.note} (String: ${hoveredNote.string}, Fret: ${hoveredNote.fret})` : ''}</p>
        </div>
      </div>

      <div className="playlist-container">
        <h3>Playlist</h3>
        <button onClick={playPlaylist} className="play-playlist-button">Play Playlist</button>
        <button onClick={clearPlaylist} className="clear-playlist-button">Clear Playlist</button>
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

export default () => (
    <ThemeProvider>
        <App />
    </ThemeProvider>
);

