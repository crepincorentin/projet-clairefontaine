import Image from 'next/image';
import '../styles/components/contact/contact-page.scss';
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Nous contacter | Association Clairefontaine',
  description:
    "Contactez l'Association Clairefontaine et retrouvez ses établissements à Bergues, Hazebrouck et Dunkerque.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <Image
          src="/clairefontaine_exterieur.jpeg"
          alt="Une résidente accompagnée par une proche"
          fill
          priority
          sizes="100vw"
          className="contact-hero__image"
        />
        <div className="contact-hero__overlay" aria-hidden="true" />
        <div className="contact-hero__container">
          <h1 id="contact-title">Nous contacter</h1>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
