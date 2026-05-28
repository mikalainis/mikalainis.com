# Standing Instructions

## Git — NEVER run git commands directly
When you finish making all file changes:
1. Write a single concise commit message describing exactly what you
   changed into a file called "gemini-commit.txt" in the project root
2. One line only, no quotes, no markdown, no bullet points
3. Be specific — e.g. "Add Adzuna job search integration to job-search.html"
   not "Auto-commit: updates from Gemini"
4. Then stop and tell me the changes are ready to commit
5. Do NOT run git add, git commit, git push, or any other git commands

## Terminal — avoid PTY-triggering commands
Do not run commands that cause terminal resize events. Avoid interactive
commands where possible. Prefer writing to files over running shell
commands when both options achieve the same result.

## General behavior
- Always read existing files before modifying them
- Match existing code style, naming conventions, and formatting
- Never modify files outside the scope of the current task
- Confirm exactly which files were changed at the end of each task
- Never expose API keys, credentials, or secrets in output or comments
  beyond the constants block at the top of the file
