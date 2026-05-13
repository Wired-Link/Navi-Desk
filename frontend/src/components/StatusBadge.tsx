import React from "react";

type Variant = "online" | "offline" | "warn" | "error" | "info" | "purple";

const colors: Record<Variant, string> = {
  online: "text-[var(--navi-online)] border-[var(--navi-online)]",
  offline: "text-[var(--navi-muted)] border-[var(--navi-muted)]",
  warn: "text-[var(--navi-warn)] border-[var(--navi-warn)]",
  error: "text-[var(--navi-error)] border-[var(--navi-error)]",
  info: "text-[var(--navi-cyan)] border-[var(--navi-cyan-soft)]",
  purple: "text-[var(--navi-purple)] border-[var(--navi-purple)]",
};

export const StatusBadge: React.FC<{
  variant?: Variant;
  children: React.ReactNode;
  testId?: string;
}> = ({ variant = "info", children, testId }) => {
  return (
    <span
      data-testid={testId}
      className={`inline-flex items-center font-pixel text-xs px-2 py-[1px] border ${colors[variant]} tracking-[0.16em] uppercase`}
    >
      {children}
    </span>
  );
};
