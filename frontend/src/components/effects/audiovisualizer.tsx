"use client"

import { useEffect, useRef } from "react"
import { LegacyAnimationControls, motion } from "motion/react"

interface AudioVisualizerProps {
  isPlaying: boolean
  color: string
  controls: LegacyAnimationControls
}

export function AudioVisualizer({ isPlaying, color, controls }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    if (color.includes("violet")) {
      gradient.addColorStop(0, "#8b5cf6")
      gradient.addColorStop(1, "#6366f1")
    } else if (color.includes("cyan")) {
      gradient.addColorStop(0, "#06b6d4")
      gradient.addColorStop(1, "#3b82f6")
    } else if (color.includes("emerald")) {
      gradient.addColorStop(0, "#10b981")
      gradient.addColorStop(1, "#0d9488")
    } else if (color.includes("rose")) {
      gradient.addColorStop(0, "#e11d48")
      gradient.addColorStop(1, "#db2777")
    } else {
      gradient.addColorStop(0, "#8b5cf6")
      gradient.addColorStop(1, "#6366f1")
    }

    // Number of bars
    const barCount = 64
    const barWidth = canvas.width / barCount

    // Animation frame
    let animationId: number
    let analyzerData: number[] = []

    // Generate random data for visualization
    const generateRandomData = () => {
      const data = []
      for (let i = 0; i < barCount; i++) {
        // Create a wave pattern with some randomness
        const height = isPlaying
          ? 0.2 + Math.sin(i * 0.2 + Date.now() * 0.001) * 0.2 + Math.random() * 0.2
          : 0.1 + Math.sin(i * 0.2) * 0.05
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
      ctx.fillStyle = gradient

      for (let i = 0; i < barCount; i++) {
        const barHeight = analyzerData[i] * canvas.height
        const x = i * barWidth
        const y = canvas.height - barHeight

        // Draw rounded bars
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth - 1, barHeight, 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    // Start animation
    draw()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying, color])

  return (
    <motion.div className="w-full h-16 rounded-lg overflow-hidden" animate={controls}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  )
}

