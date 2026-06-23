import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../styles/components/establishments/establishment-page.scss';

const stepModifiers = ['one', 'two', 'three'];

export default function EstablishmentPage({ establishment }) {
  const {
    slug,
    theme,
    hero,
    about,
    services,
    admission,
    solutions,
    pricing,
    location,
  } = establishment;

  const pageStyle = {
    '--establishment-color': theme.primary,
    '--establishment-accent': theme.accent,
  };

  return (
    <div className="establishment-page" style={pageStyle}>
      <section className="establishment-hero" aria-labelledby={`${slug}-title`}>
        <div className="establishment-hero__heading">
          <h1 id={`${slug}-title`}>
            {hero.title.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p>{hero.location}</p>
        </div>

        <div className="establishment-hero__visual">
          <div className="establishment-hero__image">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 768px) 92vw, 800px"
            />
          </div>

          <div className="establishment-hero__badge establishment-hero__badge--staff">
            <span>
              <strong>{hero.staff.value}</strong> {hero.staff.firstLine}
            </span>
            <span>{hero.staff.secondLine}</span>
          </div>
          <div className="establishment-hero__badge establishment-hero__badge--location">
            {hero.locationBadge.firstLine}
            <span>{hero.locationBadge.secondLine}</span>
          </div>
        </div>
      </section>

      <section className="establishment-about" aria-labelledby={`${slug}-about-title`}>
        <div className="establishment-about__container">
          <div className="establishment-about__image">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              width={about.image.width}
              height={about.image.height}
              sizes="(max-width: 768px) 92vw, 440px"
            />
          </div>

          <div className="establishment-about__content">
            <span className="establishment-about__eyebrow">{about.eyebrow}</span>
            <h2 id={`${slug}-about-title`}>{about.title}</h2>
            <p>{about.description}</p>
            <Link href={about.button.href} className="establishment-about__button">
              {about.button.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="establishment-services" aria-labelledby={`${slug}-services-title`}>
        <div className="establishment-services__container">
          <h2 id={`${slug}-services-title`}>{services.title}</h2>

          <div className="establishment-services__grid">
            {services.items.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-card__icon">
                  <FontAwesomeIcon icon={service.icon} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="admission-section" aria-labelledby={`${slug}-admission-title`}>
        <div className="admission-section__container">
          <div className="admission-section__intro">
            <h2 id={`${slug}-admission-title`}>
              {admission.title.map((line) => <span key={line}>{line}</span>)}
            </h2>
            <p>{admission.description}</p>
          </div>

          <svg
            className="admission-section__path"
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 250 C120 340 180 340 275 230 C370 120 455 160 535 165 C650 175 650 90 745 18 C825 -42 910 -2 1000 12" />
          </svg>

          <div className="admission-section__steps">
            {admission.steps.map((step, index) => (
              <article
                className={`admission-step admission-step--${stepModifiers[index]}`}
                key={step.title}
              >
                <span className="admission-step__number" aria-hidden="true">{index + 1}</span>
                <span className="admission-step__marker" aria-hidden="true" />
                <div className="admission-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {solutions && (
        <section className="solutions-section" aria-labelledby={`${slug}-solutions-title`}>
          <svg
            className="solutions-section__background"
            viewBox="0 0 1440 700"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 0H1440V635C1110 638 935 620 700 520C470 445 190 605 0 630V0Z" />
          </svg>

          <div className="solutions-section__container">
            <div className="solutions-section__presentation">
              <h2 id={`${slug}-solutions-title`}>{solutions.title}</h2>
              <p>{solutions.description}</p>
              <div className="solutions-section__image">
                <Image
                  src={solutions.image.src}
                  alt={solutions.image.alt}
                  width={solutions.image.width}
                  height={solutions.image.height}
                  sizes="(max-width: 900px) 92vw, 480px"
                />
              </div>
            </div>

            <div className="solutions-section__list">
              {solutions.items.map((solution) => (
                <article key={solution.title}>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {pricing && (
        <section className="pricing-section" aria-labelledby={`${slug}-pricing-title`}>
          <div className="pricing-section__container">
            <h2 id={`${slug}-pricing-title`}>{pricing.title}</h2>

            <div className="pricing-section__layout">
              <div className="pricing-section__table-card">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">{pricing.columns.label}</th>
                      <th scope="col">{pricing.columns.price}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.rows.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td>{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="pricing-section__note">
                  <strong>{pricing.note.title}</strong> {pricing.note.description}
                </p>
              </div>

              <div className="pricing-section__image">
                <Image
                  src={pricing.image.src}
                  alt={pricing.image.alt}
                  width={pricing.image.width}
                  height={pricing.image.height}
                  sizes="(max-width: 850px) 92vw, 480px"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {location && (
        <section className="location-section" aria-labelledby={`${slug}-location-title`}>
          <div className="location-section__container">
            <h2 id={`${slug}-location-title`}>{location.title}</h2>

            <div className="location-section__map">
              <iframe
                src={location.mapEmbedUrl}
                title={`Carte de ${location.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="location-section__details">
              <h3>{location.name}</h3>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="location-section__address"
              >
                {location.address}
              </a>
              <a href={location.phoneHref}>{location.phone}</a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
