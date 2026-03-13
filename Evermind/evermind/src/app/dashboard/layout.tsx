export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-zinc-50 dark:bg-zinc-950 p-4">
        <h2 className="font-bold text-lg mb-6">EverMind</h2>
        <nav className="space-y-2">
          <div className="px-3 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 font-medium cursor-pointer">
            Workspaces
          </div>
          <div className="px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer">
            Settings
          </div>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
