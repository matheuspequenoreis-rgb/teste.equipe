'use client'

import { useState } from 'react'
import { TOutputType } from '@/lib/validations/ai'

export function IdeaGenerator() {
  const [idea, setIdea] = useState('')
  const [type, setType] = useState<TOutputType>('prd')
  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState('')

  const handleGenerate = async () => {
    if (!idea || idea.length < 10) return alert('Descreva sua ideia melhor!')
    
    setLoading(true)
    setOutput('')

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idea, 
          type, 
          workspaceId: '00000000-0000-0000-0000-000000000000' // Placeholder para teste
        }),
      })

      if (!response.ok) throw new Error('Falha na geração')

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) return

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        setOutput((prev) => prev + chunk)
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao gerar. Verifique seu console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <textarea
          className="w-full min-h-[120px] p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 outline-none transition-all"
          placeholder="Descreva sua ideia aqui... (ex: Um app de entrega de café por drones)"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          {['prd', 'mvp', 'pitch', 'risks', 'stack'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t as TOutputType)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                type === t 
                  ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900' 
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading || !idea}
          className="w-full py-3 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? 'Gerando estrutura...' : 'Gerar com Gemini AI'}
        </button>
      </div>

      {output && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap font-mono text-sm">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
