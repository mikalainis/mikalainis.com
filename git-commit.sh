#!/bin/bash
# Read commit message from gemini-commit.txt if it exists
if [ -f "gemini-commit.txt" ]; then
  MESSAGE=$(cat gemini-commit.txt)
  rm gemini-commit.txt
else
  MESSAGE="Auto-commit: updates from Gemini"
fi

git add .
git commit -m "$MESSAGE"
git push
echo "✅ Committed and pushed: $MESSAGE"
