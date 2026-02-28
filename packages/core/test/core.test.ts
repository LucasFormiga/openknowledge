import { describe, expect, it } from 'vitest';
import { parseEnv } from '../src/config.js';
import { parseSkillMarkdown } from '../src/parser.js';

describe('Config Parsing', () => {
  it('should parse environment variables', () => {
    const config = parseEnv({ DEFAULT_LANGUAGE: 'en', AI_TONE: 'friendly' });
    expect(config.DEFAULT_LANGUAGE).toBe('en');
    expect(config.AI_TONE).toBe('friendly');
  });
});

describe('Markdown Parsing', () => {
  it('should parse skill markdown', () => {
    const md = `# My Skill
Some instruction
More instruction`;
    const skill = parseSkillMarkdown(md);
    expect(skill.name).toBe('My Skill');
    expect(skill.instructions).toContain('Some instruction');
  });
});
