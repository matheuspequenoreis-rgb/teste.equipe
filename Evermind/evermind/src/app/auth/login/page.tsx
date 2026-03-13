import { login } from '../actions'
import { AuthButtons } from '@/components/auth/auth-buttons'

export default async function LoginPage(props: {
  searchParams: Promise<{ sent?: string }>
}) {
  const searchParams = await props.searchParams
  const sent = searchParams.sent === 'true'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 space-y-8 border border-zinc-200 dark:border-zinc-800">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Welcome to EverMind</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Sign in to your account to start structuring ideas.
          </p>
        </div>

        {sent ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 p-4 rounded-lg text-green-800 dark:text-green-300 text-sm">
            Check your email for the magic link to sign in!
          </div>
        ) : (
          <>
            <form action={login} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 w-full"
              >
                Send Magic Link
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>

            <AuthButtons />
          </>
        )}
      </div>
    </div>
  )
}
