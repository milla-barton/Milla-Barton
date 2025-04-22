'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { X } from 'lucide-react';

export default function Gallery() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const projects = [
        {
            id: 'project1',
            title: 'Aménagement intérieur',
            image: 'images/gallery/Maison Jungle/amВnagement intВrieur11.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project2',
            title: 'Chambre',
            image: '/images/gallery/Maison Jungle/Chambre7.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project3',
            title: 'Chambre',
            image: '/images/gallery/Maison Jungle/Chambre8.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project4',
            title: 'Cuisine',
            image: '/images/gallery/Maison Jungle/Cuisine1.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project5',
            title: 'Entrée',
            image: '/images/gallery/Maison Jungle/EntrВe2.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project6',
            title: 'Piscine',
            image: '/images/gallery/Maison Jungle/Piscine3.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project7',
            title: 'Salle de bain',
            image: '/images/gallery/Maison Jungle/Salle de bain10.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project8',
            title: 'Salle à manger',
            image: '/images/gallery/Maison Jungle/Salle Е manger5.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project9',
            title: 'Salon',
            image: '/images/gallery/Maison Jungle/Salon4.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project10',
            title: 'Salon',
            image: '/images/gallery/Maison Jungle/Salon6.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project11',
            title: 'Seconde Chambre',
            image: '/images/gallery/Maison Jungle/Seconde Chambre9.webp',
            category: 'Maison Jungle'
        },
        {
            id: 'project12',
            title: 'Chambre',
            image: '/images/gallery/Style Passion/Chambre8.webp',
            category: 'Style Passion'
        },
        {
            id: 'project13',
            title: 'Cuisine',
            image: '/images/gallery/Style Passion/Cuisine10.webp',
            category: 'Style Passion'
        },
        {
            id: 'project14',
            title: 'Cuisine',
            image: '/images/gallery/Style Passion/Cuisine11.webp',
            category: 'Style Passion'
        },
        {
            id: 'project15',
            title: 'Cuisine',
            image: '/images/gallery/Style Passion/Cuisine12.jpg',
            category: 'Style Passion'
        },
        {
            id: 'project16',
            title: 'Cuisine',
            image: '/images/gallery/Style Passion/Cuisine13.jpg',
            category: 'Style Passion'
        },
        {
            id: 'project17',
            title: 'Cuisine',
            image: '/images/gallery/Style Passion/Cuisine9.webp',
            category: 'Style Passion'
        },
        {
            id: 'project18',
            title: 'Salle de bain',
            image: '/images/gallery/Style Passion/Salle de bain6.webp',
            category: 'Style Passion'
        },
        {
            id: 'project19',
            title: 'Salle de bain',
            image: '/images/gallery/Style Passion/Salle de bain7.webp',
            category: 'Style Passion'
        },
        {
            id: 'project20',
            title: 'Salon',
            image: '/images/gallery/Style Passion/Salon.webp',
            category: 'Style Passion'
        },
        {
            id: 'project21',
            title: 'Salon',
            image: '/images/gallery/Style Passion/Salon2.webp',
            category: 'Style Passion'
        },
        {
            id: 'project22',
            title: 'Salon',
            image: '/images/gallery/Style Passion/Salon3.webp',
            category: 'Style Passion'
        },
        {
            id: 'project23',
            title: 'Salon',
            image: '/images/gallery/Style Passion/Salon4.webp',
            category: 'Style Passion'
        },
        {
            id: 'project24',
            title: 'Salon',
            image: '/images/gallery/Style Passion/Salon5.webp',
            category: 'Style Passion'
        },
        {
            id: 'project25',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon1.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project26',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon2.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project27',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon3.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project28',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon4.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project29',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon5.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project30',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon6.jpg',
            category: 'Salon Savanne'
        },
        {
            id: 'project31',
            title: 'Salon',
            image: '/images/gallery/Salon Savanne/Salon7.webp',
            category: 'Salon Savanne'
        },
        {
            id: 'project32',
            title: 'Chambre',
            image: '/images/gallery/Style Corbusier/Chambre1.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project33',
            title: 'Chambre',
            image: '/images/gallery/Style Corbusier/Chambre2.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project34',
            title: 'Salle de bain',
            image: '/images/gallery/Style Corbusier/Salle de bain1.jpg',
            category: 'Style Corbusier'
        },
        {
            id: 'project35',
            title: 'Salle de bain',
            image: '/images/gallery/Style Corbusier/Salle de bain2.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project36',
            title: 'Salle de bain',
            image: '/images/gallery/Style Corbusier/Salle de bain3.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project37',
            title: 'Salon',
            image: '/images/gallery/Style Corbusier/Salon1.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project38',
            title: 'Salon',
            image: '/images/gallery/Style Corbusier/Salon2.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project39',
            title: 'Salon',
            image: '/images/gallery/Style Corbusier/Salon3.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project40',
            title: 'Salon',
            image: '/images/gallery/Style Corbusier/Salon4.webp',
            category: 'Style Corbusier'
        },
        {
            id: 'project41',
            title: 'Salon',
            image: '/images/gallery/Style Corbusier/Salon5.webp',
            category: 'Style Corbusier'
        }
    ];

    const categories = [
        { id: 'all', label: 'Tous' },
        { id: 'Maison Jungle', label: 'Maison Jungle' },
        { id: 'Style Passion', label: 'Style Passion' },
        { id: 'Salon Savanne', label: 'Salon Savanne' },
        { id: 'Style Corbusier', label: 'Style Corbusier' }
    ];

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [isFiltering, setIsFiltering] = useState(false);
    const [selectedImage, setSelectedImage] = useState<null | {
        image: string;
        title: string;
        category: string;
    }>(null);

    const shuffleArray = (array: any[]) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setIsFiltering(true);
        const filtered = selectedCategory === 'all'
            ? shuffleArray([...projects])
            : shuffleArray(projects.filter(project => project.category === selectedCategory));

        const maxImages = 17;
        const minImages = 14;
        const randomCount = Math.floor(Math.random() * (maxImages - minImages + 1)) + minImages;
        const limitedProjects = filtered.slice(0, randomCount);

        const timer = setTimeout(() => {
            setFilteredProjects(limitedProjects);
            setIsFiltering(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [selectedCategory]);

    const openModal = (image: string, title: string, category: string) => {
        setSelectedImage({ image, title, category });
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    return (
        <>
        <section id="portfolio" className="py-16" data-aos="fade-up">
            <div className="container-custom">
                <h2 className="text-4xl md:text-5xl text-center lg:text-5xl font-bold mb-10 md:mb-16">Nos dernières rénovations</h2>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "ghost"}
                            className={`px-4 py-3 rounded-none font-normal ${selectedCategory === category.id ? 'bg-black text-white' : 'text-gray-700'}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>

                <Masonry
                    breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group overflow-hidden mb-4 cursor-pointer"
                            onClick={() => openModal(project.image, project.title, project.category)}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="bottom-0 left-0 right-0 bg-black p-2">
                                <h3 className="text-white text-center text-lg">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </Masonry>

                {filteredProjects.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                        Aucun projet trouvé dans cette catégorie.
                    </p>
                )}
            </div>

            
        </section>

         {/* TRUE FULL-SCREEN MODAL (separate from gallery) */}
      {selectedImage && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Close button - fixed position */}
          <button
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 transition-all md:top-6 md:right-6"
            onClick={closeModal}
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6 text-white md:h-8 md:w-8" strokeWidth={2.5} />
          </button>

          {/* Image container - takes full viewport */}
          <div className="flex-1 w-full h-[100dvh] flex items-center justify-center p-0">
            <div className="relative w-full h-full max-w-[100vw] max-h-[100dvh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>
          </div>

          {/* Image info bar - fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-80 py-3 px-4 text-center text-white">
            <h3 className="text-lg font-medium">{selectedImage.title}</h3>
            <p className="text-sm opacity-90">{selectedImage.category}</p>
          </div>
        </div>
      )}
      </>
    );
}