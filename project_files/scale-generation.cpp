#include <vector>
#include <iostream>
#include <algorithm>
#include <set>
#include <unordered_map>

using namespace std;

string scaleChord;
int extended = 0;
int sus = 0;

bool valid_chord(const vector<pair<int, int>> &current_chord, const vector<vector<string>> strings, vector<string> final, string quality)
{
    bool first = false;
    bool third = false;
    bool fifth = false;
    bool seventh = false;
    bool ninth = false;
    bool eleventh = false;
    bool thirteenth = false;
    bool playable = true;
    int min_val = 1000;
    int max_val = 0;

    vector<pair<pair<int, int>, int>> perms;

    for (const auto &note : current_chord)
    {

        for (int i = 0; i < final.size(); i++)
        {
            // cout << current_chord.size() << endl;
            // cout << strings[note.first][note.second] << " == " << final.at(i) << endl;
            if (strings[note.first][note.second] == final.at(i))
            {
                perms.push_back({note, i});
                if (i == 0)
                {
                    first = true;
                }
                if (i == 1)
                {
                    third = true;
                }
                if (i == 2)
                {
                    fifth = true;
                }
                if (i == 3)
                {
                    seventh = true;
                }
                if (i == 4)
                {
                    ninth = true;
                }
                if (i == 5)
                {
                    eleventh = true;
                }
                if (i == 6)
                {
                    thirteenth = true;
                }
            }

            if (note.second > max_val && note.second != 0)
            {
                max_val = note.second;
            }
            if (note.second < min_val && note.second != 0)
            {
                min_val = note.second;
            }
        }
    }
    if ((max_val - min_val) > 2)
    {
        return false;
    }

    if (seventh = true)
    {
        return first && third && fifth && seventh;
    }
    if (ninth = true)
    {
        return first && third && fifth && seventh && ninth;
    }
    if (eleventh = true)
    {
        return first && third && fifth && seventh && ninth && eleventh;
    }
    if (thirteenth = true)
    {
        return first && third && fifth && seventh && ninth && thirteenth;
    }
    else
    {
        return first && third && fifth;
    }
}

bool valid_scale(const vector<pair<int, int>> &current_chord, const vector<vector<string>> strings, vector<string> final, string quality)
{
    vector<int> bools(12, 0);
    int max_val = 1000;
    int min_val = 0;
    for (const auto &note : current_chord)
    {
        for (int i = 0; i < final.size(); i++)
        {
            if (strings[note.first][note.second] == final.at(i))
            {
                bools.at(i) = 1;
            }

            if (note.second > max_val)
            {
                max_val = note.second;
            }
            if (note.second < min_val)
            {
                min_val = note.second;
            }
        }
    }

    if ((max_val - min_val) > 3)
    {
        return false;
    }

    for (int i = 0; i < bools.size(); i++)
    {
        cout << bools.at(i) << endl;
    }
}

bool isDuplicate(const auto &current_chord, const auto &valid_chords)
{
    return any_of(valid_chords.begin(), valid_chords.end(),
                  [&current_chord](const auto &chord)
                  {
                      return chord == current_chord;
                  });
}

void Scale_gen(vector<vector<pair<int, int>>> &chord_scale, vector<pair<int, int>> &current_chord, vector<vector<pair<int, int>>> &valid_scale, const vector<vector<string>> strings, vector<string> final)
{
    for (int i = 0; i < 10; i++)
    {
        int lowest = 0;
        int string = 0;
        // iterates each string
        for (const auto &new_note : chord_scale)
        {
            for (int q = 0; q < chord_scale[0].size(); q++)
            {
                // push to temp scale vector if valid note
                if (chord_scale[string][q].second > (lowest + 3))
                {
                    continue;
                }
                else
                {
                    current_chord.push_back(chord_scale[string][q]);
                }
            }
            string++;
        }
        // push to actual finished scale vector, i.e. valid scale
        valid_scale.push_back(current_chord);
        current_chord.clear();
        lowest++;
    }
}

void Chord_gen(vector<vector<pair<int, int>>> &chord_scale, vector<pair<int, int>> &current_chord, int index, vector<vector<pair<int, int>>> &valid_chords, const vector<vector<string>> strings, vector<string> final, string quality)
{
    int x = 0;
    if (index == chord_scale.size())
    {
        // Output the current chord combination
        if (scaleChord == "Chord")
        {
            if (valid_chord(current_chord, strings, final, quality) == true)
            {
                for (const auto &note : current_chord)
                {
                    // omits the 11th (or maybe 9th) in case of 13th chord
                    if (extended == 13 && x == 4)
                    {
                        x++;
                        continue;
                    }

                    x++;
                    if (!isDuplicate(current_chord, valid_chords))
                    {
                        valid_chords.push_back(current_chord);
                    }
                }
            }
        }

        return;
    }

    for (int i = 0; i < chord_scale[index].size(); i++)
    {
        current_chord.push_back(chord_scale[index][i]);
        Chord_gen(chord_scale, current_chord, index + 1, valid_chords, strings, final, quality);
        current_chord.pop_back();
    }
}

