'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, ThumbsUp, Zap, Users, TrendingUp, BarChart, Check, Menu, Star, X, ArrowRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import AnimatedShinyText from '@/components/ui/animated-shiny-text'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { StartupRealitySection } from '@/components/startup-reality-section'
import PricingSection from '@/components/pricing-section'

const BackgroundGrid = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
    </div>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
          <Link className="flex items-center space-x-2" href="/">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <ThumbsUp className="h-8 w-8 text-gray-900" />
            </motion.div>
            <span className="font-bold text-xl text-gray-900">shipright</span>
          </Link>
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0 border-b md:border-0`}>
            <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SignedOut>
              <Button variant="ghost" className="hidden md:inline-flex">
                <Link href={'/sign-in'}>
                  Log in
                </Link>
              </Button>
              <Link href={'/sign-in'}>
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Collect Feedback For Free
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href={'/dashboard'}>

                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <BackgroundGrid />
        <HeroSection />
        <StartupRealitySection />
        {/* <LogoCloudSection /> */}
        <FeaturesSection />
        <DemoSection />
        <TestimonialsSection />
        {/* <PricingSection /> */}
        <PricingSection />
        <FaqSection />
        <CtaSection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 mx-auto max-w-screen-xl">
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=" text-gray-800 mb-8"
          >

            <div className="z-10 flex min-h-64 items-center justify-center">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Transform Insights into Impact.</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Ship features your users{" "}
            <span className="relative">
              <span className="bg-gray-800 text-white px-2 rounded">
                actually want
              </span>

            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Collect feedback, prioritize features, and make data-driven product decisions. All in one place.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:opacity-90"
            >
              Collect Feedback For Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative py-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl transform -rotate-1"></div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto relative">
            <div className="space-y-6">
              <FeatureVoteItem
                title="Dark mode support"
                description="My eyes hurt at night! Please add this."
                votes={48}
              />
              <FeatureVoteItem
                title="Mobile app"
                description="Would love to use this on the go!"
                votes={36}
              />
              <FeatureVoteItem
                title="API access"
                description="Need to integrate with our system"
                votes={29}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureVoteItem({ title, description, votes }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className={`transition-colors duration-200 ${isHovered ? 'bg-gray-100 text-gray-800' : ''}`}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Vote
        </Button>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          {votes}
        </span>
      </div>
    </motion.div>
  )
}


function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Get real-time insights on what your users want most."
    },
    {
      icon: Users,
      title: "User Engagement",
      description: "Keep your community involved in your product's evolution."
    },
    {
      icon: TrendingUp,
      title: "Data-Driven Decisions",
      description: "Prioritize features based on actual user demand."
    },
    {
      icon: BarChart,
      title: "Clear Roadmap",
      description: "Visualize your product's future with user-voted priorities."
    }
  ]

  return (
    <section id="features" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      <div className="container px-4 mx-auto max-w-screen-xl relative">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Empower Your Product Decisions
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="rounded-lg bg-gray-50 w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-gray-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-screen-xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Make data-driven product decisions
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Stop guessing what your users want. Get clear insights and prioritize your roadmap based on actual user feedback.
            </p>
            <ul className="space-y-4">
              {[
                "Collect and organize feedback automatically",
                "Prioritize features based on user votes",
                "Track feature requests and their status",
                "Share your roadmap with stakeholders"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <Check className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-600">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl transform rotate-3"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-4">
              <div className="aspect-video bg-gray-100 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      <div className="container px-4 mx-auto max-w-screen-xl relative">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Loved by product teams worldwide
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              quote: "Shipright has transformed how we prioritize our roadmap. It's like having a direct line to our users' needs.",
              author: "Alex Chen",
              role: "Product Lead at TechCorp"
            },
            {
              quote: "The insights we've gained from customer voting have been invaluable. Our team is more aligned than ever.",
              author: "Sarah Miller",
              role: "CEO at StartupX"
            },
            {
              quote: "Finally, a simple way to know exactly what to build next. Our product discussions are now data-driven.",
              author: "Michael Johnson",
              role: "CTO at InnovateCo"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg relative"
            >
              <div className="absolute top-0 left-0 transform -translate-y-4 -translate-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Star className="h-4 w-4 text-gray-800" />
                </div>
              </div>
              <div className="pt-4">
                <p className="text-gray-800 text-lg mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const faqs = [
    {
      question: "How does the voting system work?",
      answer: "Users can upvote features they want to see implemented. The more votes a feature gets, the higher it ranks on the board, helping you prioritize what to build next."
    },
    {
      question: "Can I integrate Shipright with other tools?",
      answer: "Yes, Shipright offers API access on our Pro and Enterprise plans, allowing you to integrate with your existing workflow tools."
    },
    {
      question: "Is there a limit to how many feature requests I can have?",
      answer: "No, all plans come with unlimited feature requests. The main difference between plans is the number of projects and monthly active users."
    },
    {
      question: "How do you handle user data and privacy?",
      answer: "We take data privacy seriously. All data is encrypted in transit and at rest. We comply with GDPR and offer additional security features like SSO for Enterprise customers."
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
      <div className="container px-4 mx-auto max-w-screen-xl relative">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {faq.question}
              </h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900"></div>
          <div className="relative px-6 py-12 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to build what your users really want?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Start collecting votes and shape your product roadmap today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-50">
                Collect Feedback For Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



