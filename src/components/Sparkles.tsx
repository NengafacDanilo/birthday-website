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

interface SparkleData {
  id: number;
  color: string;
  size: number;
  style: React.CSSProperties;
  top: string;
  left: string;
}

export const Sparkles = ({ children, colors = ['#FFD700', '#FFA07A', '#FF69B4'] }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: SparkleData[] = [];
      for (let i = 0; i < 10; i++) { // Fixed number of sparkles
        newSparkles.push({
          id: i,
          color: colors[i % colors.length],
          size: 10 + (i % 10), // Deterministic size
          top: `${(i * 10) % 100}%`,
          left: `${(i * 15) % 100}%`,
          style: {
            position: 'absolute',
            zIndex: 2,
          },
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, [colors]);

  return (
    <div className="relative inline-block">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          style={{
            ...sparkle.style,
            top: sparkle.top,
            left: sparkle.left,
          }}
        >
          <Sparkle
            color={sparkle.color}
            size={sparkle.size}
          />
        </div>
      ))}
      <div className="relative z-1">{children}</div>
    </div>
  );
};

export default Sparkles;