int main(int argc, char *argv[])
{
    // each vector will contain 12 notes (the first twelve frets) the first being the open string
    vector<string> E_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};
    vector<string> A_string = {"A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"};
    vector<string> D_string = {"D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"};
    vector<string> G_string = {"G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"};
    vector<string> B_string = {"B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"};
    vector<string> e_string = {"E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"};
    vector<vector<string>> strings = {E_string, A_string, D_string, G_string, B_string, e_string};

    cout << "Scale or Chord?" << endl;

    cin >> scaleChord;

    string quality;

    if (scaleChord == "Chord")
    {
        cout << "Major, Minor, Diminished, Augmented?" << endl;

        cin >> quality;

        cout << "Suspended chord? (0), 2, 4" << endl;

        cin >> sus;
    }

    bool blues = 0;
    bool pentatonic;
    if (scaleChord == "Scale")
    {
        cout << "Blues scale? (0/1)" << endl;
        cin >> blues;

        if (blues == 0)
        {
            cout << "Pentatonic? (0/1)" << endl;
            cin >> pentatonic;

            cout << "Mode: Ionian(Major), Dorian, Phrygian, Lydian, Mixolydian, Aeolian(Minor), Locrian(Diminished)" << endl;
            cin >> quality;
        }
        else
        {
            pentatonic = true;
        }
    }

    cout << "Enter root note" << endl;

    string rootNote;
    cin >> rootNote;

    vector<string> OurScale(7);

    if (scaleChord == "Chord")
    {
        cout << "Extended Chord? (0 (if no), 7, 9, 11, 13)" << endl;
        cin >> extended;
    }

    int indexOfNote = 100;

    // making sure the note we were given exists
    for (int i = 0; i < A_string.size(); i++)
    {
        if (A_string[i] == rootNote)
        {
            indexOfNote = i;
        }
    }
    if (indexOfNote == 100)
    {
        cerr << "Note not found" << endl;
        return 0;
    }

    indexOfNote % A_string.size();

    // Creating our scale, starting at the root note we were given
    // If major we use the pattern WWHWWWH
    // If minor we use the pattern WHWWHWW where a whole step is +2 and a half step is +1

    // modes definitely don't work quite right yet
    if (quality == "Major" || quality == "Ionian" || quality == "Lydian" || quality == "Mixolydian")
    {
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 2) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        if (pentatonic == 0)
        {
            if (quality == "Lydian")
            {
                OurScale[3] = A_string[(indexOfNote + 6) % A_string.size()];
            }
            else
            {
                OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
            }
        }
        OurScale[4] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 9) % A_string.size()];
        if (pentatonic == 0)
        {
            if (quality == "Mixolydian")
            {
                OurScale[6] = A_string[(indexOfNote + 1) % A_string.size()];
            }
            else
            {
                OurScale[6] = A_string[(indexOfNote + 11) % A_string.size()];
            }
        }
    }
    if (quality == "Minor" || quality == "Dorian" || quality == "Phrygian" || quality == "Aeolian" || blues == 1)
    {
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        if (pentatonic == 0)
        {
            if (quality == "Dorian")
            {
                OurScale.push_back(A_string[(indexOfNote + 1) % A_string.size()]);
            }
            else
            {
                OurScale.push_back(A_string[(indexOfNote + 2) % A_string.size()]);
            }
        }
        OurScale.push_back(A_string[(indexOfNote + 3) % A_string.size()]);
        OurScale.push_back(A_string[(indexOfNote + 5) % A_string.size()]);
        if (blues == true)
        {
            OurScale.push_back(A_string[(indexOfNote + 6) % A_string.size()]);
        }
        OurScale.push_back(A_string[(indexOfNote + 7) % A_string.size()]);
        if (pentatonic == 0)
        {
            if (quality == "Dorian")
            {
                OurScale.push_back(A_string[(indexOfNote + 9) % A_string.size()]);
            }
            else
            {
                OurScale.push_back(A_string[(indexOfNote + 8) % A_string.size()]);
            }
        }
        OurScale.push_back(A_string[(indexOfNote + 10) % A_string.size()]);
    }
    if (quality == "Augmented")
    {
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 4) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 7) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 11) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 12) % A_string.size()];
    }
    if (quality == "Diminished" || quality == "Locrian")
    {
        // diminished scale doesn't include all notes
        // don't know that we need to change this as diminished scales are not normal
        OurScale[0] = A_string[indexOfNote % A_string.size()];
        OurScale[1] = A_string[(indexOfNote + 1) % A_string.size()];
        OurScale[2] = A_string[(indexOfNote + 3) % A_string.size()];
        OurScale[3] = A_string[(indexOfNote + 5) % A_string.size()];
        OurScale[4] = A_string[(indexOfNote + 6) % A_string.size()];
        OurScale[5] = A_string[(indexOfNote + 8) % A_string.size()];
        OurScale[6] = A_string[(indexOfNote + 9) % A_string.size()];
    }

    // if chord we add the first, third and fifth notes of the scale we have just created to a vector and output

    vector<string> final;
    if (scaleChord == "Scale")
    {
        for (int i = 0; i < OurScale.size(); i++)
        {
            cout << OurScale.at(i) << " ";
        }
        cout << endl;
        final = OurScale;
    }
    if (scaleChord == "Chord")
    {

        final.push_back(OurScale.at(0));
        if (sus == 2)
        {
            final.push_back(OurScale.at(1));
        }
        if (sus == 4)
        {
            final.push_back(OurScale.at(3));
        }
        if (sus == 0)
        {
            final.push_back(OurScale.at(2));
        }
        final.push_back(OurScale.at(4));

        if (extended != 0)
        {
            if (extended >= 7)
            {
                final.push_back(OurScale.at((6) % OurScale.size()));
            }
            if (extended >= 9)
            {
                final.push_back(OurScale.at((8) % OurScale.size()));
            }
            if (extended >= 11 && extended != 13)
            {
                final.push_back(OurScale.at((10) % OurScale.size()));
            }
            if (extended >= 13)
            {
                final.push_back(OurScale.at((12) % OurScale.size()));
            }
        }

        for (int i = 0; i < final.size(); i++)
        {
            cout << final.at(i) << " ";
        }
        cout << endl;
    }

    // As of this point I have the chord and scale generation done for most common cases, major/minor/diminished/augmented chords/scales
    // Because of this I want to try and translate these chords/scales to their fretboard positions.
    // Below I take a chord/scale and output the fret of each note within it

    vector<pair<int, int>> E_final;
    vector<pair<int, int>> A_final;
    vector<pair<int, int>> D_final;
    vector<pair<int, int>> G_final;
    vector<pair<int, int>> B_final;
    vector<pair<int, int>> e_final;

    // with each pair, the first element is the string and the second is the fret on that string
    for (int i = 0; i < final.size(); i++)
    {
        for (int s = 0; s < E_string.size(); s++)
        {
            if (final.at(i) == e_string.at(s))
            {
                e_final.push_back(make_pair(5, s));
            }
            if (final.at(i) == B_string.at(s))
            {
                B_final.push_back(make_pair(4, s));
            }
            if (final.at(i) == G_string.at(s))
            {
                G_final.push_back(make_pair(3, s));
            }
            if (final.at(i) == D_string.at(s))
            {
                D_final.push_back(make_pair(2, s));
            }
            if (final.at(i) == A_string.at(s))
            {
                A_final.push_back(make_pair(1, s));
            }
            if (final.at(i) == E_string.at(s))
            {
                E_final.push_back(make_pair(0, s));
            }
        }
    }

    vector<vector<pair<int, int>>> chord_scale;
    chord_scale.push_back(E_final);
    chord_scale.push_back(A_final);
    chord_scale.push_back(D_final);
    chord_scale.push_back(G_final);
    chord_scale.push_back(B_final);
    chord_scale.push_back(e_final);

    vector<pair<int, int>> current_chord;
    vector<vector<pair<int, int>>> valid_chords;

    for (int i = 0; i < chord_scale.size(); i++)
    {
        for (const auto &note : chord_scale[i])
        {
            cout << "(" << note.second << ", String " << note.first << ") ";
        }
        cout << endl;
    }

    if (scaleChord == "Scale")
    {
        Scale_gen(chord_scale, current_chord, valid_chords, strings, final);

        for (size_t i = 0; i < valid_chords.size(); i++)
        {
            cout << "Scale " << i + 1 << ":\n"; // Output for the chord (vector of pairs)

            for (size_t j = 0; j < valid_chords[i].size(); j++)
            {
                cout << "(String " << valid_chords[i][j].first << ", Fret" << valid_chords[i][j].second << ") ";
            }

            cout << endl;
        }
    }

    else if (scaleChord == "Chord")
    {
        // after this call we should have filled valid_chords with chords
        Chord_gen(chord_scale, current_chord, 0, valid_chords, strings, final, quality);

        for (int i = 0; i < valid_chords.size(); i++)
        {
            for (const auto &note : valid_chords[i])
            {
                cout << "(" << note.second << ", String " << note.first << ") ";
            }
            cout << endl;
        }
    }
}
