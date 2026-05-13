import {
  ChatMessage,
  ModuleStatus,
  TaskItem,
  LogLine,
  PromptTemplate,
  ToolAgent,
  AuditItem,
} from "../types";

const now = () => new Date().toISOString();

export const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "system",
    content: "NAVI DESK :: v7.0 — Terminal de control local iniciado.",
    timestamp: now(),
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "[asistente] Listo. Estoy operando en modo local. Escribe un comando o ejecuta una plantilla.",
    timestamp: now(),
  },
];

export const modules: ModuleStatus[] = [
  { id: "core", name: "Core Controller", online: true, cpu: 24, ram: 38, lastPing: "12ms" },
  { id: "render", name: "Render Node", online: true, cpu: 67, ram: 71, lastPing: "8ms" },
  { id: "dev", name: "Development Node", online: false, cpu: 0, ram: 0, lastPing: "—" },
  { id: "future", name: "Future Node", online: true, cpu: 12, ram: 22, lastPing: "31ms" },
  { id: "llm", name: "Local LLM", online: true, cpu: 54, ram: 88, lastPing: "5ms" },
  { id: "rag", name: "Memory / RAG", online: true, cpu: 18, ram: 41, lastPing: "14ms" },
];

export const tasks: TaskItem[] = [
  { id: "t1", title: "Indexar carpeta /docs", module: "Memory / RAG", priority: "med", state: "running" },
  { id: "t2", title: "Compilar agente local", module: "Development Node", priority: "high", state: "pending" },
  { id: "t3", title: "Renderizar diagrama de flujo", module: "Render Node", priority: "low", state: "completed" },
  { id: "t4", title: "Verificación cruzada de respuestas", module: "Core Controller", priority: "high", state: "running" },
  { id: "t5", title: "Snapshot del sistema", module: "Core Controller", priority: "med", state: "pending" },
  { id: "t6", title: "Auditoría de dependencias externas", module: "Core Controller", priority: "high", state: "failed" },
];

export const seedLogs: LogLine[] = [
  { id: "l1", ts: "00:00:01", level: "system", message: "boot :: kernel local cargado" },
  { id: "l2", ts: "00:00:02", level: "system", message: "modules :: 5/6 en línea" },
  { id: "l3", ts: "00:00:03", level: "agents", message: "agent[code] :: idle" },
  { id: "l4", ts: "00:00:05", level: "security", message: "audit :: sin dependencias externas activas" },
  { id: "l5", ts: "00:00:08", level: "errors", message: "dev-node :: timeout de heartbeat" },
  { id: "l6", ts: "00:00:11", level: "tasks", message: "task[t1] :: índice 24% → 62%" },
];

export const prompts: PromptTemplate[] = [
  {
    id: "p1",
    title: "Agente de Código",
    category: "Code agent",
    description: "Refactorizar un archivo manteniendo la API pública.",
    body: "Refactoriza el archivo {{file}} sin romper su API pública. Devuelve diff.",
  },
  {
    id: "p2",
    title: "Agente Local",
    category: "Local agent",
    description: "Operar en modo offline contra el LLM local.",
    body: "Responde usando exclusivamente el modelo local. No salgas a la red.",
  },
  {
    id: "p3",
    title: "Verificador Nube",
    category: "Cloud verifier",
    description: "Cruzar respuestas con un verificador externo opcional.",
    body: "Verifica la respuesta anterior con un segundo modelo y reporta divergencias.",
  },
  {
    id: "p4",
    title: "Auditoría",
    category: "Audit",
    description: "Revisión de seguridad y dependencias externas.",
    body: "Lista todas las dependencias externas y marca riesgos potenciales.",
  },
  {
    id: "p5",
    title: "Recuperación",
    category: "Recovery",
    description: "Activar modo de recuperación y respaldo.",
    body: "Inicia modo recuperación, genera snapshot y propone puntos de restauración.",
  },
  {
    id: "p6",
    title: "Automatización Navegador",
    category: "Browser automation",
    description: "Disparar una rutina de navegador headless.",
    body: "Abre {{url}}, extrae el contenido principal y resúmelo en 5 líneas.",
  },
  {
    id: "p7",
    title: "Generador UI",
    category: "UI generator",
    description: "Generar un nuevo panel retro para el dashboard.",
    body: "Diseña un panel retro adicional para Navi Desk con estilo CRT.",
  },
];

export const tools: ToolAgent[] = [
  { id: "tl1", name: "Code Agent", enabled: true, mode: "local", risk: "low", audit: true },
  { id: "tl2", name: "Verification Agent", enabled: true, mode: "cloud", risk: "med", audit: true },
  { id: "tl3", name: "Local LLM", enabled: true, mode: "local", risk: "low", audit: false },
  { id: "tl4", name: "Browser Automation", enabled: false, mode: "browser", risk: "high", audit: true },
  { id: "tl5", name: "UI Generator", enabled: true, mode: "local", risk: "low", audit: false },
  { id: "tl6", name: "Speech Service", enabled: false, mode: "manual", risk: "med", audit: true },
  { id: "tl7", name: "Image / Video Service", enabled: false, mode: "cloud", risk: "med", audit: true },
];

export const auditItems: AuditItem[] = [
  { id: "a1", label: "Integridad del kernel", level: "ok", detail: "Hash válido — sin alteraciones." },
  { id: "a2", label: "Dependencias externas", level: "warn", detail: "2 servicios externos opcionales detectados." },
  { id: "a3", label: "Cifrado de credenciales", level: "ok", detail: "Almacenamiento solo backend." },
  { id: "a4", label: "Permisos de red", level: "warn", detail: "Modo local habilitado, sin tráfico saliente." },
  { id: "a5", label: "Revisión pendiente", level: "err", detail: "Auditoría manual requerida para módulo 'dev-node'." },
];

export const restorePoints = [
  "snap_2026-02-01_14-22",
  "snap_2026-01-28_09-11",
  "snap_2026-01-22_18-44",
];
