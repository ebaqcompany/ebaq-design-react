import { SiClaude, SiOpenai, SiReplit } from "react-icons/si";

export const aiToolIcons = [
  { label: "ChatGPT", icon: <SiOpenai className="ai-tool-icon-chatgpt size-5" /> },
  { label: "Claude Code", icon: <SiClaude className="ai-tool-icon-claude size-5" /> },
  { label: "Cursor", src: "/ai-tools/cursor.svg" },
  { label: "Replit", icon: <SiReplit className="ai-tool-icon-replit size-5" /> },
  { label: "v0", src: "/ai-tools/v0.svg" },
] as const;

export const AIToolIconRow = () => (
  <div className="flex flex-wrap items-center gap-2" role="list" aria-label="AI tools I use">
    {aiToolIcons.map((tool) => <span key={tool.label} role="listitem" aria-label={tool.label} title={tool.label} className="inline-flex size-5 items-center justify-center">{"src" in tool ? <img src={tool.src} alt="" className="size-5 object-contain" /> : tool.icon}</span>)}
  </div>
);
