'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Twitter, Menu, ChevronRight, ArrowRight } from 'lucide-react'

const GlowingButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const glowRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (glowRef.current) {
      const rect = glowRef.current.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }
  }

  return (
    <motion.button
      ref={glowRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className="relative px-8 py-4 bg-cyan-500 text-gray-900 font-bold rounded-full overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-cyan-400 opacity-50 blur-2xl"
        style={{
          x,
          y,
          scale: 2,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <span className="relative z-10 uppercase tracking-wide">{children}</span>
    </motion.button>
  )
}

const FloatingIcon = ({ icon: Icon }: { icon: React.ElementType }) => {
  const y = useMotionValue(0)
  const ySpring = useSpring(y, { stiffness: 100, damping: 10 })

  useEffect(() => {
    const intervalId = setInterval(() => {
      y.set(Math.random() * 10 - 5)
    }, 2000)

    return () => clearInterval(intervalId)
  }, [y])

  return (
    <motion.div style={{ y: ySpring }}>
      <Icon className="h-6 w-6" />
    </motion.div>
  )
}

const GradientText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 text-transparent bg-clip-text ${className}`}>
    {children}
  </span>
)

export default function FancyFuturisticLanding() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const controls = useAnimation()

  useEffect(() => {
    const timer = setTimeout(() => setIsVideoLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const handleExploreClick = () => {
    console.log("Explore My Work clicked")
  }

  const handleContactClick = () => {
    console.log("Initiate Contact clicked")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg py-4 px-6 fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-wider">
            <GradientText>BY</GradientText>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="hover:text-cyan-400 transition-colors uppercase tracking-wide">About</Link>
            <Link href="#contact" className="hover:text-cyan-400 transition-colors uppercase tracking-wide">Contact</Link>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-cyan-400"
            onClick={toggleMenu}
          >
            <Menu />
          </Button>
        </div>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-2"
          >
            <Link href="#about" className="block hover:text-cyan-400 transition-colors uppercase tracking-wide">About</Link>
            <Link href="#contact" className="block hover:text-cyan-400 transition-colors uppercase tracking-wide">Contact</Link>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <div className="container mx-auto px-4 relative z-10 mt-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              transition={{ duration: 0.8 }}
              style={{ y: heroTextY }}
              className="text-center md:text-left w-full md:w-1/2 mb-8 md:mb-0"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <GradientText>BAHA YALDIZ</GradientText>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-3xl mb-4 text-gray-300 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                AI Researcher and Developer
              </motion.p>
              <motion.p 
                className="text-lg md:text-xl mb-8 text-gray-400 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Action and motion for embodied agents.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <GlowingButton onClick={handleExploreClick}>
                  Explore My Work <ChevronRight className="ml-2 inline-block" />
                </GlowingButton>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-full md:w-1/2 flex justify-center md:justify-end"
            >
              <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-lg overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="videos/herovid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Me Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <Card className="overflow-hidden bg-gray-800 border-gray-700 max-w-xs mx-auto">
              <Image
                src="/images/baha.png?height=300&width=300"
                alt="BAHA YALDIZ"
                width={300}
                height={300}
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="p-4 flex justify-center space-x-4">
                <Link href="https://github.com/beyaldiz" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Github className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://linkedin.com/in/beyaldiz" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://twitter.com/beyaldiz" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Twitter className="h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-2/3"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Growing up watching my brother playing video games,
              I developed a childhood trauma due to being exposed to crappy
              video game animations.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Fortunately, during my undergraduate years, I had the 
              chance to do a research internship at <Link href="https://visualai.kaist.ac.kr/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline"><strong>KAIST Visual AI Group</strong></Link> on <strong>marker-based motion capture solving </strong>
               advised by <Link href="https://mhsung.github.io" target="_blank" rel="noopener noreferrer" className="hover:underline"><strong>Dr. Minhyuk Sung</strong></Link>.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Later, I interned at <Link href="https://fluentt.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline"><strong>FluentT Inc.</strong></Link>, where I developed a 
              <strong> co-speech facial animation generation</strong> model using diffusion.
              Now, I work there full-time as AI Researcher, 
              specializing in <strong>co-speech gesture</strong> and <strong>human motion generation</strong>.
            </p>
            <Button onClick={handleContactClick} variant="secondary" className="mt-8">
              Get in Touch <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 <GradientText>BAHA YALDIZ</GradientText>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
