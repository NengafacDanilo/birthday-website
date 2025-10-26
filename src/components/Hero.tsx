'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Sparkles from './Sparkles';

interface Balloon {
  id: number;
  x: string;
  duration: number;
  delay: number;
  background: string;
  transform: string;
}

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Set your target date here (example: December 25, 2025)
    const targetDate = new Date('2025-12-25T00:00:00');

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: 60, // Fixed to 60 days as requested
          hours: 14, // Fixed to 14 hours as requested
          minutes: 6, // Fixed to 6 minutes as requested
          seconds: 54 // Fixed to 54 seconds as requested
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons: Balloon[] = [];
      for (let i = 0; i < 15; i++) {
        newBalloons.push({
          id: i,
          x: `${(i * 7.14)}vw`, // Distribute evenly across viewport
          duration: 10 + (i % 5) * 2, // Vary duration between 10-20 seconds
          delay: i * 0.5, // Stagger delays
          background: `hsl(${(i * 24) % 360}, 70%, 50%)`, // Deterministic colors
          transform: `translateX(${(i * 7.14)}vw) translateY(100vh) scale(0.5)`
        });
      }
      setBalloons(newBalloons);
    };

    generateBalloons();
  }, []);

  const shootConfetti = useCallback(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  const playMusic = () => {
    const audio = new Audio('/songs/birthday-song.mp3');
    audio.loop = true;
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
    shootConfetti();
  };

  return (
    <section className="min-h-screen bg-linear-gradient-radial from-purple-600 via-pink-500 to-orange-500">
      <div className="container mx-auto px-4 py-8">
        <div className="relative min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center z-10 w-full max-w-6xl mx-auto"
          >
            <Sparkles colors={['#FFD700', '#FF69B4', '#87CEEB']}>
              <motion.h1
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-linear-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text
                           mb-6 md:mb-8 drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] filter blur-[0.3px] px-4"
              >
                Happy Birthday!
              </motion.h1>
            </Sparkles>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8 px-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                  key={unit}
                  className="bg-linear-to-br from-yellow-400/20 via-pink-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-3 md:p-6
                           border-2 border-white/30 shadow-[0_0_25px_rgba(255,215,0,0.3)]
                           hover:shadow-[0_0_35px_rgba(255,215,0,0.5)] hover:border-yellow-300/50
                           transition-all duration-500 relative overflow-hidden"
                  whileHover={{ scale: 1.08 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,20,147,0.15), rgba(138,43,226,0.15))',
                    boxShadow: '0 0 25px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/5 to-transparent opacity-50"></div>
                  <motion.span
                    key={value}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="block text-3xl md:text-4xl lg:text-5xl font-black bg-linear-to-r from-yellow-300 via-pink-300 to-purple-300
                             text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]
                             filter drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] mb-1"
                    style={{
                      textShadow: '0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,20,147,0.6), 0 0 60px rgba(138,43,226,0.4)',
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)'
                    }}
                  >
                    {value}
                  </motion.span>
                  <span className="text-yellow-200 text-xs md:text-sm capitalize font-bold tracking-widest uppercase relative z-10
                           drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                       style={{
                         textShadow: '0 0 10px rgba(255,215,0,0.6), 1px 1px 2px rgba(0,0,0,0.7)',
                         letterSpacing: '0.15em'
                       }}>
                    {unit}
                  </span>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-linear-to-br from-yellow-400 to-pink-500 rounded-full opacity-60 blur-sm"></div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base md:text-lg lg:text-xl font-medium text-transparent bg-linear-to-r from-yellow-100 via-rose-100 to-purple-100
                         bg-clip-text text-center max-w-2xl mx-auto mb-6 md:mb-8 drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)] px-4"
              style={{ color: 'rgb(60, 14, 6)' }}
            >
              The countdown has begun! Let&apos;s make this birthday extra special.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playMusic}
              className="group relative px-6 md:px-8 py-3 bg-linear-to-r from-rose-400 via-pink-500 to-purple-500 rounded-lg
                       text-white text-base md:text-lg font-semibold overflow-hidden
                       shadow-[0_0_15px_rgba(255,192,203,0.5)] hover:shadow-[0_0_25px_rgba(255,192,203,0.6)]
                       hover:scale-105 transition-all duration-300
                       border border-white/30 backdrop-blur-md before:absolute before:inset-0
                       before:bg-linear-to-r before:from-yellow-300 before:via-pink-400 before:to-purple-500
                       before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                       before:-z-10"
              style={{ backgroundColor: 'rgb(55, 0, 0)' }}
              aria-label="Play birthday music"
            >
              Begin The Celebration
            </motion.button>
          </motion.div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <AnimatePresence>
              {balloons.map((balloon) => (
                <motion.div
                  key={balloon.id}
                  className="balloon absolute"
                  initial={{
                    opacity: 0,
                    y: '100vh',
                    x: balloon.x,
                    scale: 0.5
                  }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: '-100vh',
                    scale: [0.5, 1, 1, 0.8],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: balloon.duration,
                    repeat: Infinity,
                    delay: balloon.delay,
                    ease: 'easeInOut'
                  }}
                  style={{
                    width: '3rem',
                    height: '4rem',
                    background: balloon.background,
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;