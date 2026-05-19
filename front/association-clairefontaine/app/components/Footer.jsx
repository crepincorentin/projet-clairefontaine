// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#224435', color: '#e2e8f0', padding: '2rem', marginTop: 'auto', textAlign: 'center' }}>
      <p>© {new Date().getFullYear()} Association Clairefontaine - Accompagnement et Grand Âge.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#a0aec0' }}>
        Établissements Privés à But Non Lucratif.
      </p>
    </footer>
  );
}