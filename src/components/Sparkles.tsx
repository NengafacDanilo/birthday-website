'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SparkleProps {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

const Sparkle = ({ color = '#FFF', size = 4, style }: SparkleProps) => {
  const path = `M${size / 2} 0 L${size} ${size / 2} L${size / 2} ${size} L0 ${size / 2} Z`;
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      style={style}
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: random(0.6, 1),
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <path d={path} fill={color} />
    </motion.svg>
  );
};

interface SparklesProps {
  children: React.ReactNode;
  colors?: string[];
  density?: number;
  speed?: number;
  minSize?: number;
  maxSize?: number;
}

export const Sparkles = ({ children, colors = ['#FFD700', '#FFA07A', '#FF69B4'] }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<Array<{ id: number; color: string; size: number; style: any }>>([]);

  useEffect(() => {
    const generateSparkle = () => ({
      id: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: random(10, 20),
      style: {
        position: 'absolute',
        top: `${random(-20, 120)}%`,
        left: `${random(-20, 120)}%`,
        zIndex: 2,
      },
    });

    const interval = setInterval(() => {
      const sparkle = generateSparkle();
      setSparkles(prev => [...prev, sparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== sparkle.id));
      }, 1000);
    }, 300);

    return () => clearInterval(interval);
  }, [colors]);

  return (
    <div className="relative inline-block">
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style as React.CSSProperties}
        />
      ))}
      <div className="relative z-1">{children}</div>
    </div>
  );
};

export default Sparkles;