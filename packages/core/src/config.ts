import { z } from 'zod'

export const configSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  AI_PROVIDER: z.enum(['openai', 'anthropic', 'gemini']).default('gemini'),
  AI_MODEL: z.string().default('gemini-2.5-flash'),
  DEFAULT_LANGUAGE: z.enum(['pt', 'en', 'es']).default('pt'),
  AI_TONE: z.string().default('professional and helpful')
})

export type Config = z.infer<typeof configSchema>

export function parseEnv(env: Record<string, string | undefined>): Config {
  return configSchema.parse(env)
}
