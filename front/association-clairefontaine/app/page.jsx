// src/app/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import './styles/components/hero.scss';
import './styles/components/about-section.scss';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <Image
          src="/home-image.jpg"
          alt="L'humain au coeur du grand âge"
          layout="fill"
          objectFit="cover"
          className="hero__background"
          loading='eager'
          quality={100}
        />
        <div className="hero__content">
          <h1>L'humain au cœur du grand âge</h1>
          <p>Un acteur à but non lucratif engagé pour le bien-être de vos proches à travers nos trois établissements médico-sociaux.</p>
          <Link href="/en-savoir-plus" className="hero__button">
            En savoir plus
          </Link>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__image-container">
          <Image
            src="/association.png"
            alt="Notre association"
            width={500}
            height={500}
            className="about-section__image"
          />
        </div>
        <div className="about-section__content">
          <h2>Notre association</h2>
          <p>
            Héritière d'une mission de soin née au XIIIème siècle, l'<strong>Association Clairefontaine</strong> place la dignité des résidents au centre de ses priorités. Acteur à but non lucratif, nous accompagnons les aînés et leurs familles avec éthique et solidarité.
          </p>
          <ul>
            <li><strong>Héritage séculaire :</strong> Une mission de solidarité initiée par les Sœurs de Notre Dame du Fief pour soutenir les plus fragiles.</li>
            <li><strong>Dignité & Respect :</strong> Une approche humaine visant à permettre à chaque résident de rester acteur de sa vie.</li>
          </ul>
          <Link href="/notre-association" className="about-section__button">
            En savoir plus sur notre association
          </Link>
        </div>
      </section>
    </main>
  );
}