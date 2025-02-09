"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createMessage = (
    content: string,
    role: "user" | "assistant",
  ): Message => ({
    id: Date.now().toString(),
    content,
    role,
  });

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, createMessage(content, "user")]);

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          input: content,
          conversation_id: 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter(Boolean);

        for (const line of lines) {
          const event = JSON.parse(line);
          if (event.event === "agent" && event.data) {
            setMessages((prev) => [
              ...prev,
              createMessage(event.data, "assistant"),
            ]);
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "Sorry, something went wrong. Please try again.",
          "assistant",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
