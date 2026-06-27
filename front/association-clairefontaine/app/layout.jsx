// src/app/layout.jsx
import SiteChrome from './components/SiteChrome';
import "./globals.scss"; // Ton SASS global

export const metadata = {
  title: "Association Clairefontaine",
  description: "Maisons de famille pour personnes âgées dépendantes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
