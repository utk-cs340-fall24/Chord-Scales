#!/bin/bash

# Define the output file name
output_file="lbaile33.commits.txt"

# Initialize or empty the output file
> "$output_file"

# Loop through each file in the repository
for file in $(git ls-files)
do
  echo "File: $file" >> "$output_file"
  # Get the commit history for the file and format it as desired, filtering by date after October 3rd, 2024
  git blame "$file" --since="2024-10-03" | awk -v author_name="$(git config user.name)" '
    /^[0-9a-f]{8}/ {
      commit = $1;
      author = author_name;
      timestamp = "";
      for (i = 3; i <= NF; i++) {
        timestamp = timestamp $i " ";
      }
      sub(/ $/, "", timestamp);
      print commit " (" author "\t" timestamp "\t" NR ") " $0;
    }' >> "$output_file"
done

echo "Commits log saved to $output_file"
