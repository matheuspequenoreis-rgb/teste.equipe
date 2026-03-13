'use client'

import { signInWithGoogle, signInWithGithub } from '@/app/auth/actions'

export function AuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => signInWithGoogle()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
      >
        Google
      </button>
      <button
        onClick={() => signInWithGithub()}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 h-10 px-4 py-2"
      >
        GitHub
      </button>
    </div>
  )
}
