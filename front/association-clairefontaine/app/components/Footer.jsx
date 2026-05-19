// src/components/Footer.jsx
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../styles/components/footer.scss';

export default function Footer() {
  const establishments = [
    { name: 'EHPAD Maison de Famille Saint-Augustin', address: '27 Rue de la Gare, 59380 Bergues', phone: '03 28 68 60 76' },
    { name: 'EHPAD Maison de Famille Jeanne Jugan', address: '192 Rue Jeanne Jugan, 59240 Dunkerque', phone: '03 28 69 10 80' },
    { name: 'Maison d\'Aloïs', address: '27 Rue de la Gare, 59380 Bergues', phone: '03 28 68 60 76' },
    { name: 'EHPAD Maison de Famille Clairefontaine', address: '48 Avenue Maréchal de Lattre de Tassigny, 59190 Hazebrouck', phone: '03 28 41 67 07' },
    { name: 'Résidence autonomie Montjoie', address: '192 Rue Jeanne Jugan, 59240 Dunkerque', phone: '03 28 69 10 80' },
  ];

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__establishments">
          {establishments.map((estab, index) => (
            <div key={index} className="footer__establishment">
              <h3>{estab.name}</h3>
              <p>{estab.address}</p>
              <p>
                <FontAwesomeIcon icon={faPhone} className="footer__icon-phone" />
                {estab.phone}
              </p>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <div className="footer__logo">
            <Image src="/logo.png" alt="Clairefontaine Logo" width={150} height={50} />
          </div>
          <div className="footer__copyright">
            © {new Date().getFullYear()} • All Rights Reserved
          </div>
          <div className="footer__socials">
            <Link href="#"><FontAwesomeIcon icon={faFacebookF} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faTwitter} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link href="#"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}