import Link from 'next/link';
import Image from 'next/image';
import '../styles/components/navbar.scss';

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
          <Link href="/nos-etablissements">Nos établissements</Link>
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