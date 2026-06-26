'use client';

import { useEffect, useState } from 'react';
import './dashboard.scss';
import './login.scss';

const dashboardCards = [
  {
    title: 'Pages',
    description: 'Prépare la gestion des contenus de la page d’accueil et de la page qui sommes-nous.',
    endpoint: '/api/admin/content',
  },
  {
    title: 'Établissements',
    description: 'Modifie les textes, prestations, tarifs et informations de contact des établissements.',
    endpoint: '/api/admin/establishments',
  },
  {
    title: 'FAQ',
    description: 'Ajoute, réordonne ou masque les questions fréquentes du site.',
    endpoint: '/api/admin/faq',
  },
];

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dashboardStats, setDashboardStats] = useState({
    content: null,
    establishments: null,
    faq: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/admin/auth/me');

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadDashboardStats = async () => {
      const [contentResponse, establishmentsResponse, faqResponse] = await Promise.all([
        fetch('/api/admin/content'),
        fetch('/api/admin/establishments'),
        fetch('/api/admin/faq'),
      ]);

      const [contentData, establishmentsData, faqData] = await Promise.all([
        contentResponse.ok ? contentResponse.json() : Promise.resolve({ contents: [] }),
        establishmentsResponse.ok
          ? establishmentsResponse.json()
          : Promise.resolve({ establishments: [] }),
        faqResponse.ok ? faqResponse.json() : Promise.resolve({ faqItems: [] }),
      ]);

      setDashboardStats({
        content: contentData.contents.length,
        establishments: establishmentsData.establishments.length,
        faq: faqData.faqItems.length,
      });
    };

    loadDashboardStats();
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError('Identifiants incorrects.');
        return;
      }

      setUser(data.user);
    } catch {
      setError('Impossible de se connecter pour le moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setUser(null);
    setDashboardStats({
      content: null,
      establishments: null,
      faq: null,
    });
  };

  if (isCheckingSession) {
    return (
      <div className="admin-page-loading">
        <div className="admin-page-loading__card">
          <span />
          <p>Vérification de la session administrateur...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="login-page">
        <section className="login-card" aria-labelledby="admin-login-title">
          <div className="login-card__brand">
            <span>Association Clairefontaine</span>
            <strong>Administration</strong>
          </div>

          <h1 id="admin-login-title">Connexion admin</h1>
          <p className="login-card__intro">
            Connectez-vous pour gérer les contenus du site.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="login-form__field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-form__field">
              <label htmlFor="admin-password">Mot de passe</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {error && <p className="login-form__error">{error}</p>}

            <button className="login-form__submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <span>Association</span>
          <strong>Clairefontaine</strong>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Navigation administration">
          <a href="/admin" className="admin-sidebar__link admin-sidebar__link--active">
            Tableau de bord
          </a>
          <a href="#content" className="admin-sidebar__link">
            Contenus
          </a>
          <a href="#establishments" className="admin-sidebar__link">
            Établissements
          </a>
          <a href="#faq" className="admin-sidebar__link">
            FAQ
          </a>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-header__eyebrow">Espace sécurisé</span>
            <h1>Tableau de bord</h1>
          </div>

          <div className="admin-header__user">
            <span>{user.email}</span>
            <button type="button" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </header>

        <main className="admin-dashboard">
          <section className="admin-welcome">
            <div>
              <span>CMS Clairefontaine</span>
              <h2>Gérez les contenus du site depuis un seul espace.</h2>
            </div>
            <p>
              Le backend est prêt. Les prochains écrans pourront utiliser les routes API déjà
              disponibles pour modifier les pages, les établissements et la FAQ.
            </p>
          </section>

          <section className="admin-card-grid" aria-label="Modules de gestion">
            {dashboardCards.map((card) => {
              const statKey =
                card.endpoint === '/api/admin/content'
                  ? 'content'
                  : card.endpoint === '/api/admin/establishments'
                    ? 'establishments'
                    : 'faq';

              return (
                <article className="admin-card" id={statKey} key={card.title}>
                  <div>
                    <span>{dashboardStats[statKey] ?? '-'}</span>
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.description}</p>
                  <code>{card.endpoint}</code>
                </article>
              );
            })}
          </section>

          <section className="admin-next-steps">
            <h2>Prochaines étapes</h2>
            <ul>
              <li>Créer un formulaire pour éditer les contenus de page.</li>
              <li>Importer les données actuelles du site dans la base.</li>
              <li>Brancher le front public sur les contenus publiés.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
}
