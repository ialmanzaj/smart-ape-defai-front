"use client";

import { Card, CardContent } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "~/contexts/chat-context";

export function ChatMessages() {
  const { isLoading, messages } = useChat();

  return (
    <Card className="bg-background/80 flex-1 rounded-none border-0 backdrop-blur-sm">
      <CardContent className="h-full flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted flex space-x-2 rounded-lg px-4 py-2">
              <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full" />
              <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:0.2s]" />
              <div className="bg-muted-foreground/50 h-2 w-2 animate-bounce rounded-full [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
