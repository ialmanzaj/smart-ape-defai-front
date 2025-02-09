"use client";

import { useState } from "react";
import { useChat } from "~/contexts/chat-context";
import { Send } from "lucide-react";
import { cn } from "~/lib/utils";

interface PromptBarProps {
  className?: string;
}

export function PromptBar({ className }: PromptBarProps) {
  const { sendMessage, isLoading } = useChat();
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput("");
  };

  return (
    <div
      className={cn("bg-background/80 border-t backdrop-blur-sm", className)}
    >
      <div className="mx-auto w-full max-w-4xl px-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="bg-background/50 focus:ring-primary flex-1 rounded-lg border px-4 py-2 outline-none focus:ring-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-10 w-10 items-center justify-center rounded-lg disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
