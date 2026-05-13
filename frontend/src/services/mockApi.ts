import {
  initialMessages,
  modules,
  tasks,
  seedLogs,
  prompts,
  tools,
  auditItems,
  restorePoints,
} from "../data/mockData";
import {
  ChatMessage,
  LogLine,
  ModuleStatus,
  PromptTemplate,
  TaskItem,
  ToolAgent,
  AuditItem,
} from "../types";

// All functions return promises so the future real backend can drop-in replace them.
const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export const mockApi = {
  async getMessages(): Promise<ChatMessage[]> {
    await delay();
    return [...initialMessages];
  },

  async sendMessage(text: string): Promise<ChatMessage> {
    await delay(200);
    return {
      id: `r-${Date.now()}`,
      role: "assistant",
      content: `[asistente] (mock) He recibido: "${text}". Conecta el backend real para ejecutar.`,
      timestamp: new Date().toISOString(),
    };
  },

  async getModules(): Promise<ModuleStatus[]> {
    await delay();
    return modules.map((m) => ({ ...m }));
  },

  async getTasks(): Promise<TaskItem[]> {
    await delay();
    return tasks.map((t) => ({ ...t }));
  },

  async getLogs(): Promise<LogLine[]> {
    await delay();
    return [...seedLogs];
  },

  async streamLogLine(): Promise<LogLine> {
    const levels: LogLine["level"][] = ["system", "agents", "tasks", "security", "errors"];
    const level = levels[Math.floor(Math.random() * levels.length)];
    const samples: Record<LogLine["level"], string[]> = {
      system: ["heartbeat ok", "kernel idle", "memory pool stable"],
      agents: ["agent[code] :: think", "agent[verifier] :: pending", "agent[ui] :: render"],
      tasks: ["task[t1] :: progress +3%", "task[t4] :: chunk validated", "task[t5] :: queued"],
      security: ["audit :: scan clean", "audit :: external dep flagged", "audit :: snapshot ok"],
      errors: ["dev-node :: heartbeat timeout", "render-node :: gpu throttle", "rag :: chunk skipped"],
    };
    const msg = samples[level][Math.floor(Math.random() * samples[level].length)];
    const d = new Date();
    const ts = `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes(),
    ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
    return { id: `lg-${Date.now()}-${Math.random()}`, ts, level, message: msg };
  },

  async getPrompts(): Promise<PromptTemplate[]> {
    await delay();
    return prompts.map((p) => ({ ...p }));
  },

  async getTools(): Promise<ToolAgent[]> {
    await delay();
    return tools.map((t) => ({ ...t }));
  },

  async getAudit(): Promise<AuditItem[]> {
    await delay();
    return [...auditItems];
  },

  async getRestorePoints(): Promise<string[]> {
    await delay();
    return [...restorePoints];
  },
};

export type MockApi = typeof mockApi;
