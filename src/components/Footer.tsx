'use client';

import Link from 'next/link';
import { Instagram,  Phone, Mail, MessageSquare } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-8 pb-4">
      <div className="container-custom">
        <div className="flex w-4/5 mx-auto flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left mb-6">
          
          {/* Logo */}
          <div className="mb-8 md:mb-0 flex justify-center items-start md:items-center w-full md:w-auto h-full">
            <Link href="/" className="inline-block">
              <img 
                src="/logo/logov2-1.svg" 
                alt="Logo" 
                className="w-28 h-auto" 
              />
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-medium mb-4">Réseaux sociaux</h3>
            <ul className="space-y-3">
              <li>
              <a
  href="https://www.instagram.com/millabarton/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start"
>
  <Instagram size={18} />
  <span>Instagram</span>
</a>

              </li>
              
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-medium mb-4">Contactez nous</h3>
            <ul className="space-y-3">
            <li className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
  <a
    href="tel:+33664025668"
    className="flex items-center gap-2 hover:text-white transition-colors"
  >
    <Phone size={18} />
    <span>+33 6 64 02 56 68</span>
  </a>
</li>

              <li>
              <a href="mailto:barton.milla@orange.fr" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
  <Mail size={18} />
  <span>barton.milla@orange.fr</span>
</a>

              </li>
              <li>
              <a
  href="https://wa.me/33664025668"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start"
>
  <FaWhatsapp size={18} />
  <span>Whatsapp</span>
</a>

              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
  <div className="w-full md:w-4/5 mx-auto my-6 pt-4 flex flex-col md:flex-row justify-between items-center px-4">
    <p className="text-white text-xs md:text-lg mb-2 md:mb-0 text-center md:text-left">
      © 2021 - 2025 MILLA BARTON Tous droits réservés.
    </p>
    <div className="flex gap-6 justify-center md:justify-start">
      <Link href="#" className="text-white hover:text-gray-400 transition-colors text-sm md:text-lg font-bold">
        Mentions Légales
      </Link>
      <Link href="#" className="text-white hover:text-gray-400 transition-colors font-bold text-sm md:text-lg">
        Politique de confidentialité
      </Link>
    </div>
  </div>
</div>

    </footer>
  );
}
