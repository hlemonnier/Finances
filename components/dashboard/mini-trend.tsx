"use client"

import { useEffect, useRef } from "react"

interface MiniTrendProps {
  data: number[]
  width?: number
  height?: number
  color?: string
}

export function MiniTrend({ data, width = 42, height = 18, color = "#16a34a" }: MiniTrendProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Calculate points
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * width,
      y: height - ((value - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * height,
    }))

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })

    ctx.stroke()
  }, [data, width, height, color])

  return <canvas ref={canvasRef} width={width} height={height} className="opacity-50" />
}

