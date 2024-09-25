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

    cout << "Major or Minor?" << endl;

    string quality;
    cin >> quality;

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
    if(quality == "Major"){
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 9) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 11) % A_string.size()];
    }if(quality == "Minor"){
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 10) % A_string.size()];
    }

    //if chord we add the first, third and fifth notes of the scale we have just created to a vector and output
    if(scaleChord == "Scale"){
        for(int i = 0; i < OurScale.size(); i++){
            cout << OurScale.at(i) << " ";
        }
        cout << endl;
    }if(scaleChord == "Chord"){
        vector<string> chord;
        chord.push_back(OurScale.at(0));
        chord.push_back(OurScale.at(2));
        chord.push_back(OurScale.at(4));
        
        //need to redo extended chords 
        //if(extended == 7 || extended == 9 || extended == 11 || extended == 13){
         //   for(int i = 6; i < extended; i += 2){ 
         //       chord.push_back(OurScale.at(i % OurScale.size()));
        //    }
      //  }

        for(int i = 0; i < chord.size(); i++){
            cout << chord.at(i) << " ";
        }
        cout << endl;
    }


}