import type React from "react"

interface ResizableHandleProps {
  onMouseDown: (e: React.MouseEvent) => void
  side: "left" | "right"
}

export function ResizableHandle({ onMouseDown, side }: ResizableHandleProps) {
  return <div onMouseDown={onMouseDown} className={`resize-handle resize-handle-${side}`} />
}

