import pygame
import numpy as np

# Initialize the mixer with mono settings
pygame.mixer.pre_init(channels=1)
pygame.mixer.init()

# Define fretboard frequencies with string numbers
fretboard_frequencies = [
    {'E2_6': 82.41, 'F2_6': 87.31, 'F#2_6': 92.50, 'G2_6': 98.00, 'G#2_6': 103.83, 'A2_6': 110.00, 'A#2_6': 116.54, 'B2_6': 123.47, 'C3_6': 130.81, 'C#3_6': 138.59, 'D3_6': 146.83, 'D#3_6': 155.56, 'E3_6': 164.81},  # 6th string (E)
    {'A2_5': 110.00, 'A#2_5': 116.54, 'B2_5': 123.47, 'C3_5': 130.81, 'C#3_5': 138.59, 'D3_5': 146.83, 'D#3_5': 155.56, 'E3_5': 164.81, 'F3_5': 174.61, 'F#3_5': 185.00, 'G3_5': 196.00, 'G#3_5': 207.65, 'A3_5': 220.00},  # 5th string (A)
    {'D3_4': 146.83, 'D#3_4': 155.56, 'E3_4': 164.81, 'F3_4': 174.61, 'F#3_4': 185.00, 'G3_4': 196.00, 'G#3_4': 207.65, 'A3_4': 220.00, 'A#3_4': 233.08, 'B3_4': 246.94, 'C4_4': 261.63, 'C#4_4': 277.18, 'D4_4': 293.66},  # 4th string (D)
    {'G3_3': 196.00, 'G#3_3': 207.65, 'A3_3': 220.00, 'A#3_3': 233.08, 'B3_3': 246.94, 'C4_3': 261.63, 'C#4_3': 277.18, 'D4_3': 293.66, 'D#4_3': 311.13, 'E4_3': 329.63, 'F4_3': 349.23, 'F#4_3': 369.99, 'G4_3': 392.00},  # 3rd string (G)
    {'B3_2': 246.94, 'C4_2': 261.63, 'C#4_2': 277.18, 'D4_2': 293.66, 'D#4_2': 311.13, 'E4_2': 329.63, 'F4_2': 349.23, 'F#4_2': 369.99, 'G4_2': 392.00, 'G#4_2': 415.30, 'A4_2': 440.00, 'A#4_2': 466.16, 'B4_2': 493.88},  # 2nd string (B)
    {'E4_1': 329.63, 'F4_1': 349.23, 'F#4_1': 369.99, 'G4_1': 392.00, 'G#4_1': 415.30, 'A4_1': 440.00, 'A#4_1': 466.16, 'B4_1': 493.88, 'C5_1': 523.25, 'C#5_1': 554.37, 'D5_1': 587.33, 'D#5_1': 622.25, 'E5_1': 659.25}   # 1st string (e)
]

def generate_sine_wave(frequency, duration, sample_rate=44100, amplitude=4096):
    t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
    wave = amplitude * np.sin(2 * np.pi * frequency * t)
    return wave

def generate_chord_sound(chord, duration=1.0):
    sample_rate = 44100
    chord_sound = np.zeros(int(sample_rate * duration))
    
    for string in fretboard_frequencies:
        for note, frequency in string.items():
            if note in chord:
                sine_wave = generate_sine_wave(frequency, duration)
                chord_sound += sine_wave
    
    chord_sound = np.clip(chord_sound, -32767, 32767)
    chord_sound = chord_sound.astype(np.int16)
    # Convert to stereo
    chord_sound = np.repeat(chord_sound.reshape(-1, 1), 2, axis=1)
    return chord_sound

def play_sound(sound_array):
    if sound_array is not None and len(sound_array) > 0:
        sound = pygame.sndarray.make_sound(sound_array)
        sound.play()
        pygame.time.wait(int(sound.get_length() * 1000))

# Test playing a simple sound
simple_sound = generate_sine_wave(440.00, 1.0)  # A4 note
simple_sound = np.clip(simple_sound, -32767, 32767).astype(np.int16)
simple_sound = np.repeat(simple_sound.reshape(-1, 1), 2, axis=1)
play_sound(simple_sound)

user_input = input("Enter the notes with string numbers (e.g., C3_6 E4_1 for C3 on 6th string and E4 on 1st string): ")
notes = user_input.split()  # Split input by spaces

for note in notes:
    note_sound = generate_chord_sound(note)
    play_sound(note_sound)
    pygame.time.wait(100)
