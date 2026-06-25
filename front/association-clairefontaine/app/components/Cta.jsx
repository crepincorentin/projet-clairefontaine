import Link from 'next/link';
import Image from 'next/image';

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="cta-section__content">
        <h2>Vous souhaitez plus d&apos;informations ?</h2>
        <p>
          Nous sommes à votre écoute pour répondre à vos questions et vous accompagner dans vos démarches.
        </p>
        <Link href="/contact" className="cta-section__button">
          Nous contacter
        </Link>
      </div>
      <Image
        src="/arrow.png"
        alt=""
        width={150}
        height={150}
        className="cta-section__icon"
        aria-hidden="true"
      />
    </section>
  );
}
