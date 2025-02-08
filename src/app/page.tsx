"use client";

import { ChatMessages } from "~/components/chat-messages";

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4">
      <ChatMessages />
    </div>
  );
}
