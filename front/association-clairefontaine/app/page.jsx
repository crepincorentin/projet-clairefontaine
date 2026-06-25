// src/app/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faAward,
  faBookOpen,
  faBuilding,
  faHeart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './styles/components/home/hero.scss';
import './styles/components/home/about-section.scss';
import './styles/components/home/stats-section.scss';
import './styles/components/home/establishments-section.scss';
import './styles/components/home/faq.scss';
import './styles/components/home/cta-section.scss';
import Faq from './components/Faq';
import Cta from './components/Cta';

const establishments = [
  { name: 'Maison de famille Saint-Augustin', location: 'Bergues', image: '/saint-augustin.jpeg', link: '/saint-augustin' },
  { name: 'Maison de famille Clairefontaine', location: 'Hazebrouck', image: '/clairefontaine.jpeg', link: '/clairefontaine' },
  { name: 'Maison de famille Jeanne Jugan', location: 'Dunkerque', image: '/jeannejugan.jpeg', link: '/jeanne-jugan' },
  { name: 'Résidence autonomie Montjoie', location: 'Dunkerque', image: '/montjoie.jpeg', link: '/montjoie' },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <Image
          src="/clairefontaine_exterieur.jpeg"
          alt="Prendre soin de chacun, chaque jour"
          fill
          objectFit="cover"
          className="hero__background"
          loading='eager'
          quality={100}
        />
        <div className="hero__content">
          <h1>Prendre soin de chacun, chaque jour</h1>
          <p>
            Un acteur à but non lucratif engagé pour le bien-être de vos proches à travers nos
            trois établissements médico-sociaux.
          </p>
          <Link href="/en-savoir-plus" className="hero__button">
            En savoir plus
          </Link>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section__container">
          <div className="about-section__visual">
            <div className="about-section__decoration" aria-hidden="true" />
            <div className="about-section__image">
              <Image
                src="/mains.jpeg"
                alt="Notre association"
                width={500}
                height={500}
                sizes="(max-width: 900px) 92vw, 480px"
              />
            </div>
          </div>
          <div className="about-section__content">
            <h2>Notre association</h2>
            <p>
              Héritière d&apos;une mission de soin née au XIIIème siècle, l&apos;
              <strong>Association Clairefontaine</strong> place la dignité des résidents au centre
              de ses priorités. Acteur à but non lucratif, nous accompagnons les aînés et leurs
              familles avec éthique et solidarité.
            </p>
            <div className="about-section__highlights">
              <div className="highlight-card">
                <FontAwesomeIcon icon={faBookOpen} />
                <h3>Héritage séculaire</h3>
                <p>Une mission de solidarité pour soutenir les plus fragiles.</p>
              </div>
              <div className="highlight-card">
                <FontAwesomeIcon icon={faHeart} />
                <h3>Dignité & Respect</h3>
                <p>Une approche humaine pour permettre à chacun de rester acteur de sa vie.</p>
              </div>
            </div>
            <Link href="/qui-sommes-nous" className="about-section__button">
              En savoir plus sur notre histoire
            </Link>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-section__container">
          <div className="stats-section__title-container">
            <h2>
              L&apos;association Clairefontaine en quelques chiffres
            </h2>
          </div>
          <div className="stats-section__stats">
            <article className="stats-section__stat">
              <span className="number">217</span>
              <span className="label">
                <FontAwesomeIcon icon={faUser} />
                Résidents
              </span>
            </article>
            <article className="stats-section__stat">
              <span className="number">30</span>
              <span className="label">
                <FontAwesomeIcon icon={faAward} />
                Années d&apos;existence
              </span>
            </article>
            <article className="stats-section__stat">
              <span className="number">4</span>
              <span className="label">
                <FontAwesomeIcon icon={faBuilding} />
                Établissements
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="establishments-section">
        <h2 className="establishments-section__title">Nos établissements</h2>
        <div className="establishments-section__grid">
          {establishments.map((estab, index) => (
            <div key={index} className="establishment-card">
              <Image
                src={estab.image}
                alt={estab.name}
                layout="fill"
                className="establishment-card__image"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
              <div className="establishment-card__overlay" />
              <div className="establishment-card__content">
                <h3 className="establishment-card__name">{estab.name}</h3>
                <div className="establishment-card__details">
                  <p className="establishment-card__location">{estab.location}</p>
                  <Link href={estab.link} className="establishment-card__link">
                    Découvrir <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      <Faq />

      <Cta />
    </main>
  );
}
