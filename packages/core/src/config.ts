import { z } from 'zod';

export const configSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  DEFAULT_LANGUAGE: z.enum(['pt-BR', 'en', 'es']).default('pt-BR'),
  AI_TONE: z.string().default('professional and helpful'),
});

export type Config = z.infer<typeof configSchema>;

export function parseEnv(env: Record<string, string | undefined>): Config {
  return configSchema.parse(env);
}
