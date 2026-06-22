import Link from 'next/link';
import Image from 'next/image';
import '../styles/components/page-hero.scss';
import '../styles/components/history-section.scss';

export default function QuiSommesNousPage() {
  return (
    <main>
      <section className="page-hero">
        <Image
          src="/about-top.png"
          alt="Huit siècles de dévouement au service de l'humain"
          layout="fill"
          className="page-hero__background"
          quality={100}
        />
        <div className="page-hero__container">
          <div className="page-hero__content">
            <h1>Huit siècles de dévouement au service de l'humain.</h1>
            <p>
              De la mission séculaire des Sœurs Augustines à l'accompagnement moderne de l'Association Clairefontaine.
            </p>
            <Link href="/contact" className="page-hero__button">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="history-section__container">
          <h2 className="history-section__title">L'Humain au cœur de notre histoire</h2>
          <div className="history-section__content">
            <p>
              Héritière d'une mission de charité débutée au <strong>XIIIème siècle</strong> par les Sœurs de Notre Dame du Fief, l'Association Clairefontaine perpétue aujourd'hui cet engagement auprès des plus fragiles.
            </p>
            <p>
              Portés par des équipes laïques mais animés par les mêmes valeurs originelles, nous gérons des lieux de vie où l'expérience du grand âge se conjugue avec <strong>humanité, dignité et respect</strong>. Notre priorité absolue : mettre chaque résident au centre de nos attentions pour lui permettre de rester « debout », acteur de sa propre vie au sein d'une communauté familiale et solidaire.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
