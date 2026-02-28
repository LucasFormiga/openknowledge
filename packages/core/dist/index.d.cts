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

declare class FileSystemKnowledgeLoader {
    loadFromDir(baseDir: string): Promise<LoaderResult>;
    private loadKnowledge;
    private loadSkills;
}

declare class StaticKnowledgeLoader {
    loadFromRecord(files: Record<string, string>): LoaderResult;
}

/**
 * Extracts sections from a markdown string based on headings.
 * Returns a map where keys are heading names (lowercase) and values are the content below them.
 */
declare function extractMarkdownSections(content: string): Map<string, string>;
declare function parseIdentityMarkdown(content: string): AgentIdentity;
declare function parseSecurityMarkdown(content: string): SecurityGuard;
declare function parseKnowledgeMarkdown(id: string, content: string): KnowledgeItem;
/**
 * Legacy support for Skills
 */
declare function parseSkillMarkdown(content: string): SkillInfo;

interface RouterOptions {
    config: Config;
    identity?: AgentIdentity;
    security?: SecurityGuard;
    knowledge?: KnowledgeBase;
    skills?: SkillInfo[];
}
declare class KnowledgeRouter {
    private config;
    private identity?;
    private security?;
    private knowledge?;
    private skills;
    constructor(options: RouterOptions);
    static fromDir(config: Config, dirPath: string): Promise<KnowledgeRouter>;
    static fromStatic(config: Config, files: Record<string, string>): KnowledgeRouter;
    getSystemPrompt(): string;
    private getAdapter;
    ask(question: string): Promise<string>;
}

export { type AgentIdentity, type Config, FileSystemKnowledgeLoader, type KnowledgeBase, type KnowledgeItem, KnowledgeRouter, type LoaderResult, type RouterOptions, type SecurityGuard, type SkillInfo, StaticKnowledgeLoader, configSchema, extractMarkdownSections, parseEnv, parseIdentityMarkdown, parseKnowledgeMarkdown, parseSecurityMarkdown, parseSkillMarkdown };
