"use client"


import { motion } from "motion/react";
import { ModeToggle } from "./themetoggle";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
      <header className="m-auto md:max-w-7xl max-w-4xl p-4 pt-6">
        <div className="flex items-center justify-between cursor-pointer">
          <motion.div
             initial = {{opacity : 0, x : -50}}
             animate = {{opacity : 1, x : 0}}
             transition={{type : "spring", stiffness : 400, damping:12}}
              className="flex items-center gap-3" onClick={() => router.push("/")}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="size-10 bg-[var(--primary)] flex items-center justify-center"
            >
              <span className="text-xl font-bold text-[var(--primary-foreground)]">
                M
              </span>
            </motion.div>
            <motion.h1
            whileHover={{scale : 1.2}}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-2xl font-bold tracking-tight">Muxi</motion.h1>
          </motion.div>

          <ModeToggle />
        </div>
      </header>
  );
}
