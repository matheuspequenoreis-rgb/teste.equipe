import { z } from 'zod'

export const OutputTypeEnum = z.enum(['prd', 'mvp', 'pitch', 'risks', 'stack', 'custom'])

export type TOutputType = z.infer<typeof OutputTypeEnum>

export const GenerateIdeaSchema = z.object({
  idea: z.string().min(10, 'Descreva sua ideia com pelo menos 10 caracteres'),
  type: OutputTypeEnum,
  workspaceId: z.string().uuid('Workspace inválido'),
})

export type TGenerateIdea = z.infer<typeof GenerateIdeaSchema>
