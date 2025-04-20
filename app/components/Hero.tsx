'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedText from './AnimatedText'
import type { Project } from '../utils/projectLoader'

export default function Hero() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, [])

  useEffect(() => {
    if (projects.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % projects.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <section className="relative h-screen">
      {/* Montage Background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {projects[currentImage] && (
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={projects[currentImage].poster}
                alt={projects[currentImage].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Logo and Animated Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div 
          className="w-64 h-64 relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/img/logo.png"
            alt="PineSaga Studios Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
        <AnimatedText 
          words={['Film', 'VFX', 'Storytelling', 'Innovation']} 
        />
      </div>
    </section>
  )
} 