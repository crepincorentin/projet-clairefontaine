'use client';

import { useEffect, useState } from 'react';
import './dashboard.scss';
import './login.scss';

const EMPTY_PRICING_ROW = {
  label: '',
  price: '',
};

function getPricingDraft(establishment) {
  const pricing = establishment?.data?.pricing;
  const autonomyPricing = establishment?.data?.autonomyResidence?.pricing;

  return {
    rows: pricing?.rows?.length ? pricing.rows : [{ ...EMPTY_PRICING_ROW }],
    noteTitle: pricing?.note?.title || '',
    noteDescription: pricing?.note?.description || '',
    autonomyRows: autonomyPricing?.rows?.length ? autonomyPricing.rows : [],
    autonomyNote: autonomyPricing?.note || '',
  };
}

function updatePricingDrafts(items) {
  return items.reduce((drafts, item) => {
    return {
      ...drafts,
      [item.slug]: getPricingDraft(item),
    };
  }, {});
}

function formatMessageDate(value) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [establishmentItems, setEstablishmentItems] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [pricingDrafts, setPricingDrafts] = useState({});

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

  const refreshData = async () => {
    const [establishmentsResponse, contactMessagesResponse] = await Promise.all([
      fetch('/api/admin/establishments'),
      fetch('/api/admin/contact-messages'),
    ]);

    if (!establishmentsResponse.ok || !contactMessagesResponse.ok) {
      throw new Error('establishments');
    }

    const [establishmentsData, contactMessagesData] = await Promise.all([
      establishmentsResponse.json(),
      contactMessagesResponse.json(),
    ]);

    const nextEstablishmentItems = establishmentsData.establishments ?? [];
    const nextContactMessages = contactMessagesData.contactMessages ?? [];

    setEstablishmentItems(nextEstablishmentItems);
    setContactMessages(nextContactMessages);
    setPricingDrafts(updatePricingDrafts(nextEstablishmentItems));

    return nextEstablishmentItems;
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadPricingData = async () => {
      setIsLoadingData(true);

      try {
        await refreshData();
      } catch {
        setNotice('Impossible de charger les tarifs pour le moment.');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadPricingData();
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
    setEstablishmentItems([]);
    setContactMessages([]);
    setPricingDrafts({});
    setNotice('');
  };

  const bootstrapEstablishments = async () => {
    setNotice('');
    setIsSaving(true);

    try {
      const response = await fetch('/api/admin/establishments/bootstrap', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('bootstrap');
      }

      setNotice('Tarifs actuels importés dans l’admin. Vous pouvez maintenant les modifier.');
      await refreshData();
    } catch {
      setNotice('Impossible d’initialiser les tarifs actuels.');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePricingRow = (slug, rowIndex, field, value, group = 'rows') => {
    setPricingDrafts((current) => {
      const draft = current[slug] || getPricingDraft();
      const rows = [...(draft[group] || [])];
      rows[rowIndex] = {
        ...rows[rowIndex],
        [field]: value,
      };

      return {
        ...current,
        [slug]: {
          ...draft,
          [group]: rows,
        },
      };
    });
  };

  const addPricingRow = (slug, group = 'rows') => {
    setPricingDrafts((current) => {
      const draft = current[slug] || getPricingDraft();

      return {
        ...current,
        [slug]: {
          ...draft,
          [group]: [...(draft[group] || []), { ...EMPTY_PRICING_ROW }],
        },
      };
    });
  };

  const removePricingRow = (slug, rowIndex, group = 'rows') => {
    setPricingDrafts((current) => {
      const draft = current[slug] || getPricingDraft();
      const rows = (draft[group] || []).filter((_, index) => index !== rowIndex);

      return {
        ...current,
        [slug]: {
          ...draft,
          [group]: rows.length ? rows : [{ ...EMPTY_PRICING_ROW }],
        },
      };
    });
  };

  const savePricing = async (establishment) => {
    const draft = pricingDrafts[establishment.slug];

    if (!draft) {
      return;
    }

    setNotice('');
    setIsSaving(true);

    const cleanRows = draft.rows.filter((row) => row.label.trim() || row.price.trim());
    const cleanAutonomyRows = draft.autonomyRows.filter(
      (row) => row.label.trim() || row.price.trim(),
    );

    const nextData = {
      ...establishment.data,
      pricing: {
        ...(establishment.data?.pricing || {}),
        rows: cleanRows,
        note: {
          title: draft.noteTitle,
          description: draft.noteDescription,
        },
      },
      ...(establishment.data?.autonomyResidence || cleanAutonomyRows.length
        ? {
            autonomyResidence: {
              ...(establishment.data?.autonomyResidence || {}),
              pricing: {
                ...(establishment.data?.autonomyResidence?.pricing || {}),
                rows: cleanAutonomyRows,
                note: draft.autonomyNote,
              },
            },
          }
        : {}),
    };

    try {
      const response = await fetch(
        `/api/admin/establishments/${encodeURIComponent(establishment.slug)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: nextData,
            published: establishment.published,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('pricing');
      }

      setNotice(`Tarifs de ${establishment.name} enregistrés.`);
      await refreshData();
    } catch {
      setNotice('Impossible d’enregistrer ces tarifs.');
    } finally {
      setIsSaving(false);
    }
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
          <p className="login-card__intro">Connectez-vous pour accéder à l’espace d’administration.</p>

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
          <a href="#pricing" className="admin-sidebar__link admin-sidebar__link--active">
            Tarifs
          </a>
          <a href="#contact-messages" className="admin-sidebar__link">
            Messages
          </a>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-header__eyebrow">Espace sécurisé</span>
            <h1>Administration</h1>
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
              <span>Administration</span>
              <h2>Gérez le contenu des pages des établissements</h2>
            </div>
            <p>
              Modifiez les tarifs des établissements et consultez les demandes envoyées depuis le
              formulaire de contact.
            </p>
          </section>

          {notice && <p className="admin-notice">{notice}</p>}
          {isLoadingData ? <p className="admin-loading-data">Chargement des données...</p> : null}

          <section className="admin-section admin-pricing-section" id="pricing">
            <header className="admin-section__header">
              <div>
                <span>Grilles tarifaires</span>
                <p>
                  Modifiez les libellés, les prix et les notes qui apparaissent dans la section
                  tarifs de chaque établissement.
                </p>
              </div>
              <button
                type="button"
                className="admin-button admin-button--secondary"
                onClick={bootstrapEstablishments}
                disabled={isSaving}
              >
                Importer les tarifs actuels
              </button>
            </header>

            {establishmentItems.length === 0 ? (
              <div className="admin-pricing-empty">
                <h3>Aucun tarif en base pour le moment</h3>
                <p>
                  Cliquez sur “Importer les tarifs actuels” pour récupérer les tarifs déjà
                  affichés sur le site et les rendre modifiables ici.
                </p>
              </div>
            ) : (
              <div className="admin-pricing-list">
                {establishmentItems.map((establishment) => {
                  const draft = pricingDrafts[establishment.slug] || getPricingDraft(establishment);

                  return (
                    <article className="admin-pricing-card" key={establishment.slug}>
                      <header>
                        <div>
                          <span>{establishment.published ? 'Publié' : 'Masqué'}</span>
                          <h3>{establishment.name}</h3>
                        </div>
                        <button
                          type="button"
                          className="admin-button admin-button--primary"
                          onClick={() => savePricing(establishment)}
                          disabled={isSaving}
                        >
                          Enregistrer les tarifs
                        </button>
                      </header>

                      <div className="admin-pricing-table">
                        <div className="admin-pricing-table__head">
                          <span>Libellé</span>
                          <span>Prix</span>
                          <span />
                        </div>

                        {draft.rows.map((row, index) => (
                          <div className="admin-pricing-row" key={`${establishment.slug}-${index}`}>
                            <input
                              aria-label="Libellé du tarif"
                              value={row.label}
                              onChange={(event) =>
                                updatePricingRow(
                                  establishment.slug,
                                  index,
                                  'label',
                                  event.target.value,
                                )
                              }
                            />
                            <input
                              aria-label="Prix du tarif"
                              value={row.price}
                              onChange={(event) =>
                                updatePricingRow(
                                  establishment.slug,
                                  index,
                                  'price',
                                  event.target.value,
                                )
                              }
                            />
                            <button
                              type="button"
                              className="admin-button admin-button--danger"
                              onClick={() => removePricingRow(establishment.slug, index)}
                            >
                              Retirer
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="admin-button admin-button--ghost"
                        onClick={() => addPricingRow(establishment.slug)}
                      >
                        Ajouter une ligne
                      </button>

                      <div className="admin-form admin-pricing-note">
                        <label>
                          Titre de la note
                          <input
                            value={draft.noteTitle}
                            onChange={(event) =>
                              setPricingDrafts((current) => ({
                                ...current,
                                [establishment.slug]: {
                                  ...draft,
                                  noteTitle: event.target.value,
                                },
                              }))
                            }
                          />
                        </label>
                        <label>
                          Texte de la note
                          <textarea
                            rows="3"
                            value={draft.noteDescription}
                            onChange={(event) =>
                              setPricingDrafts((current) => ({
                                ...current,
                                [establishment.slug]: {
                                  ...draft,
                                  noteDescription: event.target.value,
                                },
                              }))
                            }
                          />
                        </label>
                      </div>

                      {establishment.data?.autonomyResidence?.pricing ? (
                        <div className="admin-autonomy-pricing">
                          <h4>Résidence autonomie Montjoie</h4>
                          <div className="admin-pricing-table">
                            <div className="admin-pricing-table__head">
                              <span>Logement</span>
                              <span>Tarif</span>
                              <span />
                            </div>
                            {draft.autonomyRows.map((row, index) => (
                              <div
                                className="admin-pricing-row"
                                key={`${establishment.slug}-autonomy-${index}`}
                              >
                                <input
                                  aria-label="Libellé du tarif Montjoie"
                                  value={row.label}
                                  onChange={(event) =>
                                    updatePricingRow(
                                      establishment.slug,
                                      index,
                                      'label',
                                      event.target.value,
                                      'autonomyRows',
                                    )
                                  }
                                />
                                <input
                                  aria-label="Prix du tarif Montjoie"
                                  value={row.price}
                                  onChange={(event) =>
                                    updatePricingRow(
                                      establishment.slug,
                                      index,
                                      'price',
                                      event.target.value,
                                      'autonomyRows',
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="admin-button admin-button--danger"
                                  onClick={() =>
                                    removePricingRow(establishment.slug, index, 'autonomyRows')
                                  }
                                >
                                  Retirer
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="admin-button admin-button--ghost"
                            onClick={() => addPricingRow(establishment.slug, 'autonomyRows')}
                          >
                            Ajouter une ligne Montjoie
                          </button>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            )}
          </section>

          <section className="admin-section admin-contact-section" id="contact-messages">
            <header className="admin-section__header">
              <div>
                <span>Messages du formulaire de contact</span>
                <p>
                  Retrouvez ici les dernières demandes envoyées depuis la page contact.
                </p>
              </div>
            </header>

            {contactMessages.length === 0 ? (
              <p className="admin-empty">Aucun message reçu pour le moment.</p>
            ) : (
              <div className="admin-contact-list">
                {contactMessages.map((message) => (
                  <article className="admin-contact-card" key={message.id}>
                    <header>
                      <div>
                        <h3>
                          {message.firstName} {message.lastName}
                        </h3>
                        <span>{formatMessageDate(message.createdAt)}</span>
                      </div>
                      <div className="admin-contact-card__links">
                        <a href={`mailto:${message.email}`}>{message.email}</a>
                        {message.phone ? <a href={`tel:${message.phone}`}>{message.phone}</a> : null}
                      </div>
                    </header>
                    <p>{message.message}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
