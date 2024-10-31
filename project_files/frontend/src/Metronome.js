import React, { useState, useEffect, useRef } from 'react';

const Metronome = () => {
    const [bpm, setBpm] = useState(100); // Default BPM
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatActive, setBeatActive] = useState(false);
    const [timeSignature, setTimeSignature] = useState('4/4');
    const [accents, setAccents] = useState(new Array(4).fill(false));
    const timerRef = useRef(null);
    const audioContextRef = useRef(null);
    const beatCountRef = useRef(0);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
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
        playClickSound();
        const interval = (60 / bpm) * 1000;
        timerRef.current = setInterval(() => {
            incrementBeat();
            playClickSound();
        }, interval);
    };

    const incrementBeat = () => {
        const beatsPerMeasure = parseInt(timeSignature.split('/')[0]);
        beatCountRef.current = (beatCountRef.current + 1) % beatsPerMeasure;
    };

    const playClickSound = () => {
        const audioCtx = audioContextRef.current;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const isAccent = accents[beatCountRef.current];
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(isAccent ? 1200 : 880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.05);

        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        setBeatActive(true);
        setTimeout(() => setBeatActive(false), 100);
    };

    const stopMetronome = () => {
        setIsPlaying(false);
        clearInterval(timerRef.current);
        beatCountRef.current = 0;
    };

    const toggleMetronome = () => {
        if (isPlaying) {
            stopMetronome();
        } else {
            startMetronome();
        }
    };

    const handleBpmChange = (e) => {
        const newBpm = Number(e.target.value);
        setBpm(newBpm);
        if (isPlaying) {
            stopMetronome();
            startMetronome();
        }
    };

    const handleTimeSignatureChange = (e) => {
        setTimeSignature(e.target.value);
        setAccents(new Array(parseInt(e.target.value.split('/')[0])).fill(false));
        if (isPlaying) {
            stopMetronome();
            startMetronome();
        }
    };

    const handleAccentChange = (index) => {
        const updatedAccents = [...accents];
        updatedAccents[index] = !updatedAccents[index];
        setAccents(updatedAccents);
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
            <label htmlFor="time-signature">Time Signature:</label>
            <select id="time-signature" value={timeSignature} onChange={handleTimeSignatureChange}>
                <option value="2/4">2/4</option>
                <option value="3/4">3/4</option>
                <option value="4/4">4/4</option>
                <option value="6/8">6/8</option>
            </select>
            <div>
                {accents.map((accent, index) => (
                    <input
                        key={index}
                        type="checkbox"
                        checked={accent}
                        onChange={() => handleAccentChange(index)}
                    />
                ))}
            </div>
            <div className={`beat-indicator ${beatActive ? 'active' : ''}`}></div>
        </div>
    );
};

export default Metronome;