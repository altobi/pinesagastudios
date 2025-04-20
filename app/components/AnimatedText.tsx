'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedTextProps {
  words: string[]
}

export default function AnimatedText({ words }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % words.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <div className="h-20 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          {words[currentIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  )
} 