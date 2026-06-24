import Link from 'next/link';
import Image from 'next/image';
import '../styles/components/navbar.scss';

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
    href: '/etablissements/montjoie',
  },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Association Clairefontaine Logo"
              width={150}
              height={50}
            />
          </Link>
        </div>
        <nav className="navbar__nav">
          <Link href="/">Accueil</Link>
          <Link href="/qui-sommes-nous">Qui sommes-nous ?</Link>
          <details className="navbar__establishments">
            <summary>Nos établissements</summary>
            <ul className="navbar__dropdown">
              {establishments.map((establishment) => (
                <li key={establishment.href}>
                  <Link href={establishment.href}>
                    <span>{establishment.name}</span>
                    <small>{establishment.city}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
        <div className="navbar__contact">
          <Link href="/contact" className="navbar__contact-button">
            Nous contacter
          </Link>
        </div>
      </div>
    </header>
  );
}
