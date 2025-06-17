"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface AlbumArtworkProps {
  src: string
  alt: string
  isPlaying: boolean
  color: string
}

export function AlbumArtwork({ src, alt, isPlaying, color }: AlbumArtworkProps) {
  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-0 rounded-xl blur-xl opacity-30 transition-opacity duration-500",
          isPlaying ? "opacity-60" : "opacity-30",
          `bg-gradient-to-r ${color}`,
        )}
      />

      <div className="relative z-10">
        <motion.div
          animate={{
            rotate: isPlaying ? 360 : 0,
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
          className="w-full aspect-square rounded-xl overflow-hidden border-4 border-zinc-800/50 shadow-xl"
        >
          <Image src={src || "/placeholder.svg"} alt={alt} width={600} height={600} className="w-full h-full object-cover" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-zinc-800" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 rounded-full border border-zinc-700/20" />
            <div className="absolute w-2/3 h-2/3 rounded-full border border-zinc-700/20" />
            <div className="absolute w-1/2 h-1/2 rounded-full border border-zinc-700/20" />
            <div className="absolute w-1/3 h-1/3 rounded-full border border-zinc-700/20" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

