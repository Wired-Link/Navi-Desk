import React, { useState } from "react";
import { TopSystemBar } from "../components/TopSystemBar";
import { StatusFooter } from "../components/StatusFooter";
import { TerminalChat } from "../components/TerminalChat";
import { AvatarVideoPanel } from "../components/AvatarVideoPanel";
import { AudioConsole } from "../components/AudioConsole";
import { ModulesPanel } from "../components/ModulesPanel";
import { TaskQueuePanel } from "../components/TaskQueuePanel";
import { LogViewer } from "../components/LogViewer";
import { PromptPanel } from "../components/PromptPanel";
import { ToolsPanel } from "../components/ToolsPanel";
import { SecretsPanel } from "../components/SecretsPanel";
import { RecoveryPanel } from "../components/RecoveryPanel";
import { SettingsPanel } from "../components/SettingsPanel";
import { SecurityAuditPanel } from "../components/SecurityAuditPanel";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState("overview");

  const SecondaryPanel: React.FC = () => {
    switch (tab) {
      case "modules":
        return <ModulesPanel />;
      case "tasks":
        return <TaskQueuePanel />;
      case "logs":
        return <LogViewer />;
      case "prompts":
        return <PromptPanel />;
      case "tools":
        return <ToolsPanel />;
      case "secrets":
        return <SecretsPanel />;
      case "recovery":
        return <RecoveryPanel />;
      case "settings":
        return <SettingsPanel />;
      case "security":
        return <SecurityAuditPanel />;
      default:
        return <LogViewer />;
    }
  };

  return (
    <div className="crt-overlay crt-flicker h-screen w-screen flex flex-col gap-2 p-2">
      <TopSystemBar activeTab={tab} onTab={setTab} />

      {tab === "overview" ? (
        <div className="flex-1 min-h-0 grid grid-rows-[1fr_300px] gap-2">
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-2 min-h-0">
            <div className="col-span-12 lg:col-span-6 min-h-0">
              <TerminalChat />
            </div>
            <div className="col-span-12 lg:col-span-3 min-h-0">
              <LogViewer />
            </div>
            <div className="col-span-12 lg:col-span-3 min-h-0 grid grid-rows-[1fr_180px] gap-2">
              <div className="min-h-0">
                <AvatarVideoPanel />
              </div>
              <div className="min-h-0">
                <AudioConsole />
              </div>
            </div>
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-12 gap-2 min-h-0">
            <div className="col-span-12 lg:col-span-7 min-h-0">
              <ModulesPanel />
            </div>
            <div className="col-span-12 lg:col-span-5 min-h-0">
              <TaskQueuePanel />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-4 min-h-0">
            <TerminalChat />
          </div>
          <div className="col-span-12 lg:col-span-5 min-h-0">
            <SecondaryPanel />
          </div>
          <div className="col-span-12 lg:col-span-3 min-h-0 grid grid-rows-[1fr_180px] gap-2">
            <div className="min-h-0">
              <AvatarVideoPanel />
            </div>
            <div className="min-h-0">
              <AudioConsole />
            </div>
          </div>
        </div>
      )}

      <StatusFooter />
    </div>
  );
};

export default Dashboard;
