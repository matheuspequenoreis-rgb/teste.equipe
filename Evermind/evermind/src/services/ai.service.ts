import { GoogleGenerativeAI } from '@google/generative-ai'
import { TOutputType } from '@/lib/validations/ai'

const GEMINI_MODEL = 'gemini-2.0-flash'

export class AIService {
  private static instance: GoogleGenerativeAI

  private static getInstance(): GoogleGenerativeAI {
    if (!this.instance) {
      this.instance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    }
    return this.instance
  }

  static async generateStream(idea: string, type: TOutputType) {
    const genAI = this.getInstance()
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL })

    const prompt = this.buildPrompt(idea, type)

    const result = await model.generateContentStream(prompt)
    return result.stream
  }

  private static buildPrompt(idea: string, type: TOutputType): string {
    const prompts: Record<TOutputType, string> = {
      prd: `Aja como um Product Manager experiente. Gere um PRD (Product Requirements Document) completo para a seguinte ideia: "${idea}". 
      O documento deve conter: Visão Geral, Objetivos, Personas, User Stories, Requisitos Funcionais, Requisitos Não Funcionais e Métricas de Sucesso. 
      Use Markdown rico.`,
      
      mvp: `Aja como um Senior Developer e Product Strategist. Defina o escopo de um MVP (Minimum Viable Product) para a ideia: "${idea}". 
      Foqué na funcionalidade principal (Core Feature), arquitetura básica, cronograma de 4 semanas e critérios de lançamento. 
      Use Markdown.`,
      
      pitch: `Aja como um Pitch Coach do Y Combinator. Gere um Pitch Deck Outline para a ideia: "${idea}". 
      Inclua: Problema, Solução, Tamanho de Mercado (TAM/SAM/SOM), Modelo de Negócio, Vantagem Competitiva e Call to Action. 
      Use Markdown persuasivo.`,
      
      risks: `Aja como um Consultor de Gestão de Riscos. Analise os riscos da ideia: "${idea}". 
      Aborde riscos de Mercado, Técnicos, Financeiros e Operacionais. Proponha estratégias de mitigação para cada um. 
      Use Markdown.`,
      
      stack: `Aja como um CTO (Chief Technology Officer). Proponha a Tech Stack ideal para a ideia: "${idea}". 
      Justifique a escolha de Frontend, Backend, Banco de Dados, Infraestrutura, IA e Ferramentas de Observabilidade. 
      Priorize velocidade de entrega e escalabilidade. Use Markdown.`,
      
      custom: `Siga as instruções específicas do usuário para estruturar esta ideia: "${idea}". Use Markdown.`
    }

    return `${prompts[type]}

Importante: Retorne APENAS o conteúdo em Markdown, sem introduções ou comentários extras.`
  }
}
