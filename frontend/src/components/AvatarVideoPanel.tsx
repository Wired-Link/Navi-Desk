import React from "react";
import { RetroWindow } from "./RetroWindow";

export const AvatarVideoPanel: React.FC = () => {
  return (
    <RetroWindow
      testId="avatar-video-panel"
      title="AVATAR :: NAVI"
      subtitle="ch02 / video"
      contentClassName="p-2"
    >
      <div className="relative w-full h-full overflow-hidden bg-black border border-[var(--navi-cyan-soft)]">
        <img
          src="https://images.unsplash.com/photo-1765445774035-9bb028f7b205?crop=entropy&cs=srgb&fm=jpg&q=80&w=600"
          alt="signal"
          className="w-full h-full object-cover opacity-70"
          style={{ filter: "hue-rotate(160deg) contrast(1.2) saturate(1.4)" }}
        />
        <div className="vhs-noise" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0) 3px, rgba(0,0,0,0.35) 4px, rgba(0,0,0,0.35) 5px)",
          }}
        />
        {/* HUD labels */}
        <div className="absolute top-2 left-2 font-pixel text-white text-base tracking-[0.18em] navi-text-glow">
          ▶ PLAY
        </div>
        <div className="absolute top-2 right-2 font-pixel text-[var(--navi-warn)] text-base tracking-[0.18em]">
          CH02
        </div>
        <div className="absolute bottom-2 left-2 font-pixel text-[var(--navi-online)] text-sm tracking-[0.2em]">
          ● SIGNAL
        </div>
        <div className="absolute bottom-2 right-2 font-pixel text-cyan-300 text-sm tracking-[0.2em] navi-text-glow">
          CONNECTED
        </div>
        {/* Outline */}
        <div className="absolute inset-0 border border-cyan-400/20 pointer-events-none" />
      </div>
    </RetroWindow>
  );
};
