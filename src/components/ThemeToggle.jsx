import { Moon } from "lucide-react";

const ThemeToggle = () => (
  <span title="Dark interface" className="hidden items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-zinc-400 sm:inline-flex">
    <Moon className="size-3.5" /> Dark
  </span>
);

export default ThemeToggle;
