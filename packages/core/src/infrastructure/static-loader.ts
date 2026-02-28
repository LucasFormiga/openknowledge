import type { KnowledgeItem, LoaderResult, SkillInfo } from '../domain/types.js'
import { parseIdentityMarkdown, parseKnowledgeMarkdown, parseSecurityMarkdown, parseSkillMarkdown } from '../parser.js'

export class StaticKnowledgeLoader {
  loadFromRecord(files: Record<string, string>): LoaderResult {
    const result: LoaderResult = {}
    const knowledgeSources: KnowledgeItem[] = []
    const skills: SkillInfo[] = []

    for (const [path, content] of Object.entries(files)) {
      const parts = path.split('/')
      const fileName = parts[parts.length - 1]

      if (fileName === 'behavior.md') {
        result.identity = parseIdentityMarkdown(content)
      } else if (fileName === 'security.md') {
        result.security = parseSecurityMarkdown(content)
      } else if (parts.includes('knowledge') && fileName.endsWith('.md')) {
        const id = fileName.replace('.md', '')
        knowledgeSources.push(parseKnowledgeMarkdown(id, content))
      } else if (parts.includes('skills') && fileName.endsWith('.md')) {
        skills.push(parseSkillMarkdown(content))
      }
    }

    if (knowledgeSources.length > 0) {
      result.knowledge = { sources: knowledgeSources }
    }

    if (skills.length > 0) {
      result.skills = skills
    }

    return result
  }
}
