import { motion } from "framer-motion";

export function LoadingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex gap-1.5"
    >
      <div className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center self-end rounded-full text-xs">
        🦍
      </div>
      <div className="bg-muted rounded-tl-sm rounded-tr-2xl rounded-br-xl rounded-bl-xl px-3 py-1.5">
        <div className="flex space-x-1">
          <div className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" />
          <div className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.2s]" />
          <div className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.4s]" />
        </div>
      </div>
    </motion.div>
  );
}
