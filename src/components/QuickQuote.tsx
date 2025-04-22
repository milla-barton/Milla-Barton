'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, Home, Check } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

type FormData = {
    projectType: string;
    numberOfRooms: string;
    roomType: string;
    surfaceArea: number;
    postalCode: string;
    firstName: string;
    email: string;
    phone: string;
    designStyle: string;
    note:string;
};

export default function QuickQuote() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        projectType: '',
        numberOfRooms: '',
        roomType: '',
        surfaceArea: 0,
        postalCode: '',
        firstName: '',
        email: '',
        phone: '',
        designStyle: '',
        note: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

    const handleNext = async () => {
        if (step === 6) {
            await handleSubmit();
        } else if (step < 7) {
            // Special handling for Fabrication project type
            if (step === 1 && formData.projectType === 'Fabrication') {
                setStep(6); // Skip to step 6
            } else {
                setStep(step + 1);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ ...prevData, surfaceArea: Number(e.target.value) }));
    };

    const handleRadioChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                    formType: 'quickquote'
                }),
            });

            const sheetresponse = fetch('https://script.google.com/macros/s/AKfycbxNwAUj7RVGirKSrzfwhtN9SkN1cWidQlnkVWt0lz21qYZIKyOYSPQa_HpDeKtrSzBclw/exec', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    formData,
                    formType: 'quickquote'
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setStep(7);
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

    const isNextButtonDisabled = () => {
        if (isSubmitting) return true;
        if (step === 1) return !formData.projectType;
        if (step === 2) return !formData.numberOfRooms;
        if (step === 3) return !formData.roomType;
        if (step === 4) return formData.surfaceArea < 10;
        if (step === 5) return !formData.designStyle;
        if (step === 6) {
            // Basic required fields
            const basicFieldsValid = !formData.postalCode || !formData.firstName || !formData.email || !formData.phone;
            
            // If it's Fabrication, note is optional (remove this condition if note is required)
            if (formData.projectType === 'Fabrication') {
                return basicFieldsValid || !formData.note;
            }
            return basicFieldsValid;
        }
        return false;
    };

    const stepLabels = [
        "Votre projet",
        "Nombre de pieces",
        "Type de pièces",
        "Surface du bien",
        "Style de design",
        "Vos Coordonnés",
        "Retourner à l'accueil"
    ];

    return (
        <section id="quickquote" className="py-16 bg-white" data-aos="fade-up">
            <div className="container-custom">
                <h2 className="text-4xl md:text-5xl text-center lg:text-5xl font-bold mb-9 md:mb-15">Devis en moins d'une minute</h2>

                <div className="mb-12 relative w-full flex flex-col items-center">
                    {/* Progress track (gray) */}
                    <div
                        className="absolute h-0.5 bg-gray-300 z-0"
                        style={{
                            top: '26px',
                            width: '70%',
                            left: '15%'
                        }}
                    ></div>

                    {/* Progress indicator (black) */}
                    <div
                        className="absolute h-0.5 bg-black z-10 transition-all duration-300"
                        style={{
                            top: '26px',
                            width: `${Math.max(0, (step - 1) / 6 * 70)}%`,
                            left: '15%'
                        }}
                    ></div>

                    {/* Steps container */}
                    <div className="relative z-20 w-full flex justify-center">
                        <div className="flex justify-between" style={{ width: '80%' }}>
                            {[1, 2, 3, 4, 5, 6, 7].map((stepNumber) => (
                                <div
                                    key={stepNumber}
                                    className="flex flex-col items-center relative"
                                    style={{ width: `${100 / 7}%` }}
                                >
                                    {/* Step circle */}
                                    <button
                                        type="button"
                                        onClick={() => stepNumber <= step && setStep(stepNumber)}
                                        className={`
                                            w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
                                            font-bold relative z-10
                                            ${stepNumber <= step ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}
                                            ${stepNumber <= step ? 'cursor-pointer' : 'cursor-default'}
                                        `}
                                    >
                                        {stepNumber}
                                    </button>

                                    {/* Step label */}
                                    <div className="mt-2 text-center text-xs lg:text-sm font-medium hidden lg:block">
                                        {stepLabels[stepNumber - 1]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded text-center">
                            Une erreur s'est produite. Veuillez réessayer.
                        </div>
                    )}

{step === 1 && (
    <div className="text-center">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-16 mb-10">Votre projet concerne-t-il ?</h3>
        
        {/* Options Container - Horizontal on Mobile, Vertical on Desktop/Tablet */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-6 gap-4 md:gap-6 w-full px-4 md:px-0">
            {['Decoration', 'Renovation', 'Fabrication'].map((type) => (
                <div
                    key={type}
                    className={`border-2 p-4 md:p-6 cursor-pointer transition-all w-full max-w-md md:w-auto md:max-w-none md:h-[312px] md:min-w-[227px] ${
                        formData.projectType === type
                            ? 'border-black bg-gray-50'
                            : 'border-gray-300 bg-gray-100'
                    }`}
                    onClick={() => handleRadioChange('projectType', type)}
                >
                    {/* Mobile: Horizontal Layout (Radio on Left + Icon + Text on Right) */}
                    <div className="md:hidden flex items-center justify-center h-full gap-4 px-4">
  {/* Radio Button (Left) */}
  <div className="flex-shrink-0">
    <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${
      formData.projectType === type
        ? 'border-black'
        : 'border-gray-400'
    }`}>
      {formData.projectType === type && (
        <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />
      )}
    </div>
  </div>

  {/* Icon + Text (Right) */}
  <div className="flex items-center gap-4 flex-grow max-w-[200px]">
    <img
      src={`/images/quote/${type.toLowerCase()}.png`}
      alt={type}
      className="w-12 h-12"
      style={{ objectFit: 'contain' }}
    />
    <p className="font-semibold text-sm">
      {type === 'Decoration' ? 'Décoration' : 
       type === 'Renovation' ? 'Rénovation' : 
       'Fabrication'}
    </p>
  </div>
</div>

                    {/* Desktop/Tablet: Vertical Layout (Icon + Text + Radio) */}
                    <div className="hidden md:flex flex-col items-center justify-center h-full">
                        <img
                            src={`/images/quote/${type.toLowerCase()}.png`}
                            alt={type}
                            className="mb-4 w-[120px] h-[120px]"
                            style={{ objectFit: 'contain' }}
                        />
                        <p className="font-semibold text-base">
                            {type === 'Decoration' ? 'Décoration' : 
                             type === 'Renovation' ? 'Rénovation' : 
                             'Fabrication'}
                        </p>
                        <div className="flex items-center justify-center mt-4">
                            <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                formData.projectType === type
                                    ? 'border-black'
                                    : 'border-gray-400'
                            }`}>
                                {formData.projectType === type && (
                                    <Check className="h-6 w-6 text-white bg-black rounded-full p-0.5" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className="flex justify-center mt-8">
            <Button
                onClick={handleNext}
                disabled={isNextButtonDisabled()}
                className="bg-black text-white rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer"
            >
                Suivant
            </Button>
        </div>
    </div>
)}
                    {/* Rest of the steps remain exactly the same as before */}
                    {step === 2 && (
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Nombre de pieces</h3>
                            <div className="flex flex-col items-center w-full mb-6">
                                {['1', '2', '3', '4+'].map((value) => (
                                    <div
                                        key={value}
                                        className={`
                                            p-4 mb-4 flex items-center
                                            ${formData.numberOfRooms === value
                                                ? 'border-[3px] border-black bg-gray-50'
                                                : 'border border-gray-300 bg-gray-50'
                                            }
                                            rounded-sm cursor-pointer
                                            w-full max-w-[566px] h-[60px]
                                        `}
                                        onClick={() => handleRadioChange('numberOfRooms', value)}
                                    >
                                        <div className="relative flex items-center w-full">
                                            <input
                                                type="radio"
                                                id={`room-${value}`}
                                                checked={formData.numberOfRooms === value}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`
                                                w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                ${formData.numberOfRooms === value
                                                    ? 'bg-black border-black'
                                                    : 'bg-white border-gray-300'
                                                }
                                            `}>
                                                {formData.numberOfRooms === value && (
                                                    <Check className="h-4 w-4 text-white" />
                                                )}
                                            </div>
                                            <label
                                                htmlFor={`room-${value}`}
                                                className="ml-4 cursor-pointer select-none whitespace-nowrap"
                                            >
                                                {value === '4+' ? '+4 pièces à décorer' : `${value} pièce${value === '1' ? '' : 's'} à décorer`}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button className="bg-black text-white rounded-none h-12 w-28 md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center px-4 sm:px-0">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Type de pièces</h3>
                            <div className="flex flex-col items-center w-full mb-6">
                                {['Cuisine', 'Salon', 'Chambre(s)', 'Bureau', 'Extérieur'].map((roomType) => (
                                    <div
                                        key={roomType}
                                        className={`
                                            p-4 mb-4 flex items-center
                                            ${formData.roomType === roomType
                                                ? 'border-2 border-black bg-gray-50'
                                                : 'border border-gray-300 bg-gray-50'
                                            }
                                            rounded-sm cursor-pointer
                                            w-full max-w-[566px] h-[60px]
                                        `}
                                        onClick={() => handleRadioChange('roomType', roomType)}
                                    >
                                        <div className="relative flex items-center w-full">
                                            <input
                                                type="radio"
                                                id={`type-${roomType}`}
                                                checked={formData.roomType === roomType}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`
                                                w-6 h-6 rounded-full border-2 flex items-center justify-center
                                                ${formData.roomType === roomType
                                                    ? 'bg-black border-black'
                                                    : 'bg-white border-gray-300'
                                                }
                                            `}>
                                                {formData.roomType === roomType && (
                                                    <Check className="h-4 w-4 text-white" />
                                                )}
                                            </div>
                                            <label
                                                htmlFor={`type-${roomType}`}
                                                className="ml-4 cursor-pointer select-none whitespace-nowrap"
                                            >
                                                {roomType}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button className="rounded-none h-12 w-28  md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Surface du bien</h3>
                            <div className="mb-6">
                                <p className="text-lg mb-2">{formData.surfaceArea} m²</p>
                                <input
                                    type="range"
                                    min="0"
                                    max="250"
                                    value={formData.surfaceArea}
                                    onChange={handleSliderChange}
                                    className="w-full custom-slider"
                                    style={{
                                        background: `linear-gradient(to right, black ${(formData.surfaceArea / 250) * 100}%, rgba(240, 240, 240, 1) ${(formData.surfaceArea / 250) * 100}%)`
                                    }}
                                    required
                                />
                            </div>
                            <div className="flex justify-between mt-8">
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Style de design</h3>
                            <div className="flex flex-col items-center mb-6">
                                {['Scandinave', 'Industriel', 'Vintage', 'Pop Art', 'Contemporain', 'Autre'].map((style) => (
                                    <div
                                        key={style}
                                        className={`p-4 mb-4 flex items-center ${formData.designStyle === style
                                            ? 'border-[3px] border-black bg-gray-50'
                                            : 'border border-gray-300 bg-gray-50'
                                            } rounded-sm cursor-pointer w-full md:w-[566px] h-[50px]`}
                                        onClick={() => handleRadioChange('designStyle', style)}
                                    >
                                        <div className="relative flex items-center">
                                            <input
                                                type="radio"
                                                id={`style-${style}`}
                                                checked={formData.designStyle === style}
                                                onChange={() => { }}
                                                className="absolute opacity-0 w-6 h-6 cursor-pointer"
                                            />
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.designStyle === style
                                                ? 'bg-black border-black'
                                                : 'bg-white border-gray-300'
                                                }`}>
                                                {formData.designStyle === style && (
                                                    <Check className="h-4 w-4 text-white stroke-[3px]" />
                                                )}
                                            </div>
                                            <label
                                                htmlFor={`style-${style}`}
                                                className="ml-4 cursor-pointer select-none text-gray-800"
                                            >
                                                {style}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between mt-8">
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
                                <Button className="rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" onClick={handleNext} disabled={isNextButtonDisabled()}>
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}

{step === 6 && (
    <div className="text-center px-4 sm:px-0">
        <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">Vos Coordonnés</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Add this conditional note field */}
            {formData.projectType === 'Fabrication' && (
  <div className="mb-4 w-full col-span-1 sm:col-span-2">
    <label className="block text-center mb-2 sm:mb-4 text-lg sm:text-3xl text-neutral-600 font-bold">
      Notes sur votre projet
    </label>
    <div className="w-full flex justify-center">
      <textarea
        name="note"
        placeholder="Décrivez votre projet de fabrication..."
        value={formData.note}
        onChange={(e) => setFormData({...formData, note: e.target.value})}
        className="w-full border border-neutral-800 p-2 rounded text-sm text-left relative"
        style={{
          minHeight: '120px',
          resize: 'vertical', // Allows vertical resizing
        }}
        onFocus={(e) => {
          e.target.style.backgroundPosition = 'left 0.5rem';
          e.target.style.textAlign = 'left';
        }}
        onBlur={(e) => {
          if (!e.target.value) {
            e.target.style.backgroundPosition = 'center center';
            e.target.style.textAlign = 'center';
          }
        }}
      />
    </div>
    <style jsx>{`
      textarea::placeholder {
        text-align: center;
        line-height: 100px; /* Match this with your minHeight */
        background-image: linear-gradient(transparent, transparent);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
      }
      textarea:focus::placeholder {
        color: transparent;
        background-image: none;
      }
    `}</style>
  </div>
)}
            {['postalCode', 'firstName', 'email', 'phone'].map((field) => (
                <div key={field} className="mb-4 w-full">
                    <label className="block text-center mb-2 sm:mb-4 text-lg sm:text-3xl text-neutral-600 font-bold">
                        {field === 'postalCode' ? 'Code postal' :
                            field === 'firstName' ? 'Prénom' :
                                field === 'email' ? 'E-mail' : 'Téléphone'}
                    </label>
                    <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        placeholder={field === 'postalCode' ? 'Code Postal' :
                            field === 'firstName' ? 'Prénom' :
                                field === 'email' ? 'Email' : 'Numéro de portable'}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        className="w-full border border-neutral-800 p-2 rounded text-sm text-center mx-auto"
                        style={{ maxWidth: '400px' }}
                        required
                    />
                </div>
            ))}
            
            
        </div>
        <div className="flex justify-between mt-8">
            <Button className="rounded-none h-12 w-28 md:h-14 md:w-40" onClick={handleBack}>Précédent</Button>
            <Button className="rounded-none h-12 w-28 md:h-14 md:w-40 disabled:bg-black disabled:text-white disabled:opacity-100 disabled:cursor-pointer" 
                onClick={handleNext} 
                disabled={isNextButtonDisabled()}>
                {isSubmitting ? 'Envoi en cours...' : 'Suivant'}
            </Button>
        </div>
    </div>
)}

                    {step === 7 && (
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl text-center lg:text-4xl font-semibold mt-16 mb-10">C'est déjà fini !</h3>
                            <p className="mb-4">
                                Merci d'avoir rempli notre formulaire de demande de devis. Votre satisfaction est notre priorité et nous sommes ravis de pouvoir vous aider à concrétiser votre projet de rénovation et de décoration d'intérieur.
                            </p>
                            <p className="mb-4">
                                Nous avons bien reçu vos informations et notre équipe va les analyser avec attention. Vous serez contacté sous peu pour discuter des détails supplémentaires et vous fournir un devis personnalisé.
                            </p>
                            <p className="mb-4">
                                En attendant, n'hésitez pas à nous contacter pour toute question ou information complémentaire.
                            </p>
                            <Button onClick={() => window.location.href = '/'} className="bg-black text-white h-12 w-28 md:h-14 md:w-40 rounded-none">
                                Retourner à l'accueil
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}