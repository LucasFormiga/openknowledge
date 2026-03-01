import { describe, expect, it } from 'vitest'
import {
  extractMarkdownSections,
  parseIdentityMarkdown,
  parseKnowledgeMarkdown,
  parseSecurityMarkdown,
  parseSkillMarkdown
} from '../src/parser.js'

describe('Parser - extractMarkdownSections', () => {
  it('should extract sections correctly', () => {
    const md = `# Main Title
Some random content
## First Section
Content 1
## Second Section
Content 2`
    const sections = extractMarkdownSections(md)
    expect(sections.get('title')).toBe('Main Title')
    expect(sections.get('first section')).toBe('Content 1')
    expect(sections.get('second section')).toBe('Content 2')
  })

  it('should handle title with content but no subheadings', () => {
    const md = `# Main Title
Just some content here.`
    const sections = extractMarkdownSections(md)
    expect(sections.get('title')).toBe('Main Title')
    expect(sections.get('content')).toBe('Just some content here.')
  })

  it('should handle no headings at all', () => {
    const md = `Just some text without any headings.`
    const sections = extractMarkdownSections(md)
    expect(sections.get('content')).toBe('Just some text without any headings.')
  })
})

describe('Parser - parseIdentityMarkdown', () => {
  it('should parse complete identity markdown', () => {
    const md = `# Custom Assistant
## Tone
Friendly
## Language
es
## Instructions
Help the user.`
    const identity = parseIdentityMarkdown(md)
    expect(identity.name).toBe('Custom Assistant')
    expect(identity.tone).toBe('Friendly')
    expect(identity.language).toBe('es')
    expect(identity.instructions).toBe('Help the user.')
  })

  it('should use defaults when properties are missing', () => {
    const md = `No headings here just instructions.`
    const identity = parseIdentityMarkdown(md)
    expect(identity.name).toBe('AI Assistant')
    expect(identity.tone).toBe('professional and helpful')
    expect(identity.language).toBe('en')
    expect(identity.instructions).toBe('No headings here just instructions.')
  })
})

describe('Parser - parseSecurityMarkdown', () => {
  it('should parse security markdown', () => {
    const md = `## Strict Rules
Rule 1
## Jailbreak Prevention
Prevent it.`
    const security = parseSecurityMarkdown(md)
    expect(security.strictRules).toBe('Rule 1')
    expect(security.jailbreakPrevention).toBe('Prevent it.')
  })
})

describe('Parser - parseKnowledgeMarkdown', () => {
  it('should parse knowledge markdown with title', () => {
    const md = `# Knowledge Base
Some knowledge.`
    const knowledge = parseKnowledgeMarkdown('kb-1', md)
    expect(knowledge.id).toBe('kb-1')
    expect(knowledge.title).toBe('Knowledge Base')
    expect(knowledge.content).toBe('Some knowledge.')
  })

  it('should fallback to id if title is missing', () => {
    const md = `Just some raw knowledge content.`
    const knowledge = parseKnowledgeMarkdown('kb-2', md)
    expect(knowledge.id).toBe('kb-2')
    expect(knowledge.title).toBe('kb-2')
    expect(knowledge.content).toBe('Just some raw knowledge content.')
  })
})

describe('Parser - parseSkillMarkdown', () => {
  it('should parse skill markdown', () => {
    const md = `# Coding Skill
## Description
Helps with coding.
## Instructions
Write code.`
    const skill = parseSkillMarkdown(md)
    expect(skill.name).toBe('Coding Skill')
    expect(skill.description).toBe('Helps with coding.')
    expect(skill.instructions).toBe('Write code.')
    expect(skill.resources).toEqual([])
  })
})
