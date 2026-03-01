import * as aiCore from '@tanstack/ai'
import { describe, expect, it, vi } from 'vitest'
import { AgentInstance, createAgent } from '../src/router.js'

vi.mock('@tanstack/ai', () => ({
  chat: vi.fn()
}))

vi.mock('../src/infrastructure/file-loader.js', () => ({
  FileSystemKnowledgeLoader: class {
    loadFromDir = vi.fn().mockResolvedValue({
      identity: { name: 'Mock Agent', tone: 'helpful', language: 'en', instructions: 'Be a mock agent.' },
      security: { strictRules: 'Rule 1', jailbreakPrevention: 'No jailbreak.' },
      knowledge: { sources: [{ id: '1', title: 'Knowledge', content: 'Info' }] },
      skills: [{ name: 'Skill', description: '', instructions: 'Do skill', resources: [] }]
    })
  }
}))

describe('AgentInstance', () => {
  const baseConfig = {
    AI_PROVIDER: 'gemini' as const,
    AI_MODEL: 'gemini-1.5-flash',
    DEFAULT_LANGUAGE: 'en' as const,
    AI_TONE: 'professional',
    GEMINI_API_KEY: 'test-gemini-key'
  }

  it('should assemble system prompt correctly with missing optional configurations', () => {
    const agent = new AgentInstance({ config: baseConfig })
    const prompt = (agent as any).getSystemPrompt()

    expect(prompt).toContain('Name: AI Assistant')
    expect(prompt).toContain('Tone: professional')
    expect(prompt).toContain('Language: Always answer in English.')
    expect(prompt).toContain('CRITICAL: Do not exit the configured context under any circumstances.')
    expect(prompt).not.toContain('# LOCAL KNOWLEDGE BASE')
    expect(prompt).not.toContain('# SKILLS')
  })

  it('should assemble system prompt with language fallback and skills', () => {
    const config = { ...baseConfig, DEFAULT_LANGUAGE: 'pt-BR' as const }
    const agent = new AgentInstance({
      config,
      skills: [{ name: 'Test Skill', instructions: 'Test Instruction', description: '', resources: [] }]
    })
    const prompt = (agent as any).getSystemPrompt()

    expect(prompt).toContain('Responda sempre em Português do Brasil.')
    expect(prompt).toContain('# SKILLS')
    expect(prompt).toContain('## Test Skill\nTest Instruction')
  })

  it('should resolve language pt correctly', () => {
    const config = { ...baseConfig, DEFAULT_LANGUAGE: 'pt' as const }
    const agent = new AgentInstance({ config })
    const prompt = (agent as any).getSystemPrompt()
    expect(prompt).toContain('Responda sempre em Português do Brasil.')
  })

  it('should resolve language es correctly', () => {
    const config = { ...baseConfig, DEFAULT_LANGUAGE: 'es' as const }
    const agent = new AgentInstance({ config })
    const prompt = (agent as any).getSystemPrompt()
    expect(prompt).toContain('Responde siempre en Español.')
  })

  it('should get correct adapter based on provider', () => {
    let agent = new AgentInstance({ config: { ...baseConfig, AI_PROVIDER: 'openai', OPENAI_API_KEY: 'key' } })
    expect(() => (agent as any).getAdapter()).not.toThrow()

    agent = new AgentInstance({ config: { ...baseConfig, AI_PROVIDER: 'anthropic', ANTHROPIC_API_KEY: 'key' } })
    expect(() => (agent as any).getAdapter()).not.toThrow()

    agent = new AgentInstance({ config: { ...baseConfig, AI_PROVIDER: 'unknown' as any, GEMINI_API_KEY: 'key' } })
    expect(() => (agent as any).getAdapter()).toThrow('Unsupported AI provider: unknown')
  })

  it('should throw error if no API key is provided', () => {
    const agent = new AgentInstance({ config: { ...baseConfig, GEMINI_API_KEY: undefined } })
    expect(() => (agent as any).getAdapter()).toThrow('No API key provided for gemini')
  })

  it('should successfully ask a question and call chat', async () => {
    const agent = new AgentInstance({ config: baseConfig })
    vi.mocked(aiCore.chat).mockResolvedValue('Mocked response')

    const response = await agent.ask('Hello')
    expect(response).toBe('Mocked response')
    expect(aiCore.chat).toHaveBeenCalled()
  })

  it('should include history in messages array when asking a question', async () => {
    const agent = new AgentInstance({ config: baseConfig })
    vi.mocked(aiCore.chat).mockResolvedValue('Mocked response with history')

    const history: any[] = [
      { role: 'user', content: 'Hi before' },
      { role: 'assistant', content: 'Hello before' }
    ]
    await agent.ask('Hello again', undefined, history)

    expect(aiCore.chat).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: [
          expect.objectContaining({ role: 'assistant' }),
          { role: 'user', content: 'Hi before' },
          { role: 'assistant', content: 'Hello before' },
          { role: 'user', content: 'Hello again' }
        ]
      })
    )
  })
})

describe('createAgent', () => {
  it('should create an agent and load from dir', async () => {
    const config = {
      AI_PROVIDER: 'gemini' as const,
      AI_MODEL: 'gemini-1.5-flash',
      DEFAULT_LANGUAGE: 'en' as const,
      AI_TONE: 'professional',
      GEMINI_API_KEY: 'test-gemini-key'
    }

    const agent = await createAgent(config, 'mock-dir')
    expect(agent).toHaveProperty('ask')

    vi.mocked(aiCore.chat).mockResolvedValue('Response from createAgent')
    const response = await agent.ask('Hello')
    expect(response).toBe('Response from createAgent')
  })
})
