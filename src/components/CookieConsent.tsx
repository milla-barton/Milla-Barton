'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ChevronUp, ChevronDown, ChevronRight, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMinimized, setShowMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [consent, setConsent] = useState({
    fonctionnel: true,
    statistiques: false,
    marketing: false
  });

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  useEffect(() => {
    const savedConsent = Cookies.get('cookie-consent');
    if (!savedConsent) {
      // Check if mobile immediately
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // Mobile - show after 10 seconds
        const timer = setTimeout(() => {
          if (!consentGiven) {
            setIsVisible(true);
          }
        }, 10000);
        
        return () => clearTimeout(timer);
      } else {
        // Desktop - show immediately
        setIsVisible(true);
      }
    } else {
      setConsent(JSON.parse(savedConsent));
      setConsentGiven(true);
    }
  }, [consentGiven]);

  const handleAcceptAll = () => {
    const newConsent = {
      fonctionnel: true,
      statistiques: true,
      marketing: true
    };
    setConsent(newConsent);
    Cookies.set('cookie-consent', JSON.stringify(newConsent), { expires: 365 });
    setConsentGiven(true);
    setIsVisible(false);
    setShowMinimized(false);
  };

  const handleRejectAll = () => {
    const newConsent = {
      fonctionnel: true,
      statistiques: false,
      marketing: false
    };
    setConsent(newConsent);
    Cookies.set('cookie-consent', JSON.stringify(newConsent), { expires: 365 });
    setConsentGiven(true);
    setIsVisible(false);
    setShowMinimized(false);
  };

  const handleSavePreferences = () => {
    Cookies.set('cookie-consent', JSON.stringify(consent), { expires: 365 });
    setConsentGiven(true);
    setIsVisible(false);
    setShowMinimized(false);
  };

  const toggleCategory = (category: keyof typeof consent) => {
    if (category === 'fonctionnel') return;
    setConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleCategoryExpand = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const openConsentModal = () => {
    setIsVisible(true);
    setShowMinimized(false);
  };

  const closeConsentModal = () => {
    setIsVisible(false);
    if (!consentGiven) {
      setShowMinimized(true);
    }
  };

  if (consentGiven) return null;

  return (
    <>
      {/* Minimized state - floating button */}
      {showMinimized && (
        <div 
          className="fixed bottom-0 right-2 z-50 cursor-pointer"
          onClick={openConsentModal}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-white px-4 rounded-none shadow-lg flex items-center justify-center border border-gray-200">
            <ChevronUp size={32} className="text-gray-500"/>
          </div>
        </div>
      )}

      {/* Expanded state - consent modal */}
      {isVisible && (
        <div 
          className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-4 lg:bottom-4 z-50"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-white shadow-xl w-full lg:w-auto lg:max-w-lg relative">
            <button 
              onClick={closeConsentModal}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} className="text-gray-500" />
            </button>
            
            <div className="p-4">
              <h1 className="text-lg font-bold mb-3">Gérer le consentement</h1>
              
              {!isExpanded ? (
                <>
                  <p className="text-xs text-gray-600 mb-8">
                  Pour offrir les meilleures expériences, nous utilisons des technologies telles que les cookies pour stocker et/ou accéder aux informations des appareils. Le fait de consentir à ces technologies nous permettra de traiter des données telles que le comportement de navigation ou les ID uniques sur ce site. Le fait de ne pas consentir ou de retirer son consentement peut avoir un effet négatif sur certaines caractéristiques et fonctions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={handleAcceptAll}
                      className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 font-medium flex-grow min-w-[120px]"
                      
                    >
                      Accepter
                    </button>
                    <button 
                      onClick={handleRejectAll}
                      className="px-4 py-2 bg-gray-50 text-black rounded text-sm hover:bg-gray-200 font-medium flex-grow min-w-[120px]"
                      
                    >
                      Refuser
                    </button>
                    <button 
                      onClick={() => setIsExpanded(true)}
                      className="px-4 py-2 bg-gray-50 text-black rounded text-sm hover:bg-gray-200 font-medium flex-grow min-w-[120px] md:min-w-[150px]"
                      
                    >
                      Voir les préférences
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-600 mb-8">
                  Pour offrir les meilleures expériences, nous utilisons des technologies telles que les cookies pour stocker et/ou accéder aux informations des appareils. Le fait de consentir à ces technologies nous permettra de traiter des données telles que le comportement de navigation ou les ID uniques sur ce site. Le fait de ne pas consentir ou de retirer son consentement peut avoir un effet négatif sur certaines caractéristiques et fonctions.
                  </p>

                  {/* Fonctionnel */}
                  <div 
                    className="mb-3 p-4 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div 
                      className="flex justify-between items-center"
                      onClick={() => toggleCategoryExpand('fonctionnel')}
                    >
                      <div>
                        <div className="text-sm font-medium">Fonctionnel</div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className="text-xs font-bold text-green-600">Toujours actif</div>
                        {expandedCategory === 'fonctionnel' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                    </div>
                    {expandedCategory === 'fonctionnel' && (
                      <div className="mt-2 text-xs text-gray-600">
                        L'accès ou le stockage technique est strictement nécessaire dans la finalité d'intérêt légitime de permettre l'utilisation d'un service spécifique explicitement demandé par l'abonné ou l'utilisateur, ou dans le seul but d'effectuer la transmission d'une communication sur un réseau de communications électroniques.
                      </div>
                    )}
                  </div>

                  {/* Statistiques */}
                  <div 
                    className="mb-3 p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="flex justify-between items-center">
                      <div 
                        className="flex-grow cursor-pointer"
                        onClick={() => toggleCategoryExpand('statistiques')}
                      >
                        <div className="text-sm font-medium">Statistiques</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={consent.statistiques}
                            onChange={() => toggleCategory('statistiques')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleCategoryExpand('statistiques')}
                        >
                          {expandedCategory === 'statistiques' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </div>
                    </div>
                    {expandedCategory === 'statistiques' && (
                      <div className="mt-2 text-xs text-gray-600">
                        Le stockage ou l'accès technique qui est utilisé exclusivement à des fins statistiques.
                      </div>
                    )}
                  </div>

                  {/* Marketing */}
                  <div 
                    className="mb-4 p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <div className="flex justify-between items-center">
                      <div 
                        className="flex-grow cursor-pointer"
                        onClick={() => toggleCategoryExpand('marketing')}
                      >
                        <div className="text-sm font-medium">Marketing</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={consent.marketing}
                            onChange={() => toggleCategory('marketing')}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-orange-500 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-900 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                        <div 
                          className="cursor-pointer"
                          onClick={() => toggleCategoryExpand('marketing')}
                        >
                          {expandedCategory === 'marketing' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </div>
                      </div>
                    </div>
                    {expandedCategory === 'marketing' && (
                      <div className="mt-2 text-xs text-gray-600">
                        L'accès ou le stockage technique est nécessaire pour créer des profils d'internautes afin d'envoyer des publicités, ou pour suivre l'utilisateur sur un site web ou sur plusieurs sites web ayant des finalités marketing similaires.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={handleAcceptAll}
                      className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 font-medium flex-grow min-w-[120px]"
                      
                    >
                      Tout accepter
                    </button>
                    <button 
                      onClick={handleRejectAll}
                      className="px-4 py-2 bg-gray-50 text-black rounded text-sm hover:bg-gray-800 font-medium flex-grow min-w-[120px]"
                      
                    >
                      Tout refuser
                    </button>
                    <button 
                      onClick={handleSavePreferences}
                      className="px-4 py-2 bg-gray-50 text-black rounded text-sm hover:bg-gray-200 font-medium flex-grow min-w-[120px] md:min-w-[150px]"
                      
                    >
                      Enregistrer les préférences
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}