import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import { MessageBubble } from "./message-bubble";
import type { Message } from "~/contexts/chat-context";

interface MessageGroupProps {
  messages: Message[];
}

export function MessageGroup({ messages }: MessageGroupProps) {
  const isUser = messages[0].role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={cn("flex gap-2", isUser ? "flex-row-reverse" : "flex-row")}
    >
      <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center self-end rounded-full text-xs">
        {isUser ? "👤" : "🦍"}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            content={message.content}
            isUser={isUser}
            isFirst={index === 0}
            isLast={index === messages.length - 1}
            isOnly={messages.length === 1}
          />
        ))}
      </div>
    </motion.div>
  );
}
