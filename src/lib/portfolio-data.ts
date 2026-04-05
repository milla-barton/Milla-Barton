export interface PortfolioProject {
  id: string;
  title: string;
  meta: string;
  tag: string;
  coverSrc: string;
  coverAlt: string;
  images: { src: string; alt: string }[];
}

// Images live in /public/images/gallery/<project-id>/
// Name your files: 01.jpg, 02.jpg, 03.jpg ... (or .webp / .png)
// Update the arrays below once you've added your photos.

export const PROJECTS: PortfolioProject[] = [
  {
    id: "maison-jungle",
    title: "Maison Jungle",
    meta: "Aménagement complet — Paris",
    tag: "Rénovation",
    coverSrc: "/images/gallery/maison-jungle/amВnagement intВrieur11.webp",
    coverAlt: "Rénovation Maison Jungle",
    images: [
      { src: "/images/gallery/maison-jungle/amВnagement intВrieur11.webp", alt: "Maison Jungle — vue 1" },
      { src: "/images/gallery/maison-jungle/Chambre7.webp", alt: "Maison Jungle — vue 2" },
      { src: "/images/gallery/maison-jungle/Chambre8.webp", alt: "Maison Jungle — vue 3" },
      { src: "/images/gallery/maison-jungle/Cuisine1.webp", alt: "Maison Jungle — vue 4" },
      { src: "/images/gallery/maison-jungle/EntrВe2.webp", alt: "Maison Jungle — vue 5" },
      { src: "/images/gallery/maison-jungle/Piscine3.webp", alt: "Maison Jungle — vue 6" },
      { src: "/images/gallery/maison-jungle/Salle de bain10.webp", alt: "Maison Jungle — vue 7" },
      { src: "/images/gallery/maison-jungle/Salle Е manger5.webp", alt: "Maison Jungle — vue 8" },
      { src: "/images/gallery/maison-jungle/Salon4.webp", alt: "Maison Jungle — vue 9" },
      { src: "/images/gallery/maison-jungle/Seconde Chambre9.webp", alt: "Maison Jungle — vue 10" },
    ],
  },
  {
    id: "style-passion",
    title: "Style Passion",
    meta: "Salon & Cuisine — Île-de-France",
    tag: "Design",
    coverSrc: "/images/gallery/style-passion/Salon3.webp",
    coverAlt: "Rénovation Style Passion",
    images: [
      { src: "/images/gallery/style-passion/Salon3.webp", alt: "Style Passion — vue 1" },
      { src: "/images/gallery/style-passion/Chambre8.webp", alt: "Style Passion — vue 2" },
      { src: "/images/gallery/style-passion/Cuisine9.webp", alt: "Style Passion — vue 3" },
      { src: "/images/gallery/style-passion/Salon.webp", alt: "Style Passion — vue 4" },
      { src: "/images/gallery/style-passion/Salle de bain6.webp", alt: "Style Passion — vue 5" },
      { src: "/images/gallery/style-passion/Salle de bain7.webp", alt: "Style Passion — vue 6" },
      { src: "/images/gallery/style-passion/Salon2.webp", alt: "Style Passion — vue 7" },
      { src: "/images/gallery/style-passion/Salon4.webp", alt: "Style Passion — vue 8" },
      { src: "/images/gallery/style-passion/Salon5.webp", alt: "Style Passion — vue 9" },
      { src: "/images/gallery/style-passion/Cuisine11.webp", alt: "Style Passion — vue 10" },
      { src: "/images/gallery/style-passion/Cuisine12.jpg", alt: "Style Passion — vue 11" },
      { src: "/images/gallery/style-passion/Cuisine13.jpg", alt: "Style Passion — vue 12" },
    ],
  },
  {
    id: "style-corbusier",
    title: "Style Corbusier",
    meta: "Rénovation complète — Paris",
    tag: "Rénovation",
    coverSrc: "/images/gallery/style-corbusier/Salon1.webp",
    coverAlt: "Rénovation Style Corbusier",
    images: [
      { src: "/images/gallery/style-corbusier/Salon1.webp", alt: "Style Corbusier — vue 1" },
      { src: "/images/gallery/style-corbusier/Chambre1.webp", alt: "Style Corbusier — vue 2" },
      { src: "/images/gallery/style-corbusier/Chambre2.webp", alt: "Style Corbusier — vue 3" },
      { src: "/images/gallery/style-corbusier/Salle de bain1.jpg", alt: "Style Corbusier — vue 4" },
      { src: "/images/gallery/style-corbusier/Salle de bain2.webp", alt: "Style Corbusier — vue 5" },
      { src: "/images/gallery/style-corbusier/Salle de bain3.webp", alt: "Style Corbusier — vue 6" },
      { src: "/images/gallery/style-corbusier/Salon2.webp", alt: "Style Corbusier — vue 7" },
      { src: "/images/gallery/style-corbusier/Salon3.webp", alt: "Style Corbusier — vue 8" },
      { src: "/images/gallery/style-corbusier/Salon4.webp", alt: "Style Corbusier — vue 9" },
      { src: "/images/gallery/style-corbusier/Salon5.webp", alt: "Style Corbusier — vue 10" },

    ],
  },
];
