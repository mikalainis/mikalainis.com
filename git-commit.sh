#!/bin/bash
set -e

# Read commit message from gemini-commit.txt if it exists
if [ -f "gemini-commit.txt" ]; then
  MESSAGE=$(cat gemini-commit.txt)
  # Delete it before git add . to avoid committing the message file itself
  rm gemini-commit.txt
else
  MESSAGE="Auto-commit: updates from Gemini"
fi

echo "🚀 Starting commit and push process..."

# PRE-COMMIT BUILD CHECK
echo "🔍 Running build check to prevent Vercel failures..."
if npm run build; then
  echo "✅ Build successful!"
else
  echo "❌ ERROR: Build failed locally. Fix the errors before committing."
  exit 1
fi

# Stage changes
git add .

# Commit
git commit -m "$MESSAGE"

# Push and verify
echo "📤 Pushing to remote..."
if git push origin main; then
  echo "✅ Push command completed."
  
  # Verification: Compare hashes
  LOCAL_HASH=$(git rev-parse HEAD)
  REMOTE_HASH=$(git ls-remote origin HEAD | cut -f1)
  
  if [ "$LOCAL_HASH" == "$REMOTE_HASH" ]; then
    echo "✨ VERIFIED: Remote is in sync with local HEAD ($LOCAL_HASH)"
    echo "--------------------------------------------------------"
    git status -sb
    echo "--------------------------------------------------------"
  else
    echo "⚠️  WARNING: Remote HEAD ($REMOTE_HASH) does not match local HEAD ($LOCAL_HASH)"
    echo "The push might have succeeded but the verification check is inconclusive."
    exit 1
  fi
else
  echo "❌ ERROR: Push failed. Please check your connection or remote permissions."
  exit 1
fi
