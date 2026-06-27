'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';
import Navbar from './Navbar';

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
}
