import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandshake,
  faHeart,
  faPeopleGroup,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import Cta from '../components/Cta';
import '../styles/components/about/page-hero.scss';
import '../styles/components/about/history-section.scss';
import '../styles/components/about/timeline-section.scss';
import '../styles/components/about/pillars-section.scss';
import '../styles/components/about/management-section.scss';
import '../styles/components/home/cta-section.scss';

const pillars = [
  {
    title: 'Amour',
    description: 'Accompagner avec bienveillance et écoute',
    icon: faHeart,
  },
  {
    title: 'Respect',
    description: 'Accueillir chacun dans sa singularité',
    icon: faHandshake,
  },
  {
    title: 'Dignité',
    description: "Préserver l'identité et l'autonomie de la personne",
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
          src="/illustration_personnes.jpg"
          alt="Huit siècles de dévouement au service de l'humain"
          fill
          className="page-hero__background"
          quality={100}
        />
        <div className="page-hero__container">
          <div className="page-hero__content">
            <h1>Huit siècles de dévouement au service de l&apos;humain.</h1>
            <p>
              De la mission séculaire des Sœurs Augustines à l&apos;accompagnement moderne de
              l&apos;Association Clairefontaine.
            </p>
            <Link href="/contact" className="page-hero__button">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="history-section__container">
          <h2 className="history-section__title">Bienvenue à l&apos;Association Clairefontaine</h2>
          <div className="history-section__content">
            <p className="history-section__lead">
              Depuis plus de <strong>800 ans</strong>, une même vocation nous anime : prendre
              soin des personnes les plus fragiles avec respect, bienveillance et humanité.
            </p>

            <div className="history-section__cards">
              <article className="history-section__card">
                <span>Notre héritage</span>
                <p>
                  Héritière de l&apos;œuvre des Sœurs de Notre-Dame du Fief, l&apos;Association
                  Clairefontaine accompagne aujourd&apos;hui les personnes âgées au sein de nos
                  trois établissements : Saint-Augustin à Bergues, Clairefontaine à Hazebrouck
                  et Jeanne Jugan à Dunkerque.
                </p>
              </article>

              <article className="history-section__card">
                <span>Notre engagement</span>
                <p>
                  Parce que chaque personne est unique, nous plaçons la dignité, l&apos;écoute et
                  le lien humain au cœur de notre engagement quotidien afin d&apos;offrir à chacun
                  un accompagnement personnalisé dans un environnement chaleureux et sécurisé.
                </p>
              </article>
            </div>

            <p className="history-section__mission">
              Prendre soin, accompagner, respecter : telle est notre mission depuis plus de huit
              siècles.
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
                  Les Sœurs Augustines prennent la direction de l&apos;Hôpital Sainte-Marie à
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

      <section className="management-section" aria-labelledby="management-title">
        <div className="management-section__container">
          <div className="management-section__visual">
            <div className="management-section__image">
              <Image
                src="/directrice.jpeg"
                alt="Un moment d'échange entre une résidente et une accompagnante"
                width={522}
                height={546}
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
            <div className="management-section__badge">
              <span>Accompagner</span>
              <strong>avec attention</strong>
            </div>
          </div>

          <div className="management-section__content">
            <span className="management-section__eyebrow">Direction générale</span>
            <h2 id="management-title">
              Le mot de la Directrice
            </h2>
            <blockquote>
              <p>
                À l&apos;Association Clairefontaine, nous mettons toute notre expérience et notre
                engagement au service des personnes âgées que nous accompagnons.
              </p>
              <p>
                Guidés par nos valeurs de respect, de dignité, de bienveillance et de
                solidarité, nous veillons chaque jour à offrir un cadre de vie chaleureux,
                sécurisant et attentif aux besoins de chacun.
              </p>
              <p>
                Parce que chaque personne est unique, nous plaçons l&apos;écoute, le respect des
                droits et la qualité de l&apos;accompagnement au cœur de notre mission.
              </p>
            </blockquote>
            <div className="management-section__signature">
              <span>La Directrice</span>
              <strong>Association Clairefontaine</strong>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
