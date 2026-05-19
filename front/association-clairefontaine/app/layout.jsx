// src/app/layout.jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.scss"; // Ton SASS global

export const metadata = {
  title: "Association Clairefontaine",
  description: "Maisons de famille pour personnes âgées dépendantes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        <div style={{ flex: 1 }}>
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}