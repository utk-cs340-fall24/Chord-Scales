#include <vector>
#include <iostream>

using namespace std;

int main(int argc, char *argv[]){
    //each vector will contain 12 notes (the first twelve frets) the first being the open string
    vector<string> E_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};
    vector<string> A_string = {"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"};
    vector<string> D_string = {"D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"};
    vector<string> G_string = {"G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"};
    vector<string> B_string = {"B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"};
    vector<string> e_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};

    cout << "Scale or Chord?" <<endl;

    string scaleChord;
    cin >> scaleChord;

    string quality;

    if(scaleChord == "Chord"){
        cout << "Major, Minor, Diminished, Augmented?" << endl;

        cin >> quality;
    }

    bool pentatonic;
    if(scaleChord == "Scale"){
        cout << "Pentatonic? (0/1)" << endl;
        cin >> pentatonic;

        cout << "Mode: Ionian(Major), Dorian, Phrygian, Lydian, Mixolydian, Aeolian(Minor), Locrian(Diminished)" << endl;
    }

    cout << "Enter root note" << endl;
    
    string rootNote;
    cin >> rootNote;

    vector<string> OurScale(7);

    int extended = 0;
    if(scaleChord == "Chord"){
        cout << "Extended Chord? (0 (if no), 7, 9, 11, 13)" << endl;
        cin >> extended;
    }

    int indexOfNote = 100;

    //making sure the note we were given exists
    for(int i = 0; i < A_string.size(); i++){
        if(A_string[i] == rootNote){
            indexOfNote = i;
        }
    }
    if(indexOfNote == 100){
        cerr << "Note not found" << endl;
        return 0;
    }

    indexOfNote % A_string.size();

    //Creating our scale, starting at the root note we were given
    //If major we use the pattern WWHWWWH
    //If minor we use the pattern WHWWHWW where a whole step is +2 and a half step is +1

    //modes definitely don't work quite right yet
    if(quality == "Major" || quality == "Ionian" || quality == "Lydian" || quality == "Mixolydian"){
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        if(pentatonic == 0){
            OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        }if(quality == "Lydian"){
            OurScale[3] = A_string[(indexOfNote + 6) % A_string.size()];
        }else{
            OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        }
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 9) % A_string.size()];
        if(pentatonic == 0){
            OurScale[6] = A_string[(indexOfNote + 11) % A_string.size()];
        }if(quality == "Mixolydian"){
             OurScale[6] = A_string[(indexOfNote + 1) % A_string.size()];
        }
    }if(quality == "Minor"){
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        if(pentatonic == 0){
            OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        }
        OurScale[2] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        if(pentatonic == 0){
            OurScale[5] = A_string[(indexOfNote + 8) % A_string.size()];
        }
        OurScale[6] = A_string[(indexOfNote + 10) % A_string.size()];
    }if(quality == "Augmented"){
         OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 11) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 12) % A_string.size()];
    }if(quality == "Diminished"){
        //diminished scale doesn't include all notes
        //don't know that we need to change this as diminished scales are not normal
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 6) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 9) % A_string.size()];
    }

    //if chord we add the first, third and fifth notes of the scale we have just created to a vector and output

    vector<string> final;
    if(scaleChord == "Scale"){
        for(int i = 0; i < OurScale.size(); i++){
            cout << OurScale.at(i) << " ";
        }
        cout << endl;
        final = OurScale;
    }if(scaleChord == "Chord"){

        final.push_back(OurScale.at(0));
        final.push_back(OurScale.at(2));
        final.push_back(OurScale.at(4));

        if(extended != 0){
            if(extended >= 7){
                final.push_back(OurScale.at((6) % OurScale.size()));
            }if(extended >= 9){
                final.push_back(OurScale.at((8) % OurScale.size()));
            }if(extended >= 11){
                final.push_back(OurScale.at((10) % OurScale.size()));
            }if(extended >= 13){
                final.push_back(OurScale.at((12) % OurScale.size()));
            }
        }

        for(int i = 0; i < final.size(); i++){
            cout << final.at(i) << " ";
        }
        cout << endl;
    }

    //As of this point I have the chord and scale generation done for most common cases, major/minor/diminished/augmented chords/scales
    //Because of this I want to try and translate these chords/scales to their fretboard positions.
    //Below I take a chord/scale and output the fret of each note within it

}