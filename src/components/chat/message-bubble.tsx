import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  isFirst: boolean;
  isLast: boolean;
  isOnly: boolean;
}

export function MessageBubble({
  content,
  isUser,
  isFirst,
  isLast,
  isOnly,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 text-sm break-words",
        isUser
          ? "bg-primary text-primary-foreground ml-auto max-w-[90%]"
          : "bg-muted max-w-[90%]",
        // Single message
        isOnly &&
          (isUser
            ? "rounded-tl-2xl rounded-tr-sm rounded-br-xl rounded-bl-xl"
            : "rounded-tl-sm rounded-tr-2xl rounded-br-xl rounded-bl-xl"),
        // First message in group
        isFirst &&
          !isOnly &&
          (isUser
            ? "rounded-tl-2xl rounded-tr-sm rounded-br-xl rounded-bl-xl"
            : "rounded-tl-sm rounded-tr-2xl rounded-br-xl rounded-bl-xl"),
        // Middle message
        !isFirst && !isLast && "rounded-xl",
        // Last message in group
        isLast &&
          !isFirst &&
          (isUser ? "rounded-xl rounded-tr-sm" : "rounded-xl rounded-tl-sm"),
      )}
    >
      {content}
    </div>
  );
}
