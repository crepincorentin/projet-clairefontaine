// src/app/page.jsx
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './styles/components/home/hero.scss';
import './styles/components/home/about-section.scss';
import './styles/components/home/stats-section.scss';
import './styles/components/home/establishments-section.scss';
import './styles/components/home/faq.scss';
import './styles/components/home/cta-section.scss';
import Faq from './components/Faq';
import Cta from './components/Cta';

const establishments = [
  { name: 'Maison de famille Saint-Augustin (Bergues)', image: '/saint-augustin.jpeg', link: '/etablissements/saint-augustin' },
  { name: 'Maison de famille Clairefontaine (Hazebrouck)', image: '/clairefontaine.jpg', link: '/etablissements/clairefontaine' },
  { name: 'Maison de famille Jeanne Jugan (Dunkerque)', image: '/jeanne-jugan.jpg', link: '/etablissements/jeanne-jugan' },
  { name: 'Résidence autonomie Montjoie (Dunkerque)', image: '/montjoie.jpg', link: '/etablissements/montjoie' },
];

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

      <section className="stats-section">
        <div className="stats-section__container">
          <div className="stats-section__title-container">
            <h3>L'association Clairefontaine en quelques chiffres</h3>
          </div>
          <div className="stats-section__stats">
            <div className="stats-section__stat">
              <span className="number">500</span>
              <span className="label">
                <FontAwesomeIcon icon={faUser} />
                Résidents
              </span>
            </div>
            <div className="stats-section__stat">
              <span className="number">30</span>
              <span className="label">
                <FontAwesomeIcon icon={faStar} />
                Années d'existence
              </span>
            </div>
            <div className="stats-section__stat">
              <span className="number">4</span>
              <span className="label">
                <FontAwesomeIcon icon={faStar} />
                Etablissements
              </span>
            </div>
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
              />
              <div className="establishment-card__overlay">
                <h3 className="establishment-card__name">{estab.name}</h3>
                <Link href={estab.link} className="establishment-card__link">
                  Voir <FontAwesomeIcon icon={faArrowRight} />
                </Link>
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