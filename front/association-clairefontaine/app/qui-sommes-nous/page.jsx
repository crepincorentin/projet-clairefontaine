import Link from 'next/link';
import Image from 'next/image';
import '../styles/components/about/page-hero.scss';
import '../styles/components/about/history-section.scss';
import '../styles/components/about/timeline-section.scss';

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
          <h2 className="history-section__title">L&apos;Humain au cœur de notre histoire</h2>
          <div className="history-section__content">
            <p>
              Héritière d&apos;une mission de charité débutée au <strong>XIIIème siècle</strong> par
              les Sœurs de Notre Dame du Fief, l&apos;Association Clairefontaine perpétue
              aujourd&apos;hui cet engagement auprès des plus fragiles.
            </p>
            <p>
              Portés par des équipes laïques mais animés par les mêmes valeurs originelles, nous
              gérons des lieux de vie où l&apos;expérience du grand âge se conjugue avec{' '}
              <strong>humanité, dignité et respect</strong>. Notre priorité absolue : mettre chaque
              résident au centre de nos attentions pour lui permettre de rester « debout », acteur
              de sa propre vie au sein d&apos;une communauté familiale et solidaire.
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
    </main>
  );
}
