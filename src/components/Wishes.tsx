'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import WishForm from './WishForm';

interface Wish {
  id: number;
  message: string;
  author: string;
  color: string;
}

const initialWishes: Wish[] = [
  {
    id: 1,
    message: "Happy birthday! May your day be filled with joy and laughter!",
    author: "Sarah",
    color: "bg-pink-500"
  },
  {
    id: 2,
    message: "Wishing you the most amazing birthday ever!",
    author: "Mike",
    color: "bg-purple-500"
  },
  {
    id: 3,
    message: "Another year of amazing memories with you. Happy Birthday!",
    author: "Emma",
    color: "bg-blue-500"
  }
];

const colors = [
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-teal-500"
];

const Wishes = () => {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);

  const handleNewWish = ({ message, author }: { message: string; author: string }) => {
    const newWish: Wish = {
      id: wishes.length + 1,
      message,
      author,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setWishes([...wishes, newWish]);
  };

  return (
    <section className="py-20 bg-linear-gradient-to-b from-gray-900 via-purple-900/50 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Birthday Wishes
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {wishes.map((wish: Wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`${wish.color} rounded-lg p-6 transform rotate-${Math.random() * 6 - 3} hover:rotate-0 transition-transform duration-300`}
            >
              <p className="text-white text-lg mb-4 font-medium italic">
                "{wish.message}"
              </p>
              <p className="text-white/80 text-right">- {wish.author}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-white/70 text-lg">
            Share your wishes and make this birthday even more special!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Wishes;