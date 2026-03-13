import { IdeaGenerator } from '@/components/idea/idea-generator'

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Transforme sua próxima grande ideia em uma estrutura acionável.
        </p>
      </header>

      <section>
        <IdeaGenerator />
      </section>
    </div>
  )
}
