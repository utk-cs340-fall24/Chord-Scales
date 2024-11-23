#include "crow.h" // Include Crow library
#include <vector>
#include <string>
#include <unordered_map>
#include <nlohmann/json.hpp> // Include JSON library for handling JSON (https://github.com/nlohmann/json)

using namespace std;
using json = nlohmann::json;

vector<string> generateScale(const string& rootNote, const string& scaleType, bool blues, bool pentatonic) {
    unordered_map<string, vector<int>> scaleIntervals = {
        {"major", {0, 2, 4, 5, 7, 9, 11}},
        {"minor", {0, 2, 3, 5, 7, 8, 10}},
        {"diminished", {0, 2, 3, 5, 6, 8, 9}},
        {"augmented", {0, 3, 4, 7, 8, 11}}
    };

    vector<string> noteNames = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};
    auto rootIndex = find(noteNames.begin(), noteNames.end(), rootNote);
    if (rootIndex == noteNames.end() || scaleIntervals.find(scaleType) == scaleIntervals.end()) {
        cout << "Invalid root note or scale type." << endl;
        return {};
    }

    vector<int> intervals = scaleIntervals[scaleType];
    if (blues) {
        intervals.insert(intervals.begin() + 3, intervals[3] + 1);
    } else if (pentatonic) {
        intervals = {intervals[0], intervals[1], intervals[2], intervals[4], intervals[5]};
    }

    vector<string> scale;
    int startIndex = distance(noteNames.begin(), rootIndex);
    for (int interval : intervals) {
        scale.push_back(noteNames[(startIndex + interval) % 12]);
    }

    return scale;
}

vector<string> generateChord(const vector<string>& scale, int suspension, int extension) {
    vector<string> chord;
    if (suspension != 0) {
        if (suspension == 2) {
            chord = {scale[0], scale[1], scale[4]};
        } else if (suspension == 4) {
            chord = {scale[0], scale[3], scale[4]};
        }
    } else {
        chord = {scale[0], scale[2], scale[4]};
    }

    if (extension != 0) {
        if (extension >= 7 && scale.size() > 6) {
            chord.push_back(scale[6]);
        }
        if (extension >= 9 && scale.size() > 8) {
            chord.push_back(scale[8]);
        }
        if (extension >= 11 && scale.size() > 10) {
            chord.push_back(scale[10]);
        }
        if (extension >= 13 && scale.size() > 12) {
            chord.push_back(scale[12]);
        }
    }

    return chord;
}

int main() {
    crow::SimpleApp app;

    CROW_ROUTE(app, "/generate").websocket()
        .onopen([&](crow::websocket::connection& conn) {
            cout << "WebSocket connection opened" << endl;
        })
        .onmessage([&](crow::websocket::connection& conn, const std::string& data, bool is_binary) {
            try {
                auto input_data = json::parse(data);
                string rootNote = input_data["rootNote"];
                string category = input_data["category"];
                string scaleType = input_data["scaleType"];
                bool blues = input_data["blues"];
                bool pentatonic = input_data["pentatonic"];
                int suspension = input_data["suspension"];
                int extension = input_data["extension"];

                cout << "Received Data: " << endl;
                cout << "Root Note: " << rootNote << ", Category: " << category
                     << ", Scale Type: " << scaleType << ", Blues: " << blues
                     << ", Pentatonic: " << pentatonic << ", Suspension: " << suspension
                     << ", Extension: " << extension << endl;

                vector<string> result;
                if (category == "Scale") {
                    result = generateScale(rootNote, scaleType, blues, pentatonic);
                } else if (category == "Chord") {
                    vector<string> scale = generateScale(rootNote, scaleType, false, false);
                    result = generateChord(scale, suspension, extension);
                }

                if (result.empty()) {
                    cout << "No valid notes generated." << endl;
                } else {
                    cout << "Generated Result: ";
                    for (const auto& note : result) {
                        cout << note << " ";
                    }
                    cout << endl;
                }

                json response;
                response["positions"] = result;
                conn.send(response.dump());
                cout << "Sent Response: " << response.dump() << endl;

            } catch (const std::exception& e) {
                cerr << "Error parsing message: " << e.what() << endl;
            }
        })
        .onclose([&](crow::websocket::connection& conn, const std::string& reason) {
            cout << "WebSocket connection closed: " << reason << endl;
        });

    app.port(8080).multithreaded().run();
}
