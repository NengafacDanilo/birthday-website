import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';
import Wishes from '@/components/Wishes';
import MusicPlayer from '@/components/MusicPlayer';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-gradient-radial from-gray-900 via-purple-900 to-gray-900">
      <Hero />
      <PhotoGallery />
      <Wishes />
      <ContactForm />
      <MusicPlayer />
    </main>
  );
}

