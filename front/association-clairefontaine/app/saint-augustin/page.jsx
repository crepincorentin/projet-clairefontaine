import Image from 'next/image';
import Link from 'next/link';
import '../styles/components/establishments/saint-augustin.scss';

export const metadata = {
  title: 'Maison de Famille Saint-Augustin | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Saint-Augustin, EHPAD situé au cœur de Bergues.',
};

export default function SaintAugustinPage() {
  return (
    <div className="saint-augustin-page">
      <section className="saint-augustin-hero" aria-labelledby="saint-augustin-title">
        <div className="saint-augustin-hero__heading">
          <h1 id="saint-augustin-title">
            EHPAD Maison de
            <span>Famille Saint Augustin</span>
          </h1>
          <p>Bergues</p>
        </div>

        <div className="saint-augustin-hero__visual">
          <div className="saint-augustin-hero__image">
            <Image
              src="/saint-augustin.jpeg"
              alt="Façade de la Maison de Famille Saint-Augustin à Bergues"
              fill
              priority
              sizes="(max-width: 768px) 92vw, 800px"
            />
          </div>

          <div className="saint-augustin-hero__badge saint-augustin-hero__badge--staff">
            <span><strong>XX</strong> soignants &amp;</span>
            <span>encadrants</span>
          </div>
          <div className="saint-augustin-hero__badge saint-augustin-hero__badge--location">
            Au cœur de
            <span>Bergues</span>
          </div>
        </div>
      </section>

      <section className="saint-augustin-about" aria-labelledby="saint-augustin-about-title">
        <div className="saint-augustin-about__container">
          <div className="saint-augustin-about__image">
            <Image
              src="/association.png"
              alt="Une résidente participant à une activité accompagnée"
              width={552}
              height={600}
              sizes="(max-width: 768px) 92vw, 440px"
            />
          </div>

          <div className="saint-augustin-about__content">
            <span className="saint-augustin-about__eyebrow">À propos</span>
            <h2 id="saint-augustin-about-title">Un lieu de vie empreint d&apos;histoire</h2>
            <p>
              Héritière de la mission des Sœurs de Notre Dame du Fief, la Maison Saint-Augustin
              accueille les seniors de plus de 60 ans, valides ou en perte d&apos;autonomie. Notre
              priorité est de permettre à chaque résident de rester « debout », dans le respect
              total de sa dignité et de ses habitudes de vie.
            </p>
            <Link href="/contact" className="saint-augustin-about__button">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
