'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import emailjs from '@emailjs/browser';

type FormData = {
  name: string;
  email: string;
  message: string;
  attachments?: FileList;
};

const schema = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  message: yup.string().required('Please enter your birthday wish').min(10, 'Message must be at least 10 characters'),
  attachments: yup.mixed().optional(),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  // Initialize EmailJS
  emailjs.init('xHqGzfrKsOwlAkVl8');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Convert files to base64 for EmailJS
      const attachments: { name: string; data: string; type: string }[] = [];
      for (const file of selectedFiles) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        attachments.push({
          name: file.name,
          data: base64,
          type: file.type,
        });
      }

      // Prepare template parameters
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        attachments: attachments.length > 0 ? JSON.stringify(attachments) : '',
      };

      // Send email using EmailJS
      await emailjs.send(
        'service_rbqkqjk',
        'template_e7dror8',
        templateParams,
        'xHqGzfrKsOwlAkVl8'
      );

      setSubmitStatus('success');
      reset();
      setSelectedFiles([]);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Failed to send wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("🎉 Check out this amazing birthday celebration! 🎂");

    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`
    };

    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <section className="py-20 bg-linear-to-b from-purple-900/50 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Send Your Wishes
          </h2>
          
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label htmlFor="name" className="block text-rose-100 mb-2">
                Your Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                         text-white placeholder-white/50 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-rose-300 text-sm">{errors.name.message}</p>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label htmlFor="email" className="block text-rose-100 mb-2">
                Your Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                         text-white placeholder-white/50 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                         transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-rose-300 text-sm">{errors.email.message}</p>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label htmlFor="message" className="block text-rose-100 mb-2">
                Your Birthday Wish
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="message"
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                         text-white placeholder-white/50 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                         transition-all duration-300 resize-none"
                placeholder="Write your special birthday message..."
              />
              {errors.message && (
                <p className="mt-1 text-rose-300 text-sm">{errors.message.message}</p>
              )}
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label htmlFor="attachments" className="block text-rose-100 mb-2">
                Attach Photos/Videos (Optional)
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="file"
                id="attachments"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                         text-white placeholder-white/50 backdrop-blur-md
                         focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent
                         transition-all duration-300 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-pink-500 file:text-white hover:file:bg-pink-600"
              />
              <p className="mt-1 text-rose-200 text-sm">
                Max 10MB per file. Supported: JPG, PNG, GIF, MP4, AVI, MOV
              </p>
              {selectedFiles.length > 0 && (
                <div className="mt-2 space-y-1">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 rounded p-2">
                      <span className="text-white text-sm truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-rose-300 hover:text-rose-100 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-lg font-semibold text-white
                       bg-linear-to-r from-pink-500 to-purple-600
                       hover:from-pink-600 hover:to-purple-700
                       transition-all duration-300 relative
                       disabled:opacity-50 disabled:cursor-not-allowed
                       ${isSubmitting ? 'animate-pulse' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Birthday Wish'}
            </motion.button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg text-center bg-green-500/20 text-green-200"
                >
                  <p className="mb-3">✨ Your birthday wish has been sent!</p>
                  <div className="flex justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareOnSocial('facebook')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      📘 Facebook
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareOnSocial('twitter')}
                      className="px-3 py-1 bg-blue-400 text-white text-sm rounded hover:bg-blue-500 transition-colors"
                    >
                      🐦 Twitter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => shareOnSocial('whatsapp')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      💬 WhatsApp
                    </motion.button>
                  </div>
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-lg text-center bg-rose-500/20 text-rose-200"
                >
                  ❌ Failed to send wish. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
