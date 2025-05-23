'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathProps {
  formula: string
}

export const Math = ({ formula}: MathProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(
        formula,
        containerRef.current,
        {
          displayMode: false,
          throwOnError: false,
          trust: true,
          strict: false
        }
      )
    }
  }, [formula])

  return <div ref={containerRef} className={'inline'} />
}