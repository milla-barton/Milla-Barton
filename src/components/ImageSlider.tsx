'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface SliderProps {
    images?: string[];
    spacing?: number;
    padding?: number;
}

export function ImageSlider({ images: propImages, spacing = 0, padding = 0 }: SliderProps) {
    const defaultImages = [
        '/images/slider/A1.jpg',
        '/images/slider/A2.jpg',
        '/images/slider/A3.jpg',
        '/images/slider/A4.jpg',
        '/images/slider/c1.webp',
    ];

    const images = propImages || defaultImages;
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const goToPrevious = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    const goToNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    const goToSlide = (index: number) => setCurrentIndex(index);

    useEffect(() => {
        const timer = setInterval(goToNext, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    return (
        <div className="flex flex-col w-full bg-white" data-aos="fade-up">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-50">
                <div
                    ref={sliderRef}
                    className="flex h-full transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        gap: `${spacing} px`
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="h-full flex-shrink-0 relative"
                            style={{
                                width: '100%',
                                margin: `0 ${spacing / 2}px`
                            }}
                        >
                            <div className="w-full h-full p-3 bg-white shadow-sm">
                                <img
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <div className="absolute left-0 top-0 h-full w-[20%] z-10">
                            <div className="relative h-full w-full">
                                <div className="absolute right-0 top-0 h-full w-4 bg-white z-20"></div>
                                <div className="absolute left-0 top-0 right-3 bottom-0">
                                    <div className="w-full h-full bg-white/30 ">
                                        <img
                                            src={images[prevIndex]}
                                            alt="Previous slide"
                                            className="w-full h-full object-cover brightness-50 "
                                        />
                                        <button
                                            onClick={goToPrevious}
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      bg-white/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                        >
                                            <ChevronLeft size={40} className='text-black hover:text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-0 top-0 h-full w-[20%] z-10">
                            <div className="relative h-full w-full">
                                <div className="absolute left-0 top-0 h-full w-4 bg-white z-20"></div>
                                <div className="absolute left-3 top-0 right-0 bottom-0">
                                    <div className="w-full h-full bg-white/30 ">
                                        <img
                                            src={images[nextIndex]}
                                            alt="Next slide"
                                            className="w-full h-full object-cover brightness-50"
                                        />
                                        <button
                                            onClick={goToNext}
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      bg-white/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                                        >
                                            <ChevronRight size={40} className='text-black hover:text-white' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-6 py-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />

                    ))}
                </div>
            )}
        </div>
    );
}