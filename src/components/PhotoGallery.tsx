'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Photo {
  id: number;
  src: string;
  alt: string;
}

// Example photos - replace with your actual photos
const photos: Photo[] = [
  { id: 1, src: '/photos/4K6A7152.jpg', alt: 'Birthday memory 1' },
  { id: 2, src: '/photos/4K6A7305.jpg', alt: 'Birthday memory 2' },
  { id: 3, src: '/photos/4K6A7303.jpg', alt: 'Birthday memory 3' },
  { id: 4, src: '/photos/4K6A7153.jpg', alt: 'Birthday memory 4' },
  { id: 5, src: '/photos/4K6A7398.jpg', alt: 'Birthday memory 5' },
  { id: 6, src: '/photos/4K6A7398.jpg', alt: 'Birthday memory 6' },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <section className="py-20 bg-gray-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Birthday Memories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
                  aria-label="Close gallery"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;