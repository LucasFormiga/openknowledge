import { z } from 'zod';

declare const configSchema: z.ZodObject<{
    OPENAI_API_KEY: z.ZodOptional<z.ZodString>;
    ANTHROPIC_API_KEY: z.ZodOptional<z.ZodString>;
    DEFAULT_LANGUAGE: z.ZodDefault<z.ZodEnum<{
        "pt-BR": "pt-BR";
        en: "en";
        es: "es";
    }>>;
    AI_TONE: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
type Config = z.infer<typeof configSchema>;
declare function parseEnv(env: Record<string, string | undefined>): Config;

interface SkillInfo {
    name: string;
    description: string;
    instructions: string;
    resources: string[];
}
/**
 * Parses a markdown file following the skills.sh format.
 * Expects a title starting with # and content.
 */
declare function parseSkillMarkdown(content: string): SkillInfo;

interface RouterOptions {
    config: Config;
    skills: SkillInfo[];
}
declare class KnowledgeRouter {
    private config;
    private skills;
    constructor(options: RouterOptions);
    getSystemPrompt(): string;
    ask(question: string): Promise<string>;
}

export { type Config, KnowledgeRouter, type RouterOptions, type SkillInfo, configSchema, parseEnv, parseSkillMarkdown };
