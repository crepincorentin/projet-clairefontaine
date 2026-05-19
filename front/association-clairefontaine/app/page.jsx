// src/app/page.jsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Bienvenue sur le portail de l'Association Clairefontaine</h1>
      <p>Découvrez nos solutions d'accueil pour les personnes âgées.</p>
      
      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link href="/association" style={{ color: '#2D5A47', fontWeight: 'bold' }}>
          Notre Association
        </Link>
        <Link href="/etablissements/saint-augustin" style={{ color: '#02506D' }}>
          Maison Saint-Augustin (Bergues)
        </Link>
        <Link href="/etablissements/clairefontaine" style={{ color: '#CB6A2D' }}>
          Maison Clairefontaine (Hazebrouck)
        </Link>
      </nav>
    </main>
  );
}