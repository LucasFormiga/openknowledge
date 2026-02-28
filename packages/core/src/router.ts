// Mocking @tanstack/ai usage since it's an alpha/hypothetical generic package here.
// In reality, we'd import { createRouter } from '@tanstack/ai';
import type { Config } from './config.js';
import type { SkillInfo } from './parser.js';

export interface RouterOptions {
  config: Config;
  skills: SkillInfo[];
}

export class KnowledgeRouter {
  private config: Config;
  private skills: SkillInfo[];

  constructor(options: RouterOptions) {
    this.config = options.config;
    this.skills = options.skills;
  }

  getSystemPrompt(): string {
    const languageMap = {
      'pt-BR': 'Responda sempre em Português do Brasil.',
      en: 'Always answer in English.',
      es: 'Responde siempre en Español.',
    };

    const tone = this.config.AI_TONE;
    const lang = languageMap[this.config.DEFAULT_LANGUAGE] || languageMap['pt-BR'];

    let prompt = `You are an AI assistant. Tone: ${tone}. ${lang}\n\n`;
    prompt += 'CRITICAL: Do not exit the context provided by the following skills.\n\n';

    for (const skill of this.skills) {
      prompt += `Skill: ${skill.name}\nInstructions:\n${skill.instructions}\n\n`;
    }

    return prompt;
  }

  // Example method to route to an AI provider (stubbed)
  async ask(question: string): Promise<string> {
    const _prompt = this.getSystemPrompt();
    // Here we would use @tanstack/ai to route based on available API keys
    // e.g. using OpenAI or Anthropic.
    return `[Mock Answer] Processing "${question}" with strict context.`;
  }
}
