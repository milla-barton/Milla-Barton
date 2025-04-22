'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Facebook, Phone, Mail, MessageSquare } from 'lucide-react';

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
                <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Instagram size={18} />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Linkedin size={18} />
                  <span>Linkedin</span>
                </Link>
              </li>
              <li>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-medium mb-4">Coordonnées</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center gap-2 justify-center md:justify-start">
                <Phone size={18} />
                <span>09 24 72 52 51</span>
              </li>
              <li>
                <Link href="mailto:contact@mb-design.fr" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <Mail size={18} />
                  <span>Mail</span>
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/33924725251" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 justify-center md:justify-start">
                  <MessageSquare size={18} />
                  <span>Whatsapp</span>
                </Link>
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
