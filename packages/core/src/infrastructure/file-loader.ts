import fs from 'node:fs/promises'
import path from 'node:path'
import type { KnowledgeBase, LoaderResult, SkillInfo } from '../domain/types.js'
import { parseIdentityMarkdown, parseKnowledgeMarkdown, parseSecurityMarkdown, parseSkillMarkdown } from '../parser.js'

export class FileSystemKnowledgeLoader {
  async loadFromDir(baseDir: string): Promise<LoaderResult> {
    const result: LoaderResult = {}

    try {
      const files = await fs.readdir(baseDir)

      if (files.includes('behavior.md')) {
        const content = await fs.readFile(path.join(baseDir, 'behavior.md'), 'utf-8')
        result.identity = parseIdentityMarkdown(content)
      }

      if (files.includes('security.md')) {
        const content = await fs.readFile(path.join(baseDir, 'security.md'), 'utf-8')
        result.security = parseSecurityMarkdown(content)
      }

      result.knowledge = await this.loadKnowledge(baseDir, files)
      result.skills = await this.loadSkills(baseDir, files)
    } catch (error) {
      console.error(`Error loading configuration from ${baseDir}:`, error)
    }

    return result
  }

  private async loadKnowledge(baseDir: string, files: string[]): Promise<KnowledgeBase | undefined> {
    const knowledgePath = path.join(baseDir, 'knowledge')
    const hasKnowledgeDir = files.includes('knowledge') && (await fs.stat(knowledgePath)).isDirectory()

    if (!hasKnowledgeDir) return undefined

    const knowledgeFiles = await fs.readdir(knowledgePath)
    const sources = await Promise.all(
      knowledgeFiles
        .filter((f) => f.endsWith('.md'))
        .map(async (f) => {
          const content = await fs.readFile(path.join(knowledgePath, f), 'utf-8')
          return parseKnowledgeMarkdown(f.replace('.md', ''), content)
        })
    )

    return { sources }
  }

  private async loadSkills(baseDir: string, files: string[]): Promise<SkillInfo[] | undefined> {
    const skillsPath = path.join(baseDir, 'skills')
    const hasSkillsDir = files.includes('skills') && (await fs.stat(skillsPath)).isDirectory()

    if (!hasSkillsDir) return undefined

    const skillFiles = await fs.readdir(skillsPath)
    return Promise.all(
      skillFiles
        .filter((f) => f.endsWith('.md'))
        .map(async (f) => {
          const content = await fs.readFile(path.join(skillsPath, f), 'utf-8')
          return parseSkillMarkdown(content)
        })
    )
  }
}
