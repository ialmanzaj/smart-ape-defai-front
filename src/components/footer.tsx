"use client";

import {
  DISCORD_LINK,
  FIGMA_LINK,
  GITHUB_LINK,
  DOCS_LINK,
  TWITTER_LINK,
} from "src/links";
import { motion } from "framer-motion"; // Import motion from framer-motion
import ArrowSvg from "src/svg/arrow-svg";

const docLinks = [
  { href: DOCS_LINK, title: "Docs" },
  { href: GITHUB_LINK, title: "Github" },
  { href: DISCORD_LINK, title: "Discord" },
  { href: FIGMA_LINK, title: "Figma" },
  { href: TWITTER_LINK, title: "X" },
];

export default function Footer() {
  return (
    <section className="bg-background/80 fixed bottom-0 flex w-full items-center justify-center border-t border-gray-100/10 px-[24px] backdrop-blur-sm dark:bg-gray-900/80">
      <div className="flex w-full max-w-4xl items-center justify-between px-[30px] py-[10px]">
        <aside className="group flex items-center">
          <h3 className="group-hover:text-foreground text-sm text-gray-500 transition-colors dark:text-white">
            Built with love with{" "}
            <a
              href={DOCS_LINK}
              target="_blank"
              rel="noreferrer"
              title="OnchainKit"
              className="text-foreground font-medium transition-colors hover:text-purple-500 dark:hover:text-purple-300"
            >
              OnchainKit
            </a>
          </h3>
        </aside>
        <ul className="flex items-center gap-[30px]">
          {docLinks.map(({ href, title }, index) => (
            <li className="flex" key={href || index}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                title={title}
                className="hover:text-foreground group flex items-center gap-[8px] text-sm text-gray-500 transition-colors dark:text-white"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <p>{title}</p>
                <ArrowSvg className="group-hover:text-foreground h-3 w-3 text-gray-500 dark:text-white" />
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
