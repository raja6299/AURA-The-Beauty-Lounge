'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button 
      onClick={() => signOut()}
      className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
    >
      Log Out
    </button>
  );
}
