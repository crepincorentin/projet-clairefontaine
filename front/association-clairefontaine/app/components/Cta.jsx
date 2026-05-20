import Link from 'next/link';
import Image from 'next/image';

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="cta-section__content">
        <h2>Vous souhaitez plus d'informations ?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Augue non malesuada placerat faucibus nam purus sem. Urna pulvinar porttitor dignissim congue pellentesque ac hac.
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
