export interface AgentIdentity {
  name: string
  tone: string
  language: string
  instructions: string
}

export interface SecurityGuard {
  strictRules: string
  jailbreakPrevention: string
}

export interface KnowledgeItem {
  id: string
  title: string
  content: string
  metadata?: Record<string, unknown>
}

export interface KnowledgeBase {
  sources: KnowledgeItem[]
}

export interface SkillInfo {
  name: string
  description: string
  instructions: string
  resources: string[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface LoaderResult {
  identity?: AgentIdentity
  security?: SecurityGuard
  knowledge?: KnowledgeBase
  skills?: SkillInfo[]
}
