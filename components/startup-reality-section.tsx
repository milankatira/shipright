'use client'

import { motion } from 'framer-motion'
import { Laugh, Meh, Frown } from 'lucide-react'

export function StartupRealitySection() {
  const steps = [
    { emoji: Laugh, text: 'Launch new feature', delay: 0.2 },
    { emoji: Meh, text: 'But nothing happens', delay: 0.4 },
    { emoji: Frown, text: 'Lose motivation and quit', delay: 0.6 }
  ]

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] opacity-10"></div>
      <div className="container px-4 mx-auto max-w-screen-xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-thin text-white mb-16 leading-tight">
            <span className="text-white">80%</span> of startups fail
            <br />

            because founders build{' '}
            <br />
            <span className="relative font-bold">
              useless products
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gray-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <step.emoji className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-medium text-lg">{step.text}</p>

              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

