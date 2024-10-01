#define MINIAUDIO_IMPLEMENTATION
#include "miniaudio.h"
#include <iostream>
#include <vector>
#include <thread>
#include <unordered_map>
#include <filesystem>

using namespace std;
namespace fs = std::filesystem;

const double duration = 0.8; // Duration for each note in seconds

// Define the structure of the fretboard
vector<vector<string>> fretboard_files(6, vector<string>(12));

// Map string numbers to string labels (E, A, D, G, B, e)
unordered_map<int, string> stringLabels = {
    {0, "E"}, // 6th string (E)
    {1, "A"}, // 5th string (A)
    {2, "D"}, // 4th string (D)
    {3, "G"}, // 3rd string (G)
    {4, "B"}, // 2nd string (B)
    {5, "e"}  // 1st string (e)
};

// Function to map the folder's .wav files to the correct fretboard positions
void loadWavFiles(const string& folderPath) {
    for (const auto& entry : fs::directory_iterator(folderPath)) {
        if (entry.is_regular_file() && entry.path().extension() == ".wav") {
            string filename = entry.path().filename().string();

            // Extract the string label and fret number from the file name (e.g., "E_0.wav" or "e_0.wav")
            char stringLabel[3];
            int fretNum;
            if (sscanf(filename.c_str(), "%2[^_]_%d.wav", stringLabel, &fretNum) == 2) {
                // Find the corresponding string number
                int stringNum = -1;
                for (const auto& [key, label] : stringLabels) {
                    if (label == stringLabel) {
                        stringNum = key;
                        break;
                    }
                }

                // Ensure the string number and fret number are valid
                if (stringNum >= 0 && fretNum >= 0 && fretNum < 12) {
                    fretboard_files[stringNum][fretNum] = entry.path().string();
                }
            }
        }
    }
}

// Play a .wav file
void playWavFile(const string& filename) {
    ma_result result;
    ma_device_config deviceConfig;
    ma_device device;
    ma_sound sound;
    ma_engine engine;

    result = ma_engine_init(NULL, &engine);
    if (result != MA_SUCCESS) {
        cerr << "Failed to initialize MiniAudio engine." << endl;
        return;
    }

    result = ma_sound_init_from_file(&engine, filename.c_str(), 0, NULL, NULL, &sound);
    if (result != MA_SUCCESS) {
        cerr << "Failed to load sound file: " << filename << endl;
        ma_engine_uninit(&engine);
        return;
    }

    ma_sound_start(&sound);
    this_thread::sleep_for(chrono::milliseconds(static_cast<int>(1000 * duration)));
    ma_sound_stop(&sound);

    ma_sound_uninit(&sound);
    ma_engine_uninit(&engine);
}

// Play a single note for a given duration using the .wav file
void playSingleNoteWav(int stringNum, int fretNum) {
    string filePath = fretboard_files[stringNum][fretNum];
    if (!filePath.empty()) {
        playWavFile(filePath);
    } else {
        cerr << "No .wav file found for string " << stringLabels[stringNum] << " fret " << fretNum << endl;
    }
}

// Play notes as a scale or chord
void playNotesWav(const vector<pair<int, int>>& notes, bool isChord) {
    if (isChord) {
        // Play all notes together (chord)
        vector<thread> threads;
        for (const auto& note : notes) {
            threads.push_back(thread(playSingleNoteWav, note.first, note.second));
        }
        for (auto& t : threads) {
            if (t.joinable()) t.join();
        }
    } else {
        // Play each note in sequence (scale)
        for (const auto& note : notes) {
            playSingleNoteWav(note.first, note.second);
        }
    }
}

int main() {
    string folderPath = std::filesystem::path;

    loadWavFiles(folderPath);

    while (true) {
        vector<pair<int, int>> selectedNotes;
        cout << "Enter the string number (0 to 5) and fret number (0 to 11) separated by a space (e.g., '0 0'). Type 'done' when finished:" << endl;
        
        string input;
        while (true) {
            cin >> input;
            if (input == "done") break;

            int stringNum = stoi(input);
            int fretNum;
            cin >> fretNum;

            if (stringNum >= 0 && stringNum < 6 && fretNum >= 0 && fretNum < 12) {
                selectedNotes.push_back({stringNum, fretNum});
            } else {
                cout << "Invalid input, try again." << endl;
            }
        }

        string playMode;
        cout << "Do you want to play as a 'chord' or 'scale'? ";
        cin >> playMode;

        bool isChord = (playMode == "chord");
        playNotesWav(selectedNotes, isChord);

        string repeat;
        cout << "Do you want to play another sequence? (yes/no): ";
        cin >> repeat;
        if (repeat == "no") break;
    }

    return 0;
}
