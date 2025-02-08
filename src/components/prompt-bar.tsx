"use client";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "~/contexts/chat-context";
import { cn } from "~/lib/utils";

interface PromptBarProps {
  className?: string;
}

export function PromptBar({ className }: PromptBarProps) {
  const { input, isLoading, handleSubmit, setInput } = useChat();

  return (
    <div
      className={cn("bg-background/80 border-t backdrop-blur-sm", className)}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
}
