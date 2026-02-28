export interface SkillInfo {
  name: string
  description: string
  instructions: string
  resources: string[]
}

/**
 * Parses a markdown file following the skills.sh format.
 * Expects a title starting with # and content.
 */
export function parseSkillMarkdown(content: string): SkillInfo {
  const lines = content.split('\n')
  let name = 'Unknown Skill'
  const description = ''
  let instructions = ''
  const resources: string[] = []

  let currentSection = ''

  for (const line of lines) {
    if (line.startsWith('# ')) {
      name = line.replace('# ', '').trim()
    } else if (line.startsWith('## Instructions') || line.startsWith('## ')) {
      currentSection = line.replace('## ', '').trim().toLowerCase()
    } else {
      if (currentSection === 'instructions' || (!currentSection && !name.startsWith('Unknown'))) {
        instructions += `${line}\n`
      }
    }
  }

  // Simplified logic, should ideally parse a <activated_skill> block if provided in raw format,
  // or just general markdown structure of skills.sh

  return {
    name,
    description: description.trim(),
    instructions: instructions.trim(),
    resources
  }
}
