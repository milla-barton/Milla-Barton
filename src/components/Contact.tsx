'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Contact() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        consent: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, consent: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.consent) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const emailresponse = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                    formType: 'contact'
                }),
            });

            const sheetresponse = fetch('https://script.google.com/macros/s/AKfycbxNwAUj7RVGirKSrzfwhtN9SkN1cWidQlnkVWt0lz21qYZIKyOYSPQa_HpDeKtrSzBclw/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    formData,
                    formType: 'contact'
                }),
            });
            
            if (emailresponse.ok) {
                setSubmitStatus('success');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    consent: false
                });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-12 md:py-20 bg-white">
            <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Left Column - Contact Info and Form */}
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 md:mb-8">Contact</h2>

                    <div className="text-gray-700 mb-6 md:mb-8">
                        <p>Milla Barton, décoratrice d'intérieur basée à Neuilly sur SEINE.</p>
                        <p>Pour vos projets, n'hésitez pas à me contacter</p>
                        <div className="mt-2 md:mt-4 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>Tel: +(33) 6 67 99 15 25</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>Email: your-email@example.com</span>
                        </div>
                    </div>

                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-100 text-green-700">
                            Merci pour votre message ! Nous vous répondrons rapidement.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 ">
                            Une erreur s'est produite lors de l'envoi de votre formulaire. Veuillez réessayer.
                        </div>
                    )}

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
                                Nom
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                                Mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-1">
                                Sujet
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                                required
                            />
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="consent"
                                name="consent"
                                checked={formData.consent}
                                onChange={handleCheckboxChange}
                                className="mt-1 mr-2"
                                required
                            />
                            <label htmlFor="consent" className="text-xs md:text-sm text-gray-600">
                                En cochant cette case, j'accepte que mes données personnelles soient traitées conformément à la loi
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="rounded-none text-white text-lg hover:bg-black py-4 px-12 transition-colors duration-300 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer"
                            disabled={!formData.consent || isSubmitting}
                        >
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                        </Button>

                    </form>
                </div>

                {/* Right Column - Map */}
                <div className="flex-1 min-h-[400px] md:min-h-[540px] rounded-none overflow-hidden relative">
  <div className="absolute inset-0 overflow-hidden h-full w-full">
    <iframe
      src="https://www.google.com/maps/d/u/0/embed?mid=16X28ESVi2YnYKDMonHpcIxT30laV9dM&ehbc=2E312F"
      width="100%"
      height="100%"
      style={{ 
        border: 0,
        marginTop: '-70px',
        height: 'calc(100% + 80px)'
      }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Maps - Neuilly sur Seine"
    />
  </div>
</div>
            </div>
        </section>
    );
}


