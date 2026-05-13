import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  rightSlot?: React.ReactNode;
  testId?: string;
}

export const RetroWindow: React.FC<Props> = ({
  title,
  subtitle,
  children,
  className = "",
  contentClassName = "",
  rightSlot,
  testId,
}) => {
  return (
    <div
      data-testid={testId}
      className={`navi-panel flex flex-col h-full ${className}`}
    >
      <div className="navi-chrome flex items-center justify-between px-3 py-1 select-none">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-cyan-300 text-base navi-text-glow tracking-[0.18em]">
            [ {title} ]
          </span>
          {subtitle ? (
            <span className="font-mono-r text-[10px] text-cyan-500/70 uppercase tracking-widest">
              {subtitle}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {rightSlot}
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-[var(--navi-online)] shadow-[0_0_6px_var(--navi-online)]" />
            <span className="inline-block w-2 h-2 bg-[var(--navi-warn)] shadow-[0_0_6px_var(--navi-warn)]" />
            <span className="inline-block w-2 h-2 bg-[var(--navi-error)] shadow-[0_0_6px_var(--navi-error)]" />
          </div>
        </div>
      </div>
      <div className={`flex-1 min-h-0 overflow-hidden ${contentClassName}`}>{children}</div>
    </div>
  );
};
