'use client';

import { Search, PenTool, ShoppingCart, Compass, Hammer } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function HowItWorks() {
    const steps = [
        {
            id: 'step1',
            icon: <Search className="h-10 w-10 text-black" />,
            title: "Découverte & Évaluation",
            description: "Nous comprenons vos besoins, évaluons l'espace et définissons ensemble les grandes lignes du projet."
        },
        {
            id: 'step2',
            icon: <Compass className="h-10 w-10 text-black" />,
            title: "Création & Préparation",
            description: "Nous créons des plans détaillés et des maquettes 3D. Après validation, nous planifions et sélectionnons les matériaux nécessaires."
        },
        {
            id: 'step3',
            icon: <Hammer className="h-10 w-10 text-black" />,
            title: "Transformation & Réalisation",
            description: "Nous supervisons tous les aspects du projet pour assurer une réalisation conforme aux plans et dans les délais impartis."
        }
    ];

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="services" className="py-12 bg-white" data-aos="fade-in">
            <div className="container-custom w-4/5">
                <h2 className=" text-4xl md:text-5xl text-center lg:text-5xl font-bold mb-12">Comment ça marche ?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step) => (
                        <div key={step.id} className="process-item">
                            <div className="flex justify-center p-4 " style={{background:'#F3F4F6'}}>
                                {step.icon}
                            </div>
                            <p className="text-xl mb-3 mt-3">{step.title}</p>
                            <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
