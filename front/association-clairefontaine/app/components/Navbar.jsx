// src/components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{ color: 'white', padding: '1rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <strong style={{ fontSize: '1.2rem' }}>
          <Link href="/">Association Clairefontaine</Link>
        </strong>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/association">L'Association</Link>
          <Link href="/etablissements/saint-augustin">Bergues</Link>
          <Link href="/etablissements/clairefontaine">Hazebrouck</Link>
          <Link href="/etablissements/jeanne-jugan">Dunkerque</Link>
        </nav>
      </div>
    </header>
  );
}