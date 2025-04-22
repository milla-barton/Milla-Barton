'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const heroImages = [
  "/images/hero/hero.webp",  // keeping your original image
  "/images/hero/image1.jpg", // add more images as needed
  "/images/hero/image2.jpg",
];

export default function HeroSection() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="w-full mt-20">
            <div className="flex flex-col md:flex-row">
                <div className="w-full h-[350px] md:w-1/2 md:h-[760px] relative order-1 md:order-2" data-aos="fade-left">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="h-full w-full"
                    >
                        {heroImages.map((src, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative h-full w-full">
                                    <Image
                                        src={src}
                                        alt={`Interior design showcase ${index + 1}`}
                                        fill
                                        sizes='50vw'
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 gradient-overlay" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="w-full flex items-center order-2 md:order-1" style={{ background: '#F3F4F6' }} data-aos="fade-right">
                    <div className="w-full px-8 py-5 md:px-12 lg:px-16">
                        <h1 className="md:mb-3 leading-tight text-[20px] sm:text-2xl md:text-3xl lg:text-5xl pt-4 pb-4">
                            Transformez votre intérieur <br />
                            en un lieu qui vous ressemble.
                        </h1>
                        <p className="text-base sm:text-base md:text-base lg:text-2xl mb-6 pt-4 pb-4">
                            <span className="block sm:hidden">
                                Estimation en moins de 2 minutes.
                            </span>
                            <span className="hidden sm:block">
                                Nous serions ravis d'échanger sur votre projet, <br />
                                Obtenez une estimation en moins de 2 minutes.
                            </span>
                        </p>
                        <div className="flex flex-row mb-6 gap-3 justify-center md:justify-start">
                            <Button asChild variant="outline" className="border-black border-2 text-black hover:bg-black hover:text-white py-5 px-8 rounded-none">
                                <Link href="#quickquote">Devis Gratuit</Link>
                            </Button>
                            <Button asChild className="bg-black text-white border-2 hover:bg-white hover:border-black hover:border-2 hover:text-black py-5 px-8 rounded-none">
                                <Link href="#contact">Contact</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}