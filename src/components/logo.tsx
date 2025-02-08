"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "icon";
}

export default function Logo({ variant = "full" }: LogoProps) {
  return variant === "full" ? (
    <div className="flex items-center gap-2 rounded-lg bg-black px-4 py-2">
      <Link href="/" className="text-xl font-semibold text-white">
        Smart Ape
      </Link>
      <Link href="/" className="cursor-pointer">
        <Image
          src="/ape.png"
          alt="Ape"
          width={32}
          height={32}
          className="rounded-lg"
        />
      </Link>
    </div>
  ) : (
    <Link href="/" className="cursor-pointer">
      <Image
        src="/ape.png"
        alt="Ape"
        width={100}
        height={100}
        className="rounded-lg"
      />
    </Link>
  );
}
