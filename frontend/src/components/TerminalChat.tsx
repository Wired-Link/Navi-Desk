import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { RetroWindow } from "./RetroWindow";
import { ChatMessage } from "../types";
import { mockApi } from "../services/mockApi";
import { useApp } from "../context/AppContext";

const MAX_CHARS = 800;

export const TerminalChat: React.FC = () => {
  const { t } = useApp();
  const [tab, setTab] = useState<"chat" | "share" | "command">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mockApi.getMessages().then(setMessages);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    const reply = await mockApi.sendMessage(userMsg.content);
    setMessages((m) => [...m, reply]);
  };

  const ts = (s: string) => {
    const d = new Date(s);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  };

  const tabs = [
    { id: "chat", label: t("chat") },
    { id: "share", label: t("share") },
    { id: "command", label: t("command") },
  ] as const;

  return (
    <RetroWindow
      testId="terminal-chat-window"
      title="CONSOLA :: NAVI"
      subtitle="ch01 / primary"
      contentClassName="flex flex-col"
      rightSlot={
        <div className="flex items-center gap-1">
          {tabs.map((tt) => (
            <button
              key={tt.id}
              data-testid={`chat-tab-${tt.id}`}
              onClick={() => setTab(tt.id)}
              className={`font-pixel text-[13px] tracking-[0.18em] px-2 py-[1px] border ${
                tab === tt.id
                  ? "text-white border-[var(--navi-cyan)] bg-[rgba(0,240,255,0.1)]"
                  : "text-cyan-300 border-[var(--navi-cyan-soft)]"
              }`}
            >
              {tt.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="navi-console flex-1 min-h-0 overflow-auto p-3 text-[15px] leading-relaxed">
        {tab === "chat" &&
          messages.map((m) => (
            <div key={m.id} data-testid={`chat-msg-${m.id}`} className="mb-1">
              <span className="text-[var(--navi-muted)]">[{ts(m.timestamp)}]</span>{" "}
              {m.role === "user" ? (
                <span className="text-[var(--navi-warn)]">[usuario]</span>
              ) : m.role === "assistant" ? (
                <span className="text-[var(--navi-online)]">[asistente]</span>
              ) : (
                <span className="text-[var(--navi-purple)]">[sistema]</span>
              )}{" "}
              <span className="text-cyan-100 whitespace-pre-wrap">{m.content.replace(/^\[(usuario|asistente|sistema)\]\s?/i, "")}</span>
            </div>
          ))}
        {tab === "share" && (
          <div className="text-cyan-300">
            &gt; compartir :: módulo offline en MVP. Conecte un backend para habilitar.
            <div className="cursor-blink inline-block" />
          </div>
        )}
        {tab === "command" && (
          <div className="text-cyan-300 font-terminal text-sm space-y-1">
            <div>$ help — listar comandos</div>
            <div>$ modules — estado de módulos</div>
            <div>$ tasks — cola activa</div>
            <div>$ audit — generar informe de auditoría</div>
            <div className="cursor-blink inline-block" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-[var(--navi-cyan-soft)] px-2 py-2 flex flex-col gap-2 bg-[var(--navi-panel)]">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-cyan-400 text-base">{">"}</span>
          <input
            data-testid="chat-input"
            className="navi-input flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={t("typeMessage")}
          />
          <button data-testid="chat-send-btn" className="navi-btn" onClick={send}>
            {t("send")}
          </button>
        </div>
        <div className="flex items-center justify-between text-[11px] font-pixel tracking-[0.16em]">
          <div className="flex gap-2">
            <button
              data-testid="chat-copy-report"
              className="navi-btn"
              onClick={() => {
                navigator.clipboard.writeText(
                  messages.map((m) => `[${ts(m.timestamp)}] ${m.role}: ${m.content}`).join("\n"),
                );
                toast.success("Informe copiado al portapapeles");
              }}
            >
              {t("copyReport")}
            </button>
            <button
              data-testid="chat-replay-voice"
              className="navi-btn"
              onClick={() => toast("Voz no disponible en MVP (placeholder)")}
            >
              {t("replayVoice")}
            </button>
            <button
              data-testid="chat-share-btn"
              className="navi-btn"
              onClick={() => toast("Compartir: placeholder")}
            >
              {t("shareBtn")}
            </button>
          </div>
          <span data-testid="chat-char-count" className="text-cyan-400">
            {input.length}/{MAX_CHARS} {t("charsLeft")}
          </span>
        </div>
      </div>
    </RetroWindow>
  );
};
