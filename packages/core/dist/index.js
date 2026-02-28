// src/config.ts
import { z } from "zod";
var configSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  DEFAULT_LANGUAGE: z.enum(["pt-BR", "en", "es"]).default("pt-BR"),
  AI_TONE: z.string().default("professional and helpful")
});
function parseEnv(env) {
  return configSchema.parse(env);
}

// src/parser.ts
function parseSkillMarkdown(content) {
  const lines = content.split("\n");
  let name = "Unknown Skill";
  const description = "";
  let instructions = "";
  const resources = [];
  let currentSection = "";
  for (const line of lines) {
    if (line.startsWith("# ")) {
      name = line.replace("# ", "").trim();
    } else if (line.startsWith("## Instructions") || line.startsWith("## ")) {
      currentSection = line.replace("## ", "").trim().toLowerCase();
    } else {
      if (currentSection === "instructions" || !currentSection && !name.startsWith("Unknown")) {
        instructions += `${line}
`;
      }
    }
  }
  return {
    name,
    description: description.trim(),
    instructions: instructions.trim(),
    resources
  };
}

// src/router.ts
var KnowledgeRouter = class {
  config;
  skills;
  constructor(options) {
    this.config = options.config;
    this.skills = options.skills;
  }
  getSystemPrompt() {
    const languageMap = {
      "pt-BR": "Responda sempre em Portugu\xEAs do Brasil.",
      en: "Always answer in English.",
      es: "Responde siempre en Espa\xF1ol."
    };
    const tone = this.config.AI_TONE;
    const lang = languageMap[this.config.DEFAULT_LANGUAGE] || languageMap["pt-BR"];
    let prompt = `You are an AI assistant. Tone: ${tone}. ${lang}

`;
    prompt += "CRITICAL: Do not exit the context provided by the following skills.\n\n";
    for (const skill of this.skills) {
      prompt += `Skill: ${skill.name}
Instructions:
${skill.instructions}

`;
    }
    return prompt;
  }
  // Example method to route to an AI provider (stubbed)
  async ask(question) {
    const _prompt = this.getSystemPrompt();
    return `[Mock Answer] Processing "${question}" with strict context.`;
  }
};
export {
  KnowledgeRouter,
  configSchema,
  parseEnv,
  parseSkillMarkdown
};
