'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import type { Project } from '../utils/projectLoader'
import LoadingSpinner from './LoadingSpinner'

function ProjectCard({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((current) => (current + 1) % project.images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [project.images.length])

  return (
    <motion.div
      className="relative aspect-video rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={project.images[currentImage]}
        alt={project.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-bold text-white">{project.title}</h3>
      </div>
    </motion.div>
  )
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  return (
    <section className="py-20 px-4 bg-black" id="projects">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </section>
  )
} 