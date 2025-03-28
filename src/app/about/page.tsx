"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "~/components/logo";

export default function AboutPage() {
  const router = useRouter();

  return (
    <section className="flex h-auto flex-col items-center justify-center rounded-xl bg-transparent px-2 py-4 font-sans md:h-[780px] md:grow">
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-2xl font-bold">About Smart Ape</h1>
        <p>Keep aping!</p>
        <Logo variant="icon" />
      </div>
    </section>
  );
}
