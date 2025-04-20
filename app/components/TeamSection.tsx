'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 px-4 bg-gray-900">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-16">Meet the Team</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-64 h-64 relative rounded-full overflow-hidden">
            <Image
              src="/img/profile.jpg"
              alt="Team Member"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-6">
            <p className="text-lg leading-relaxed">
              I've been working in VFX and CGI since 2008, starting with freelance projects before moving on to major feature films and TV series...
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Companies I've worked at:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Lead FX Technical Director @ MPC</li>
                <li>Lead FX Technical Director / Supervisor @ Ghost VFX</li>
                <li>Lead FX Technical Director / Supervisor @ Outpost VFX</li>
                <li>FX Technical Director @ One Of Us</li>
                <li>CG Generalist @ Storyline Studio</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 