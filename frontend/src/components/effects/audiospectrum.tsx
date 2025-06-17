"use client"

import { useEffect, useRef } from "react"
import { LegacyAnimationControls, motion } from "motion/react"

interface AudioSpectrumProps {
  isPlaying: boolean
  controls: LegacyAnimationControls
}

export function AudioSpectrum({ isPlaying, controls }: AudioSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Get colors based on theme
    const isDarkMode = document.documentElement.classList.contains("dark")

    const lightModeColors = ["#a2d2ff", "#bde0fe", "#ffafcc", "#cdb4db"]

    const selectRandomColor = () => {
      const colorIndex = Math.floor(Math.random() * 4)
      console.log("color Index", colorIndex)
      return lightModeColors[colorIndex]
    }

    
    // Use simple black/white colors for Vercel-like aesthetic
    const primaryColor = isDarkMode ? "#ffffff" : selectRandomColor()

    // Number of bars
    const barCount = 64
    const barWidth = canvas.width / barCount
    const barGap = 2

    // Animation frame
    let animationId: number
    let analyzerData: number[] = []

    // Generate random data for visualization
    const generateRandomData = () => {
      const data = []
      for (let i = 0; i < barCount; i++) {
        // Create a more subtle wave pattern with less randomness for Vercel-like minimalism
        const height = isPlaying
          ? 0.1 + Math.sin(i * 0.2 + Date.now() * 0.0005) * 0.15 + Math.random() * 0.1
          : 0.05 + Math.sin(i * 0.2) * 0.03
        data.push(height)
      }
      return data
    }

    // Draw visualization
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Generate new data
      analyzerData = generateRandomData()

      // Draw bars
      ctx.fillStyle = primaryColor

      for (let i = 0; i < barCount; i++) {
        const barHeight = analyzerData[i] * canvas.height
        const x = i * (barWidth + barGap)
        const y = canvas.height - barHeight

        // Draw thin bars for minimalist look
        ctx.fillRect(x, y, barWidth, barHeight)
      }

      animationId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying])

  return (
    <motion.div className="w-full h-8 overflow-hidden" animate={controls}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

