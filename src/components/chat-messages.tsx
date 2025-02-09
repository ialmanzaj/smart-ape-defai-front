"use client";

import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { AnimatePresence } from "framer-motion";
import { useChat } from "~/contexts/chat-context";
import { MessageGroup } from "./chat/message-group";
import { LoadingBubble } from "./chat/loading-bubble";

export function ChatMessages() {
  const { isLoading, messages } = useChat();

  // Group consecutive messages from the same role
  const messageGroups = messages.reduce<Array<typeof messages>>(
    (groups, message) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup?.length && lastGroup[0]?.role === message.role) {
        lastGroup.push(message);
      } else {
        groups.push([message]);
      }
      return groups;
    },
    [],
  );

  return (
    <Card className="bg-background/80 flex-1 rounded-none border-0 backdrop-blur-sm">
      <div className="from-background/10 to-background/80 absolute inset-0 bg-gradient-to-b" />
      <ScrollArea className="relative h-[calc(100vh-180px)] pb-4">
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-3 px-4 pt-4">
          <AnimatePresence>
            {messageGroups.map((group) => (
              <MessageGroup
                key={group[0]?.id ?? `group-${Date.now()}`}
                messages={group}
              />
            ))}
            {isLoading && <LoadingBubble />}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </Card>
  );
}
