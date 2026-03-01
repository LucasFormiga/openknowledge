import type { AgentIdentity, KnowledgeItem, SecurityGuard, SkillInfo } from './domain/types.js'

/**
 * Extracts sections from a markdown string based on headings.
 * Returns a map where keys are heading names (lowercase) and values are the content below them.
 */
export function extractMarkdownSections(content: string): Map<string, string> {
  const sections = new Map<string, string>()
  const lines = content.split('\n')
  let currentSection = ''
  let currentContent: string[] = []

  for (const line of lines) {
    if (line.startsWith('# ')) {
      sections.set('title', line.replace('# ', '').trim())
      continue
    }

    if (line.startsWith('## ')) {
      if (currentSection) {
        sections.set(currentSection.toLowerCase(), currentContent.join('\n').trim())
      }
      currentSection = line.replace('## ', '').trim()
      currentContent = []
      continue
    }

    currentContent.push(line)
  }

  if (currentSection) {
    sections.set(currentSection.toLowerCase(), currentContent.join('\n').trim())
    return sections
  }

  if (sections.has('title') && currentContent.length > 0) {
    sections.set('content', currentContent.join('\n').trim())
    return sections
  }

  if (currentContent.length > 0) {
    sections.set('content', currentContent.join('\n').trim())
  }

  return sections
}

export function parseIdentityMarkdown(content: string): AgentIdentity {
  const sections = extractMarkdownSections(content)
  return {
    name: (sections.get('title') || 'AI Assistant') as string,
    tone: (sections.get('tone') || 'professional and helpful') as string,
    language: (sections.get('language') || 'en') as string,
    instructions: (sections.get('instructions') || sections.get('content') || '') as string
  }
}

export function parseSecurityMarkdown(content: string): SecurityGuard {
  const sections = extractMarkdownSections(content)
  return {
    strictRules: (sections.get('strict rules') || sections.get('rules') || sections.get('content') || '') as string,
    jailbreakPrevention: (sections.get('security guidelines') || sections.get('jailbreak prevention') || '') as string
  }
}

export function parseKnowledgeMarkdown(id: string, content: string): KnowledgeItem {
  const sections = extractMarkdownSections(content)
  return {
    id,
    title: (sections.get('title') || id) as string,
    content: (sections.get('content') || sections.get('knowledge') || content) as string
  }
}

/**
 * Legacy support for Skills
 */
export function parseSkillMarkdown(content: string): SkillInfo {
  const sections = extractMarkdownSections(content)
  return {
    name: (sections.get('title') || 'Unknown Skill') as string,
    description: (sections.get('description') || '') as string,
    instructions: (sections.get('instructions') || sections.get('content') || '') as string,
    resources: []
  }
}
