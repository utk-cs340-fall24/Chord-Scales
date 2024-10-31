// Metronome.js

import React, { useState, useEffect, useRef } from 'react';

const Metronome = () => {
  const [bpm, setBpm] = useState(100); // Default BPM
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatActive, setBeatActive] = useState(false);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Cleanup function
    return () => {
      stopMetronome();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startMetronome = () => {
    if (isPlaying) return;

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    setIsPlaying(true);
    playClickSound(); // Play the first click immediately

    const interval = (60 / bpm) * 1000; // Calculate interval in milliseconds
    timerRef.current = setInterval(() => {
      playClickSound();
    }, interval);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  const playClickSound = () => {
    const audioCtx = audioContextRef.current;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.05); 

    // Fade out the sound
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    // Toggle beat indicator
    setBeatActive(true);
    setTimeout(() => setBeatActive(false), 100); 
  };

  const handleBpmChange = (e) => {
    const newBpm = Number(e.target.value);
    setBpm(newBpm);

    if (isPlaying) {
      stopMetronome();
      startMetronome();
    }
  };

  return (
    <div className="metronome-container">
      <h3>Metronome</h3>
      <div className="metronome-controls">
        <label htmlFor="bpm">BPM:</label>
        <input
          type="number"
          id="bpm"
          value={bpm}
          onChange={handleBpmChange}
          min="40"
          max="240"
        />
        <button onClick={toggleMetronome}>
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
      <div
        className={`beat-indicator ${beatActive ? 'active' : ''}`}
      ></div>
    </div>
  );
};

export default Metronome;