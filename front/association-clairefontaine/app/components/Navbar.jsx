'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import '../styles/components/navbar.scss';

const navLinks = [
  {
    label: 'Accueil',
    href: '/',
  },
  {
    label: 'Qui sommes-nous ?',
    href: '/qui-sommes-nous',
  },
];

const establishments = [
  {
    name: 'Maison de famille Saint-Augustin',
    city: 'Bergues',
    href: '/saint-augustin',
  },
  {
    name: 'Maison de famille Clairefontaine',
    city: 'Hazebrouck',
    href: '/clairefontaine',
  },
  {
    name: 'Maison de famille Jeanne Jugan',
    city: 'Dunkerque',
    href: '/jeanne-jugan',
  },
  {
    name: 'Résidence autonomie Montjoie',
    city: 'Dunkerque',
    href: '/jeanne-jugan#residence-montjoie',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEstablishmentsOpen, setIsEstablishmentsOpen] = useState(false);

  const closeNavigation = () => {
    setIsMenuOpen(false);
    setIsEstablishmentsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeNavigation();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeNavigation();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar__container">
        <div className="navbar__brand">
          <Link href="/" className="navbar__logo" aria-label="Retour à l'accueil" onClick={closeNavigation}>
            <Image
              src="/logo.png"
              alt="Association Clairefontaine Logo"
              width={180}
              height={60}
              priority
            />
          </Link>
        </div>

        <button
          type="button"
          className="navbar__toggle"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`navbar__panel${isMenuOpen ? ' navbar__panel--open' : ''}`}
          id="main-navigation"
        >
          <nav className="navbar__nav" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'navbar__link navbar__link--active' : 'navbar__link'}
                onClick={closeNavigation}
              >
                {link.label}
              </Link>
            ))}

            <div className={`navbar__establishments${isEstablishmentsOpen ? ' navbar__establishments--open' : ''}`}>
              <button
                type="button"
                className="navbar__dropdown-button"
                aria-expanded={isEstablishmentsOpen}
                aria-controls="establishments-menu"
                onClick={() => setIsEstablishmentsOpen((current) => !current)}
              >
                Nos établissements
              </button>

              <div className="navbar__dropdown" id="establishments-menu">
                <p className="navbar__dropdown-title">Choisir un établissement</p>
                <ul>
                  {establishments.map((establishment) => (
                    <li key={establishment.href}>
                      <Link
                        href={establishment.href}
                        className={pathname === establishment.href ? 'navbar__dropdown-link navbar__dropdown-link--active' : 'navbar__dropdown-link'}
                        onClick={closeNavigation}
                      >
                        <span>{establishment.name}</span>
                        <small>{establishment.city}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <div className="navbar__contact">
            <Link href="/contact" className="navbar__contact-button" onClick={closeNavigation}>
              Nous contacter
            </Link>
          </div>
        </div>

        <button
          type="button"
          className={`navbar__overlay${isMenuOpen ? ' navbar__overlay--visible' : ''}`}
          aria-label="Fermer le menu"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={closeNavigation}
        />
      </div>
    </header>
  );
}
