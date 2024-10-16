#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

int main(int argc, char *argv[]){
    //each vector will contain 12 notes (the first twelve frets) the first being the open string
    vector<string> E_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};
    vector<string> A_string = {"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"};
    vector<string> D_string = {"D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"};
    vector<string> G_string = {"G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"};
    vector<string> B_string = {"B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"};
    vector<string> e_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};
    vector<vector<string>> strings = {E_string, A_string, D_string, G_string, B_string, e_string};

    cout << "Scale or Chord?" <<endl;

    string scaleChord;
    cin >> scaleChord;

    string quality;
    int sus;

    if(scaleChord == "Chord"){
        cout << "Major, Minor, Diminished, Augmented?" << endl;

        cin >> quality;

        cout << "Suspended chord? (0), 2, 4" << endl;
        
        cin >> sus;
    }

    bool blues;
    bool pentatonic;
    if(scaleChord == "Scale"){
        cout << "Blues scale? (0/1)" << endl;
        cin >> blues;

        if(blues == 0){
            cout << "Pentatonic? (0/1)" << endl;
            cin >> pentatonic;

            cout << "Mode: Ionian(Major), Dorian, Phrygian, Lydian, Mixolydian, Aeolian(Minor), Locrian(Diminished)" << endl;
            cin >> quality;
        }else{
            pentatonic = true;
        }

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
            if(quality == "Lydian"){
                OurScale[3] = A_string[(indexOfNote + 6) % A_string.size()];
            }else{
                OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
            }
        }
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 9) % A_string.size()];
        if(pentatonic == 0){
            if(quality == "Mixolydian"){
                OurScale[6] = A_string[(indexOfNote + 1) % A_string.size()];
            }else{
                OurScale[6] = A_string[(indexOfNote + 11) % A_string.size()];
            }
        }
    }if(quality == "Minor" || quality == "Dorian" || quality == "Phrygian" || quality == "Aeolian" || blues == 1){
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        if(pentatonic == 0){
            if(quality == "Dorian"){
                OurScale.push_back(A_string[(indexOfNote + 1) % A_string.size()]);
            }else{
                OurScale.push_back(A_string[(indexOfNote + 2) % A_string.size()]);
            }
        }
        OurScale.push_back(A_string[(indexOfNote + 3) % A_string.size()]);
        OurScale.push_back(A_string[(indexOfNote + 5) % A_string.size()]);
        if(blues == true){
            OurScale.push_back(A_string[(indexOfNote + 6) % A_string.size()]);
        }
        OurScale.push_back(A_string[(indexOfNote + 7) % A_string.size()]);
        if(pentatonic == 0){
            if(quality == "Dorian"){
                OurScale.push_back(A_string[(indexOfNote + 9) % A_string.size()]);
            }else{
                OurScale.push_back(A_string[(indexOfNote + 8) % A_string.size()]);
            }
        } 
        OurScale.push_back(A_string[(indexOfNote + 10) % A_string.size()]);
    }if(quality == "Augmented"){
         OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 11) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 12) % A_string.size()];
    }if(quality == "Diminished" || quality == "Locrian"){
        //diminished scale doesn't include all notes
        //don't know that we need to change this as diminished scales are not normal
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 1) % A_string.size()];
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
        if(sus == 2){
            final.push_back(OurScale.at(1));
        }if(sus == 4){
            final.push_back(OurScale.at(3));
        }if(sus == 0){
            final.push_back(OurScale.at(2));
        }
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

    vector<int> E_final;
    vector<int> A_final;
    vector<int> D_final;
    vector<int> G_final;
    vector<int> B_final;
    vector<int> e_final;
    vector<vector<int>> chord_scale = {E_final, A_final, D_final, G_final, B_final, e_final};

    for(int i = 0; i < final.size(); i++){
        for(int s = 0; s < E_string.size(); s++){
            if(final.at(i) == e_string.at(s)){
                e_final.push_back(s);
            }
            if(final.at(i) == B_string.at(s)){
                B_final.push_back(s);
            }
            if(final.at(i) == G_string.at(s)){
                G_final.push_back(s);
            }
            if(final.at(i) == D_string.at(s)){
                D_final.push_back(s);
            }
            if(final.at(i) == A_string.at(s)){
                A_final.push_back(s);
            }
            if(final.at(i) == E_string.at(s)){
                E_final.push_back(s);
            }
        }
    }

    sort(e_final.begin(), e_final.end());
    sort(B_final.begin(), B_final.end());
    sort(G_final.begin(), G_final.end());
    sort(D_final.begin(), D_final.end());
    sort(A_final.begin(), A_final.end());
    sort(E_final.begin(), E_final.end());

    vector<vector<int>> vectorList;
    bool first = false;
    bool third = false;
    bool fifth = false;
    for (int i = 0; i < chord_scale[0].size(); i++) { 
        for (int j = 0; j < chord_scale[1].size(); j++) { 
            for (int k = 0; k < chord_scale[2].size(); k++) { 
                for (int l = 0; l < chord_scale[3].size(); l++) { 
                    for (int m = 0; m < chord_scale[4].size(); m++) { 
                        for (int n = 0; n < chord_scale[5].size(); n++) { 

                            std::vector<int> combination;

                            combination.push_back(chord_scale[0][i]); 
                            combination.push_back(chord_scale[0][j]); 
                            combination.push_back(chord_scale[1][k]); 
                            combination.push_back(chord_scale[1][l]); 
                            combination.push_back(chord_scale[2][m]); 
                            combination.push_back(chord_scale[2][n]); 

                            for(int x = 0; x < combination.size(); x++){
                                if(combination.at(i) == final.at(0)){
                                    first = true;
                                }
                            }

                            vectorList.push_back(combination);
                        }
                    }
                }
            }
        }
    }
}