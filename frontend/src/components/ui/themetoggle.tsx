"use client"

import Loader from "@/components/loader";
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// interface ModeToggleProps {
//   currentTheme: "dark" | "light"
//   toggleTheme: () => void
// }

export function ModeToggle() {
    const {setTheme, resolvedTheme} = useTheme();

    if(!resolvedTheme){
      return <div>
       <Loader />
      </div>
    }

    
  return (
    <button
      onClick={() => setTheme(() => resolvedTheme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden border border-[var(--border)] bg-transparent hover:bg-[var(--accent)]/50 size-10 rounded-md flex items-center justify-center"
    >
      <motion.div
        initial={false}
        animate={{
          y: resolvedTheme === "dark" ? 0 : -30,
          opacity: resolvedTheme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon size={18} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          y: resolvedTheme === "light" ? 0 : 30,
          opacity: resolvedTheme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun size={18} />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

