import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faHeart,
  faPeopleGroup,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/components/about/page-hero.scss';
import '../styles/components/about/history-section.scss';
import '../styles/components/about/timeline-section.scss';
import '../styles/components/about/pillars-section.scss';

const pillars = [
  {
    title: 'Amour',
    description: 'Accompagner avec cordialité, disponibilité et écoute.',
    icon: faHeart,
  },
  {
    title: 'Respect',
    description: 'Esprit de tolérance totale vis-à-vis du vécu, des choix et des croyances.',
    icon: faHandshake,
  },
  {
    title: 'Dignité',
    description: "Garantir la considération et l'intimité de la personne, malgré la dépendance.",
    icon: faUserShield,
  },
  {
    title: 'Conscience Institutionnelle',
    description: 'Œuvrer ensemble dans un esprit communautaire et familial.',
    icon: faPeopleGroup,
  },
];

export default function QuiSommesNousPage() {
  return (
    <main>
      <section className="page-hero">
        <Image
          src="/about-top.png"
          alt="Huit siècles de dévouement au service de l'humain"
          fill
          className="page-hero__background"
          quality={100}
        />
        <div className="page-hero__container">
          <div className="page-hero__content">
            <h1>Huit siècles de dévouement au service de l'humain.</h1>
            <p>
              De la mission séculaire des Sœurs Augustines à l'accompagnement moderne de
              l'Association Clairefontaine.
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
              Héritière d'une mission de charité débutée au <strong>XIIIème siècle</strong> par
              les Sœurs de Notre Dame du Fief, l'Association Clairefontaine perpétue
              aujourd'hui cet engagement auprès des plus fragiles.
            </p>
            <p>
              Portés par des équipes laïques mais animés par les mêmes valeurs originelles, nous
              gérons des lieux de vie où l'expérience du grand âge se conjugue avec{' '}
              <strong>humanité, dignité et respect</strong>. Notre priorité absolue : mettre chaque
              résident au centre de nos attentions pour lui permettre de rester « debout », acteur
              de sa propre vie au sein d'une communauté familiale et solidaire.
            </p>
          </div>
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="timeline-title">
        <div className="timeline-section__container">
          <h2 id="timeline-title" className="timeline-section__title">Notre Histoire</h2>

          <div className="timeline">
            <article className="timeline__row timeline__row--first">
              <div className="timeline__content timeline__content--left">
                <h3>XIIIème Siècle</h3>
                <p>
                  Les Sœurs Augustines prennent la direction de l'Hôpital Sainte-Marie à
                  Bailleul. Elles soignent sans salaire, portées par la charité.
                </p>
              </div>
              <span className="timeline__marker" aria-hidden="true" />
              <div className="timeline__image timeline__image--first">
                <Image
                  src="/history-first.png"
                  alt="Photographie ancienne de l'Hôpital Sainte-Marie à Bailleul"
                  width={655}
                  height={304}
                  sizes="(max-width: 768px) 85vw, 50vw"
                />
              </div>
            </article>

            <article className="timeline__row">
              <span className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content timeline__content--right">
                <h3>1646 - 1681</h3>
                <p>
                  Épreuves de la peste et des incendies. Les Sœurs manifestent un esprit de
                  sacrifice total, certaines le payant de leur vie.
                </p>
              </div>
            </article>

            <article className="timeline__row">
              <div className="timeline__content timeline__content--left">
                <h3>1790 - 1794</h3>
                <p>
                  La Révolution. Malgré la confiscation de leurs biens et la prison, elles
                  restent au chevet des malades et des soldats.
                </p>
              </div>
              <span className="timeline__marker" aria-hidden="true" />
            </article>

            <article className="timeline__row timeline__row--last">
              <div className="timeline__image timeline__image--last">
                <Image
                  src="/history-last.png"
                  alt="Une personne âgée tenant la main d'un accompagnant"
                  width={597}
                  height={246}
                  sizes="(max-width: 768px) 85vw, 50vw"
                />
              </div>
              <div className="timeline__last-events">
                <div className="timeline__event">
                  <span className="timeline__marker" aria-hidden="true" />
                  <div className="timeline__content timeline__content--right">
                    <h3>1914 - 1918</h3>
                    <p>
                      Les deux Guerres Mondiales. Après la destruction totale de leur
                      monastère, elles reconstruisent sans cesse pour continuer leur ministère.
                    </p>
                  </div>
                </div>

                <div className="timeline__event">
                  <span className="timeline__marker" aria-hidden="true" />
                  <div className="timeline__content timeline__content--right">
                    <h3>Aujourd&apos;hui</h3>
                    <p>
                      L&apos;Association Clairefontaine prend le relais pour gérer les Maisons de
                      Famille, alliant expertise laïque et valeurs originelles.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="pillars-section" aria-labelledby="pillars-title">
        <div className="pillars-section__container">
          <h2 id="pillars-title" className="pillars-section__title">Nos 4 Piliers</h2>

          <div className="pillars-section__grid">
            {pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.title}>
                <div className="pillar-card__icon">
                  <FontAwesomeIcon icon={pillar.icon} aria-hidden="true" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
