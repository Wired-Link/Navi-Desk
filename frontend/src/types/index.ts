export type Lang = "es" | "en" | "ja";
export type Theme = "crt" | "clean" | "hc";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface ModuleStatus {
  id: string;
  name: string;
  online: boolean;
  cpu: number;
  ram: number;
  lastPing: string;
}

export type TaskState = "pending" | "running" | "completed" | "failed";

export interface TaskItem {
  id: string;
  title: string;
  module: string;
  priority: "low" | "med" | "high";
  state: TaskState;
}

export type LogLevel = "system" | "errors" | "agents" | "security" | "tasks";

export interface LogLine {
  id: string;
  ts: string;
  level: LogLevel;
  message: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  body: string;
}

export interface ToolAgent {
  id: string;
  name: string;
  enabled: boolean;
  mode: "local" | "cloud" | "browser" | "manual";
  risk: "low" | "med" | "high";
  audit: boolean;
}

export interface AuditItem {
  id: string;
  label: string;
  level: "ok" | "warn" | "err";
  detail: string;
}

export interface AppSettings {
  lang: Lang;
  theme: Theme;
  audio: boolean;
  scanlineIntensity: number;
  backendUrl: string;
  localMode: boolean;
}
