'use client';

import { useEffect, useState, useCallback } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const testimonials = [
  {
    id: 'testimonial1',
    name: 'Adèle Garnier',
    text: "Je recommande vivement Mila! elle a fait un travail formidable en créant le design magnifique. Elle est douée pour le design et la couleur, elle a écouté mes préférences, a travaillé avec mon budget et a conçu un résultat parfait, le travail a été fait dans les délais, merci à elle.",
    rating: 5,
    date: '16 February 2025',
    image: '/images/avatar/adele.png',
    photos: [
      '/images/testimonial/adele/image1.jpg',
      '/images/testimonial/adele/image2.jpg',
      '/images/testimonial/adele/image4.jpg',
      '/images/testimonial/adele/image5.jpg',
      '/images/testimonial/adele/image6.jpg',
    ]
  },
  {
    id: 'testimonial2',
    name: 'Laurent Tanguy',
    text: "Nous sommes très reconnaissants d'avoir trouvé Mila. Ce fut un réel plaisir de travailler avec elle. Nous avons une petite maison avec un plan d'étage difficile. Elle as su s'organiser avec les difficultes de notre maison et la rendre chaleureuse, sommes des personnes âgées qui vivaient avec beaucoup de désordre et des pièces qui ne nous convenaient pas, jusqua ce que Mila nous aide a tout reorganiser.",
    rating: 5,
    date: '16 February 2025',
    image: '/images/avatar/laurent.png',
    photos: [
      '/images/testimonial/laurent/image1.jpg',
      '/images/testimonial/laurent/image2.jpg',
      '/images/testimonial/laurent/image3.jpg',
      '/images/testimonial/laurent/image4.jpg',
      '/images/testimonial/laurent/image5.jpg',
      '/images/testimonial/laurent/image6.jpg',
    ]
  },
  {
    id: 'testimonial3',
    name: 'Théo Corbel',
    text: "J'ai eu la chance de collaborer avec Mila Barton pour la Rénovation de mon intérieur, et je ne pourrais être plus satisfait du résultat. Son talent et son sens aigu de l'esthétique ont transformé mon espace !",
    rating: 5,
    date: '19 July 2025',
    image: '/images/avatar/theo.png',
    photos: [
      '/images/testimonial/theo/image1.jpg',
      '/images/testimonial/theo/image2.jpg',
    ]
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    currentIndex: number;
    photos: string[];
  }>({
    isOpen: false,
    currentIndex: 0,
    photos: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (testimonials.length - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const openGallery = useCallback((photoUrl: string, photos: string[]) => {
    const currentIndex = photos.indexOf(photoUrl);
    setGalleryState({
      isOpen: true,
      currentIndex,
      photos
    });
    document.body.style.overflow = 'hidden';
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryState(prev => ({ ...prev, isOpen: false }));
    document.body.style.overflow = 'auto';
  }, []);

  const goToPrevious = useCallback(() => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  }, []);

  const goToNext = useCallback(() => {
    setGalleryState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.photos.length
    }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!galleryState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryState.isOpen, closeGallery, goToPrevious, goToNext]);

  const displayedTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <>
      <section className="py-12 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="mb-8 text-4xl md:text-5xl font-bold text-left text-gray-900">Avis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedTestimonials.map((testimonial) => {
              const isExpanded = expanded.includes(testimonial.id);
              const shortText = testimonial.text.slice(0, 230);

              return (
                <div
                  key={testimonial.id}
                  className="relative transition-all duration-500 ease-in-out"
                >
                  <div className="relative bg-gray-50 p-6 pb-8 text-gray-700 shadow-lg min-h-[300px]">
  <div className="absolute top-4 left-4 text-7xl text-gray-200 font-serif leading-none">"</div>

  <div className="flex ml-6 mb-3 text-yellow-400">
    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-current mx-0.5" />
    ))}
  </div>

  {/* Main content container with padding at bottom for Google logo */}
  <div className="relative z-10 px-4 mb-6 min-h-[120px]">
    <p className="text-base text-gray-600 italic">
      {isExpanded ? testimonial.text : `${shortText}...`}
      {testimonial.text.length > 240 && (
        <button
          onClick={() => toggleExpand(testimonial.id)}
          className="text-sm text-blue-600 ml-2 underline"
        >
          {isExpanded ? 'Lire moins' : 'Lire plus'}
        </button>
      )}
    </p>
  </div>

  {/* Photos container with margin to prevent overlap */}
  {testimonial.photos?.length > 0 && (
    <div className="mt-auto ml-3 flex gap-3 pb-2"> {/* Added pb-2 for extra space */}
      {testimonial.photos.slice(0, 3).map((photoUrl, idx) => (
        <button
          key={idx}
          onClick={() => openGallery(photoUrl, testimonial.photos)}
          className="w-[100px] h-[80px] sm:w-[90px] sm:h-[90px] rounded-md overflow-hidden border border-gray-300 shadow relative focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Image
            src={photoUrl}
            alt={`Photo ${idx + 1} from ${testimonial.name}`}
            fill
            sizes='(100px)'
            className="object-cover"
          />
          {idx === 2 && testimonial.photos.length > 3 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-sm font-semibold">
              +{testimonial.photos.length - 3}
            </div>
          )}
        </button>
      ))}
    </div>
  )}

  {/* Google logo with fixed positioning */}
  <div className="absolute bottom-4 pt-1 right-4 h-6 w-6">
    <Image
      src="/images/google.png"
      alt="Google"
      width={24}
      height={24}
      className="opacity-80 object-contain"
    />
  </div>

  {/* Speech bubble arrow */}
  <div className="absolute -bottom-4 left-6 w-0 h-0 
    border-l-[16px] border-l-transparent
    border-r-[16px] border-r-transparent
    border-t-[24px] border-t-gray-50
    filter drop-shadow-md"></div>
</div>

                  <div className="flex items-center mt-8 ml-3">
                    <div className="relative h-16 w-16 rounded-full border-3 border-white overflow-hidden shadow-md">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="ml-3">
                      <h5 className="text-lg font-bold text-gray-900">{testimonial.name}</h5>
                      <p className="text-sm text-gray-500">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Screen Gallery */}
      {galleryState.isOpen && (
        <div className="fixed inset-0 z-[9999] bg-black bg-opacity-80  flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-black bg-opacity-90 z-10">
            <button 
              onClick={closeGallery}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close gallery"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="text-white text-lg">
              {galleryState.currentIndex + 1} / {galleryState.photos.length}
            </div>
            <div className="w-8"></div>
          </div>

          {/* Main Image */}
          <div className="relative flex-1 w-full">
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={galleryState.photos[galleryState.currentIndex]}
                alt={`Gallery image ${galleryState.currentIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="bg-black bg-opacity-90 p-4 overflow-x-auto">
            <div className="flex justify-center space-x-2">
              {galleryState.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryState(prev => ({
                    ...prev,
                    currentIndex: index
                  }))}
                  className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    galleryState.currentIndex === index 
                      ? 'border-blue-500 scale-105' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}