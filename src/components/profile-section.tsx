"use client";

import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import IdentityWrapper from "./identity-wrapper";

export default function ProfileSection() {
  const { isConnected } = useAccount();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-xl px-2 py-4 md:grow">
      {isConnected ? (
        <>
          <IdentityWrapper />
          <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-gray-50/50 p-6 backdrop-blur-sm">
            <motion.h1
              className="mb-4 text-center text-4xl font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 1.0,
                rotate: { duration: 0.7, delay: 0.8 },
              }}
            >
              Looking a bit bare?
            </motion.h1>
            <div className="flex flex-col items-center">
              <p className="text-center">
                Go to{" "}
                <a
                  href="https://base.or/names"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-bold hover:text-[#0052ff]"
                >
                  Basename
                </a>{" "}
                to add some details to your profile. <br /> Then see it
                everywhere.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-48 w-full max-w-md items-center justify-center rounded-lg bg-gray-50/5 p-6 text-center text-gray-600/90 ring-1 shadow-sm ring-gray-100/10 backdrop-blur-sm dark:bg-gray-800/5 dark:text-gray-300/90">
          Please connect your account to see your profile
        </div>
      )}
    </section>
  );
}
