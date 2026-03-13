import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GenerateIdeaSchema } from '@/lib/validations/ai'
import { AIService } from '@/services/ai.service'

export const runtime = 'edge' // Usar edge para streaming performático

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = GenerateIdeaSchema.parse(body)

    const stream = await AIService.generateStream(validated.idea, validated.type)

    // Criar um stream de resposta compatível com ReadableStream
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.text()
          controller.enqueue(encoder.encode(text))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err: any) {
    console.error('AI Generation Error:', err)
    return NextResponse.json(
      { error: err.message || 'Erro ao gerar ideia' },
      { status: 500 }
    )
  }
}
