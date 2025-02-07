"use client";

import { useTheme } from "~/lib/providers";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 fixed top-4 right-4 rounded-lg p-2 shadow-sm"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
