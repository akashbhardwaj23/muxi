"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Component() {
  const [audioData, setAudioData] = useState<number[]>(new Array(64).fill(0))

  const generateAudioData = () => {
    const newData = Array.from({ length: 64 }, (_, index) => {
      const time = Date.now() * 0.001
      const frequency = index / 64

      const bass = Math.sin(time * 2 + frequency * 2) * 0.8
      const mid = Math.sin(time * 4 + frequency * 8) * 0.6
      const treble = Math.sin(time * 8 + frequency * 16) * 0.4
      const noise = (Math.random() - 0.5) * 0.2
      
      const emphasis = Math.pow(1 - frequency, 1.5)
      const combined = (bass + mid + treble + noise) * emphasis

      return Math.max(0, Math.min(1, (combined + 1) / 2))
    })

    setAudioData(newData)
  }

  useEffect(() => {
    const interval = setInterval(generateAudioData, 50)

    return () => clearInterval(interval)
  }, [])


  return (
    <div className="flex flex-col items-center justify-center bg-black p-8">
      <div className="w-full max-w-6xl">

        <div className="flex justify-center">
          <div className="relative w-20 h-20 bg-zinc-900/50 backdrop-blur-sm rounded-full border border-zinc-800 flex items-center justify-center">
            {audioData.slice(0, 32).map((value, index) => {
              const angle = (index / 32) * 360
              const radius = 80
              const length = value * 60
              const intensity = Math.floor(value * 255)

              return (
                <motion.div
                  key={`circular-${index}`}
                  className="absolute w-1 origin-bottom rounded-full"
                  style={{
                    background: `linear-gradient(to top, 
                      rgb(${intensity}, ${intensity}, ${intensity}), 
                      rgb(${Math.min(255, intensity + 100)}, ${Math.min(255, intensity + 100)}, ${Math.min(255, intensity + 100)})
                    )`,
                    transformOrigin: `center ${radius}px`,
                    left: "50%",
                    bottom: "50%",
                    marginLeft: "-2px",
                  }}
                  animate={{
                    height: Math.max(4, length),
                    rotate: angle,
                    opacity: 0.5 + value * 0.5,
                    boxShadow: `0 0 ${value * 15}px rgba(255, 255, 255, ${value * 0.4})`,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                />
              )
            })}

            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{
                scale: 1 + (audioData.reduce((a, b) => a + b, 0) / audioData.length) * 0.3,
                opacity: 0.6 + (audioData.reduce((a, b) => a + b, 0) / audioData.length) * 0.4,
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

      </div>
    </div>
  )
}
