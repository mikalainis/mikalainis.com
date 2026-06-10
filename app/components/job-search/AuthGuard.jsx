'use client';

export default function AuthGuard({ children }) {
  // Password protection disabled per user request to remove Security Settings
  return children;
}

