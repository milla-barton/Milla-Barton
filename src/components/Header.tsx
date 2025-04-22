'use client';

import Link from 'next/link';
import { useState, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Mode opératoire', href: '#services' },
    { label: 'Mila Barton', href: '#entreprise' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Devis', href: '#quickquote' },
  ];

  // Detect screen size and scroll on mount + resize/scroll
  useLayoutEffect(() => {
    const checkScreen = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (!large) setOpacity(1); // Always opaque on mobile
    };

    const handleScroll = () => {
      if (isLargeScreen) {
        const scrollY = window.scrollY;
        const newOpacity = Math.max(0.5, 1 - scrollY / 300);
        setOpacity(newOpacity);
      }
    };

    checkScreen();
    handleScroll();

    window.addEventListener('resize', checkScreen);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkScreen);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLargeScreen]);

  return (
    <header
      className="py-6 fixed w-full top-0 z-50 shadow-sm bg-black overflow-x-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-8 xl:px-16 flex items-center justify-between h-full gap-12 xl:gap-24 overflow-x-hidden">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center h-full">
            <Image
              src="/logo/logov2-1.svg"
              alt="Logo"
              width={120}
              height={60}
              className="w-[86px] h-auto md:w-40 md:h-20"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center h-full flex-1">
          <div className="flex items-center h-full gap-16 xl:gap-24">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-gray-300 transition-colors py-1 text-md xl:text-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block flex-shrink-0">
          <Button className="text-black bg-white hover:bg-slate-300 hover:text-black rounded-none h-12 px-8 text-xl xl:text-lg">
            <Link href="#quickquote">Devis Gratuit</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="lg:hidden text-white bg-black p-3 rounded-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AlignJustify style={{ width: '40px', height: '40px' }} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-black transition-colors py-3 border-b border-gray-100 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-black text-white hover:bg-gray-800 mt-6 py-4 text-lg">
                <Link href="#quickquote">Devis Gratuit</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
