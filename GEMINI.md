# Standing Instructions

## Git — NEVER run git commands directly
When you finish making file changes, do NOT run git add, git commit,
git push, or any other git commands. Instead:
1. Write a single concise commit message describing what you changed
   into a file called "gemini-commit.txt" in the project root
2. One line only, no quotes, no markdown
3. Then stop and tell me the changes are ready to commit

## Terminal — avoid PTY-triggering commands
Do not run commands that cause terminal resize events. Avoid
interactive commands where possible. Prefer writing to files
over running shell commands when both options achieve the same result.

## General behavior
- Always read existing files before modifying them
- Match existing code style, naming conventions, and formatting
- Never modify files outside the scope of the current task
- Confirm what files were changed at the end of each task
