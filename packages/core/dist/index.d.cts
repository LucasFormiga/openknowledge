import { z } from 'zod';

declare const configSchema: z.ZodObject<{
    OPENAI_API_KEY: z.ZodOptional<z.ZodString>;
    ANTHROPIC_API_KEY: z.ZodOptional<z.ZodString>;
    GEMINI_API_KEY: z.ZodOptional<z.ZodString>;
    AI_PROVIDER: z.ZodDefault<z.ZodEnum<{
        openai: "openai";
        anthropic: "anthropic";
        gemini: "gemini";
    }>>;
    AI_MODEL: z.ZodDefault<z.ZodString>;
    DEFAULT_LANGUAGE: z.ZodDefault<z.ZodEnum<{
        pt: "pt";
        en: "en";
        es: "es";
    }>>;
    AI_TONE: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
type Config = z.infer<typeof configSchema>;
declare function parseEnv(env: Record<string, string | undefined>): Config;

interface AgentIdentity {
    name: string;
    tone: string;
    language: string;
    instructions: string;
}
interface SecurityGuard {
    strictRules: string;
    jailbreakPrevention: string;
}
interface KnowledgeItem {
    id: string;
    title: string;
    content: string;
    metadata?: Record<string, unknown>;
}
interface KnowledgeBase {
    sources: KnowledgeItem[];
}
interface SkillInfo {
    name: string;
    description: string;
    instructions: string;
    resources: string[];
}
interface LoaderResult {
    identity?: AgentIdentity;
    security?: SecurityGuard;
    knowledge?: KnowledgeBase;
    skills?: SkillInfo[];
}

/**
 * Creates a new OpenKnowledge agent by loading configuration from a directory.
 * This should only be called in Node.js environments.
 *
 * @param config AI provider configuration and defaults
 * @param configDir Path to the directory containing behavior.md, security.md, etc.
 */
declare function createAgent(config: Config, configDir: string): Promise<{
    ask: (question: string, apiKey?: string) => Promise<string>;
}>;

export { type AgentIdentity, type Config, type KnowledgeBase, type KnowledgeItem, type LoaderResult, type SecurityGuard, type SkillInfo, configSchema, createAgent, parseEnv };
