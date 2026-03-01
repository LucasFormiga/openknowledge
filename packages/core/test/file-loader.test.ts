import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import path from 'node:path'
import { FileSystemKnowledgeLoader } from '../src/infrastructure/file-loader.js'

vi.mock('node:fs/promises')

describe('FileSystemKnowledgeLoader', () => {
  const loader = new FileSystemKnowledgeLoader()

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should load all configurations correctly', async () => {
    vi.mocked(fs.readdir).mockImplementation(async (dirPath) => {
      if (dirPath === 'test-dir') return ['behavior.md', 'security.md', 'knowledge', 'skills']
      if (dirPath === path.join('test-dir', 'knowledge')) return ['doc1.md']
      if (dirPath === path.join('test-dir', 'skills')) return ['skill1.md']
      return []
    })

    vi.mocked(fs.readFile).mockImplementation(async (filePath) => {
      if (filePath === path.join('test-dir', 'behavior.md')) return '# Test Identity\n## Tone\nFriendly'
      if (filePath === path.join('test-dir', 'security.md')) return '## Strict Rules\nRule 1'
      if (filePath === path.join('test-dir', 'knowledge', 'doc1.md')) return '# Doc 1\nContent 1'
      if (filePath === path.join('test-dir', 'skills', 'skill1.md')) return '# Skill 1\nDo skill.'
      return ''
    })

    vi.mocked(fs.stat).mockImplementation(async (filePath) => {
      return { isDirectory: () => true } as any
    })

    const result = await loader.loadFromDir('test-dir')

    expect(result.identity?.name).toBe('Test Identity')
    expect(result.identity?.tone).toBe('Friendly')

    expect(result.security?.strictRules).toBe('Rule 1')

    expect(result.knowledge?.sources).toHaveLength(1)
    expect(result.knowledge?.sources[0].title).toBe('Doc 1')

    expect(result.skills).toHaveLength(1)
    expect(result.skills![0].name).toBe('Skill 1')
  })

  it('should return empty result if directory is empty', async () => {
    vi.mocked(fs.readdir).mockResolvedValue([])

    const result = await loader.loadFromDir('empty-dir')

    expect(result).toEqual({ knowledge: undefined, skills: undefined })
  })

  it('should handle errors gracefully and return empty object', async () => {
    vi.mocked(fs.readdir).mockRejectedValue(new Error('Permission denied'))

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const result = await loader.loadFromDir('error-dir')
    
    expect(consoleSpy).toHaveBeenCalledWith('Error loading configuration from error-dir:', expect.any(Error))
    expect(result).toEqual({})
    
    consoleSpy.mockRestore()
  })

  it('should ignore knowledge and skills if they are not directories', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['knowledge', 'skills'])
    vi.mocked(fs.stat).mockImplementation(async () => {
      return { isDirectory: () => false } as any
    })

    const result = await loader.loadFromDir('test-dir')
    expect(result.knowledge).toBeUndefined()
    expect(result.skills).toBeUndefined()
  })
})