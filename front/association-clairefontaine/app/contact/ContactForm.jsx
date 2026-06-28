'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { clairefontaine, jeannejugan, saintAugustin } from '../data/establishments';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => <p style={{ textAlign: 'center' }}>Chargement de la carte...</p>,
});

const locations = [
  {
    ...saintAugustin.location,
    coords: saintAugustin.location.coords,
    className: 'contact-map__marker--augustin',
    theme: saintAugustin.theme,
  },
  {
    ...clairefontaine.location,
    className: 'contact-map__marker--clairefontaine',
    theme: clairefontaine.theme,
    coords: clairefontaine.location.coords,
  },
  {
    ...jeannejugan.location,
    className: 'contact-map__marker--jeanne-jugan',
    coords: jeannejugan.location.coords,
    theme: jeannejugan.theme,
  },
];

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.get('nom'),
          prenom: formData.get('prenom'),
          email: formData.get('email'),
          telephone: formData.get('telephone'),
          message: formData.get('message'),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Impossible d’envoyer votre message pour le moment.');
      }

      form.reset();
      setStatus('success');
      setFeedback('Votre message a bien été envoyé. Nous reviendrons vers vous rapidement.');
    } catch (submissionError) {
      setStatus('error');
      setFeedback(submissionError.message);
    }
  };

  return (
    <section className="contact-content" aria-labelledby="contact-form-title">
      <div className="contact-content__container">
        <div className="contact-content__form-column">
          <div className="contact-content__intro">
            <h2 id="contact-form-title">Échangeons sur vos besoins</h2>
            <p>
              Une question sur nos établissements ou sur les modalités d&apos;admission ? Notre
              équipe vous accompagne et vous oriente vers la solution la plus adaptée.
            </p>
            <p>
              Remplissez ce formulaire : nous reviendrons vers vous dans les meilleurs délais.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="last-name">Nom</label>
                <input id="last-name" name="nom" type="text" autoComplete="family-name" placeholder=" " required />
              </div>
              <div className="contact-form__field">
                <label htmlFor="first-name">Prénom</label>
                <input id="first-name" name="prenom" type="text" autoComplete="given-name" placeholder=" " required />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder=" " required />
            </div>

            <div className="contact-form__field">
              <label htmlFor="phone">Numéro de téléphone</label>
              <input id="phone" name="telephone" type="tel" autoComplete="tel" placeholder=" " />
            </div>

            <div className="contact-form__field contact-form__field--textarea">
              <label htmlFor="message">Votre message</label>
              <textarea id="message" name="message" rows="5" placeholder=" " required />
            </div>

            {feedback ? (
              <p className={`contact-form__feedback contact-form__feedback--${status}`}>
                {feedback}
              </p>
            ) : null}

            <button type="submit" className="contact-form__submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Envoi...' : 'Envoyer'}
            </button>
          </form>
        </div>

        <div className="contact-map" aria-label="Localisation de nos établissements">
          <div className="contact-map__decoration" aria-hidden="true" />
          <div className="contact-map__frame">
            <InteractiveMap locations={locations} />
          </div>
        </div>
      </div>
    </section>
  );
}
