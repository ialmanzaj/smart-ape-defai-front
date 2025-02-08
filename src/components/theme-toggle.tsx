"use client";

import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="bg-muted border-border inline-flex h-9 items-center justify-center rounded-full border p-1">
      <ToggleGroup type="single" value={theme} onValueChange={setTheme}>
        <ToggleGroupItem
          value="light"
          aria-label="Light mode"
          className="hover:bg-muted/70 data-[state=on]:bg-background flex h-7 w-7 items-center justify-center border-none transition-colors"
        >
          <Sun
            className={cn(
              "h-4 w-4 transition-opacity",
              theme === "light" ? "opacity-100" : "opacity-40",
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="dark"
          aria-label="Dark mode"
          className="hover:bg-muted/70 data-[state=on]:bg-background flex h-7 w-7 items-center justify-center border-none transition-colors"
        >
          <Moon
            className={cn(
              "h-4 w-4 transition-opacity",
              theme === "dark" ? "opacity-100" : "opacity-40",
            )}
          />
        </ToggleGroupItem>
        <ToggleGroupItem
          value="system"
          aria-label="System mode"
          className="hover:bg-muted/70 data-[state=on]:bg-background flex h-7 w-7 items-center justify-center border-none transition-colors"
        >
          <Laptop
            className={cn(
              "h-4 w-4 transition-opacity",
              theme === "system" ? "opacity-100" : "opacity-40",
            )}
          />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
