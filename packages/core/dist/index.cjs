"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  KnowledgeRouter: () => KnowledgeRouter,
  configSchema: () => configSchema,
  parseEnv: () => parseEnv,
  parseSkillMarkdown: () => parseSkillMarkdown
});
module.exports = __toCommonJS(index_exports);

// src/config.ts
var import_zod = require("zod");
var configSchema = import_zod.z.object({
  OPENAI_API_KEY: import_zod.z.string().optional(),
  ANTHROPIC_API_KEY: import_zod.z.string().optional(),
  DEFAULT_LANGUAGE: import_zod.z.enum(["pt-BR", "en", "es"]).default("pt-BR"),
  AI_TONE: import_zod.z.string().default("professional and helpful")
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KnowledgeRouter,
  configSchema,
  parseEnv,
  parseSkillMarkdown
});
