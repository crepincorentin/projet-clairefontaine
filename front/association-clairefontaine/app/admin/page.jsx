'use client';

import { useEffect, useRef, useState } from 'react';
import './dashboard.scss';
import './login.scss';

const dashboardCards = [
  {
    title: 'Pages',
    description:
      'Prépare la gestion des contenus de la page d’accueil et de la page qui sommes-nous.',
    endpoint: '/api/admin/content',
  },
  {
    title: 'Établissements',
    description:
      'Modifie les textes, prestations, tarifs et informations de contact des établissements.',
    endpoint: '/api/admin/establishments',
  },
  {
    title: 'FAQ',
    description: 'Ajoute, réordonne ou masque les questions fréquentes du site.',
    endpoint: '/api/admin/faq',
  },
];

const EMPTY_CONTENT = {
  key: '',
  title: '',
  published: true,
  dataText: '{\n  \n}',
};

const EMPTY_ESTABLISHMENT = {
  slug: '',
  name: '',
  published: true,
  dataText: '{\n  \n}',
};

const EMPTY_FAQ = {
  question: '',
  answer: '',
  position: 0,
  published: true,
};

const EMPTY_PRICING_ROW = {
  label: '',
  price: '',
};

const CONTENT_TEMPLATES = {
  home: {
    hero: {
      title: 'Prendre soin de chacun, chaque jour',
      description:
        'Un acteur à but non lucratif engagé pour le bien-être de vos proches à travers nos établissements médico-sociaux.',
      buttonLabel: 'En savoir plus',
      buttonHref: '/qui-sommes-nous',
    },
    cta: {
      title: 'Vous souhaitez plus d’informations ?',
      description:
        'Notre équipe est à votre écoute pour répondre à vos questions et vous accompagner dans vos démarches.',
      buttonLabel: 'Nous contacter',
      buttonHref: '/contact',
    },
  },
  about: {
    intro: {
      title: 'Bienvenue à l’Association Clairefontaine',
      lead:
        'Depuis plus de 800 ans, une même vocation nous anime : prendre soin des personnes les plus fragiles avec respect, bienveillance et humanité.',
      mission:
        'Prendre soin, accompagner, respecter : telle est notre mission depuis plus de huit siècles.',
    },
    directorWord: {
      title: 'Le mot de la Directrice',
      paragraphs: [
        'À l’Association Clairefontaine, nous mettons toute notre expérience et notre engagement au service des personnes âgées que nous accompagnons.',
      ],
    },
  },
};

const ESTABLISHMENT_TEMPLATE = {
  hero: {
    title: ['EHPAD Maison de', 'Famille ...'],
    location: 'Ville',
  },
  about: {
    title: 'Titre de présentation',
    description: 'Court texte de présentation de l’établissement.',
  },
  services: [],
  pricing: {
    rows: [{ label: 'Tarif hébergement', price: 'Nous consulter' }],
  },
};

function stringifyJson(value) {
  if (value === null || value === undefined) {
    return '{\n  \n}';
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return '{\n  \n}';
  }
}

function parseJson(text) {
  const trimmed = text.trim();

  if (!trimmed) {
    return {};
  }

  return JSON.parse(trimmed);
}

function toLabel(item, fallback) {
  return item?.title || item?.name || item?.question || fallback;
}

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

function AdminSection({
  id,
  title,
  description,
  items,
  selectedId,
  createLabel,
  onCreate,
  onSelect,
  onDelete,
  onTogglePublished,
  renderSummary,
  children,
}) {
  return (
    <section className="admin-section" id={id}>
      <header className="admin-section__header">
        <div>
          <span>{title}</span>
          <p>{description}</p>
        </div>
        <button type="button" className="admin-button admin-button--secondary" onClick={onCreate}>
          {createLabel}
        </button>
      </header>

      <div className="admin-section__grid">
        <div className="admin-section__list">
          {items.length === 0 ? (
            <p className="admin-empty">Aucun élément pour le moment.</p>
          ) : (
            items.map((item) => {
              const itemId = item.id || item.key || item.slug;
              const isSelected = itemId === selectedId;

              return (
                <article
                  className={`admin-entry${isSelected ? ' admin-entry--selected' : ''}`}
                  key={itemId}
                >
                  <button
                    type="button"
                    className="admin-entry__select"
                    onClick={() => onSelect(item)}
                  >
                    <strong>{toLabel(item, itemId)}</strong>
                    {renderSummary(item)}
                  </button>
                  <div className="admin-entry__actions">
                    <button
                      type="button"
                      className="admin-button admin-button--ghost"
                      onClick={() => onTogglePublished(item)}
                    >
                      {item.published ? 'Masquer' : 'Publier'}
                    </button>
                    <button
                      type="button"
                      className="admin-button admin-button--danger"
                      onClick={() => onDelete(item)}
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="admin-section__editor">{children}</div>
      </div>
    </section>
  );
}

function EditorHelp({ type, onApplyTemplate }) {
  return (
    <div className="admin-editor-help">
      <div>
        <strong>Données structurées</strong>
        <p>
          Cette zone contient les champs avancés du site. Modifiez uniquement les textes entre
          guillemets et gardez les accolades, virgules et crochets.
        </p>
      </div>
      <button type="button" className="admin-button admin-button--ghost" onClick={onApplyTemplate}>
        Utiliser un modèle {type}
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dashboardStats, setDashboardStats] = useState({
    content: null,
    establishments: null,
    faq: null,
  });
  const [contentItems, setContentItems] = useState([]);
  const [establishmentItems, setEstablishmentItems] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [pricingDrafts, setPricingDrafts] = useState({});
  const [selectedContentKey, setSelectedContentKey] = useState('');
  const [selectedEstablishmentSlug, setSelectedEstablishmentSlug] = useState('');
  const [selectedFaqId, setSelectedFaqId] = useState('');
  const selectedContentKeyRef = useRef('');
  const selectedEstablishmentSlugRef = useRef('');
  const selectedFaqIdRef = useRef('');
  const [contentDraft, setContentDraft] = useState(EMPTY_CONTENT);
  const [establishmentDraft, setEstablishmentDraft] = useState(EMPTY_ESTABLISHMENT);
  const [faqDraft, setFaqDraft] = useState(EMPTY_FAQ);

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
    const [contentResponse, establishmentsResponse, faqResponse] = await Promise.all([
      fetch('/api/admin/content'),
      fetch('/api/admin/establishments'),
      fetch('/api/admin/faq'),
    ]);

    const [contentData, establishmentsData, faqData] = await Promise.all([
      contentResponse.ok ? contentResponse.json() : Promise.resolve({ contents: [] }),
      establishmentsResponse.ok ? establishmentsResponse.json() : Promise.resolve({ establishments: [] }),
      faqResponse.ok ? faqResponse.json() : Promise.resolve({ faqItems: [] }),
    ]);

    const nextContentItems = contentData.contents ?? [];
    const nextEstablishmentItems = establishmentsData.establishments ?? [];
    const nextFaqItems = faqData.faqItems ?? [];

    setContentItems(nextContentItems);
    setEstablishmentItems(nextEstablishmentItems);
    setFaqItems(nextFaqItems);
    setPricingDrafts(updatePricingDrafts(nextEstablishmentItems));
    setDashboardStats({
      content: nextContentItems.length,
      establishments: nextEstablishmentItems.length,
      faq: nextFaqItems.length,
    });

    const currentContent =
      nextContentItems.find((item) => item.key === selectedContentKeyRef.current) ||
      nextContentItems[0];
    const currentEstablishment =
      nextEstablishmentItems.find((item) => item.slug === selectedEstablishmentSlugRef.current) ||
      nextEstablishmentItems[0];
    const currentFaq =
      nextFaqItems.find((item) => item.id === selectedFaqIdRef.current) || nextFaqItems[0];

    if (currentContent) {
      setSelectedContentKey(currentContent.key);
      selectedContentKeyRef.current = currentContent.key;
      setContentDraft({
        key: currentContent.key,
        title: currentContent.title,
        published: currentContent.published,
        dataText: stringifyJson(currentContent.data),
      });
    }

    if (currentEstablishment) {
      setSelectedEstablishmentSlug(currentEstablishment.slug);
      selectedEstablishmentSlugRef.current = currentEstablishment.slug;
      setEstablishmentDraft({
        slug: currentEstablishment.slug,
        name: currentEstablishment.name,
        published: currentEstablishment.published,
        dataText: stringifyJson(currentEstablishment.data),
      });
    }

    if (currentFaq) {
      setSelectedFaqId(currentFaq.id);
      selectedFaqIdRef.current = currentFaq.id;
      setFaqDraft({
        question: currentFaq.question,
        answer: currentFaq.answer,
        position: currentFaq.position,
        published: currentFaq.published,
      });
    }

    return {
      contentItems: nextContentItems,
      establishmentItems: nextEstablishmentItems,
      faqItems: nextFaqItems,
    };
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadDashboardData = async () => {
      setIsLoadingData(true);

      try {
        await refreshData();
      } catch {
        setNotice('Impossible de charger les données administrateur pour le moment.');
      } finally {
        setIsLoadingData(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const selectContent = (item) => {
    setSelectedContentKey(item.key);
    selectedContentKeyRef.current = item.key;
    setContentDraft({
      key: item.key,
      title: item.title,
      published: item.published,
      dataText: stringifyJson(item.data),
    });
  };

  const selectEstablishment = (item) => {
    setSelectedEstablishmentSlug(item.slug);
    selectedEstablishmentSlugRef.current = item.slug;
    setEstablishmentDraft({
      slug: item.slug,
      name: item.name,
      published: item.published,
      dataText: stringifyJson(item.data),
    });
  };

  const selectFaq = (item) => {
    setSelectedFaqId(item.id);
    selectedFaqIdRef.current = item.id;
    setFaqDraft({
      question: item.question,
      answer: item.answer,
      position: item.position,
      published: item.published,
    });
  };

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
    setContentItems([]);
    setEstablishmentItems([]);
    setFaqItems([]);
    setPricingDrafts({});
    setSelectedContentKey('');
    setSelectedEstablishmentSlug('');
    setSelectedFaqId('');
    selectedContentKeyRef.current = '';
    selectedEstablishmentSlugRef.current = '';
    selectedFaqIdRef.current = '';
    setContentDraft(EMPTY_CONTENT);
    setEstablishmentDraft(EMPTY_ESTABLISHMENT);
    setFaqDraft(EMPTY_FAQ);
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

  const startNewContent = () => {
    setSelectedContentKey('');
    selectedContentKeyRef.current = '';
    setContentDraft(EMPTY_CONTENT);
    setNotice('Création d’un nouveau contenu.');
  };

  const startNewEstablishment = () => {
    setSelectedEstablishmentSlug('');
    selectedEstablishmentSlugRef.current = '';
    setEstablishmentDraft(EMPTY_ESTABLISHMENT);
    setNotice('Création d’un nouvel établissement.');
  };

  const startNewFaq = () => {
    setSelectedFaqId('');
    selectedFaqIdRef.current = '';
    setFaqDraft(EMPTY_FAQ);
    setNotice('Création d’une nouvelle question.');
  };

  const saveContent = async (event) => {
    event.preventDefault();
    setNotice('');
    setIsSaving(true);

    try {
      const parsedData = parseJson(contentDraft.dataText);
      const payload = {
        key: contentDraft.key.trim(),
        title: contentDraft.title.trim(),
        data: parsedData,
        published: contentDraft.published,
      };

      const editingKey = selectedContentKey;
      const response = await fetch(
        editingKey ? `/api/admin/content/${encodeURIComponent(editingKey)}` : '/api/admin/content',
        {
          method: editingKey ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('content');
      }

      const data = await response.json();
      setSelectedContentKey(data.content?.key || payload.key);
      setNotice('Contenu enregistré.');
      await refreshData();
    } catch {
      setNotice('Impossible d’enregistrer ce contenu. Vérifiez le JSON.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteContent = async (item) => {
    if (!window.confirm(`Supprimer le contenu ${item.key} ?`)) {
      return;
    }

    setNotice('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/content/${encodeURIComponent(item.key)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('content-delete');
      }

      setNotice('Contenu supprimé.');
      setSelectedContentKey('');
      setContentDraft(EMPTY_CONTENT);
      await refreshData();
    } catch {
      setNotice('Impossible de supprimer ce contenu.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleContentPublished = async (item) => {
    setIsSaving(true);
    setNotice('');

    try {
      const response = await fetch(`/api/admin/content/${encodeURIComponent(item.key)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !item.published }),
      });

      if (!response.ok) {
        throw new Error('content-toggle');
      }

      setNotice('Statut de publication mis à jour.');
      await refreshData();
    } catch {
      setNotice('Impossible de mettre à jour le statut de publication.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveEstablishment = async (event) => {
    event.preventDefault();
    setNotice('');
    setIsSaving(true);

    try {
      const parsedData = parseJson(establishmentDraft.dataText);
      const payload = {
        slug: establishmentDraft.slug.trim(),
        name: establishmentDraft.name.trim(),
        data: parsedData,
        published: establishmentDraft.published,
      };

      const editingSlug = selectedEstablishmentSlug;
      const response = await fetch(
        editingSlug
          ? `/api/admin/establishments/${encodeURIComponent(editingSlug)}`
          : '/api/admin/establishments',
        {
          method: editingSlug ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('establishment');
      }

      const data = await response.json();
      setSelectedEstablishmentSlug(data.establishment?.slug || payload.slug);
      setNotice('Établissement enregistré.');
      await refreshData();
    } catch {
      setNotice('Impossible d’enregistrer cet établissement. Vérifiez le JSON.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEstablishment = async (item) => {
    if (!window.confirm(`Supprimer l’établissement ${item.slug} ?`)) {
      return;
    }

    setNotice('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/establishments/${encodeURIComponent(item.slug)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('establishment-delete');
      }

      setNotice('Établissement supprimé.');
      setSelectedEstablishmentSlug('');
      setEstablishmentDraft(EMPTY_ESTABLISHMENT);
      await refreshData();
    } catch {
      setNotice('Impossible de supprimer cet établissement.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleEstablishmentPublished = async (item) => {
    setIsSaving(true);
    setNotice('');

    try {
      const response = await fetch(`/api/admin/establishments/${encodeURIComponent(item.slug)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !item.published }),
      });

      if (!response.ok) {
        throw new Error('establishment-toggle');
      }

      setNotice('Statut de publication mis à jour.');
      await refreshData();
    } catch {
      setNotice('Impossible de mettre à jour le statut de publication.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveFaq = async (event) => {
    event.preventDefault();
    setNotice('');
    setIsSaving(true);

    try {
      const payload = {
        question: faqDraft.question.trim(),
        answer: faqDraft.answer.trim(),
        position: Number(faqDraft.position) || 0,
        published: faqDraft.published,
      };

      const editingFaqId = selectedFaqId;
      const response = await fetch(
        editingFaqId ? `/api/admin/faq/${encodeURIComponent(editingFaqId)}` : '/api/admin/faq',
        {
          method: editingFaqId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('faq');
      }

      const data = await response.json();
      setSelectedFaqId(data.faqItem?.id || editingFaqId);
      setNotice('FAQ enregistrée.');
      await refreshData();
    } catch {
      setNotice('Impossible d’enregistrer cette question.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteFaq = async (item) => {
    if (!window.confirm(`Supprimer la question « ${item.question} » ?`)) {
      return;
    }

    setNotice('');
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/faq/${encodeURIComponent(item.id)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('faq-delete');
      }

      setNotice('Question supprimée.');
      setSelectedFaqId('');
      setFaqDraft(EMPTY_FAQ);
      await refreshData();
    } catch {
      setNotice('Impossible de supprimer cette question.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFaqPublished = async (item) => {
    setIsSaving(true);
    setNotice('');

    try {
      const response = await fetch(`/api/admin/faq/${encodeURIComponent(item.id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ published: !item.published }),
      });

      if (!response.ok) {
        throw new Error('faq-toggle');
      }

      setNotice('Statut de publication mis à jour.');
      await refreshData();
    } catch {
      setNotice('Impossible de mettre à jour le statut de publication.');
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
          <p className="login-card__intro">Connectez-vous pour gérer les contenus du site.</p>

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
          <a href="#pricing" className="admin-sidebar__link">
            Tarifs
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
              Le backend est prêt. Vous pouvez maintenant éditer les pages, les établissements et
              la FAQ depuis l’interface admin.
            </p>
          </section>

          {notice && <p className="admin-notice">{notice}</p>}

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

          {isLoadingData ? <p className="admin-loading-data">Chargement des contenus...</p> : null}

          <section className="admin-section admin-pricing-section" id="pricing">
            <header className="admin-section__header">
              <div>
                <span>Tarifs des établissements</span>
                <p>
                  Modifiez ici les tarifs affichés sur les pages Saint-Augustin, Clairefontaine
                  et Jeanne Jugan. Les changements sont visibles sur le site après sauvegarde.
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

          <AdminSection
            id="content"
            title="Pages"
            description="Modifiez les contenus structurés qui alimentent le site."
            items={contentItems}
            selectedId={selectedContentKey}
            createLabel="Nouveau contenu"
            onCreate={startNewContent}
            onSelect={selectContent}
            onDelete={deleteContent}
            onTogglePublished={toggleContentPublished}
            renderSummary={(item) => (
              <span>
                {item.key} · {item.published ? 'Publié' : 'Masqué'}
              </span>
            )}
          >
            <form className="admin-form" onSubmit={saveContent}>
              <div className="admin-form__row">
                <label>
                  Clé
                  <input
                    value={contentDraft.key}
                    onChange={(event) =>
                      setContentDraft({ ...contentDraft, key: event.target.value })
                    }
                    required
                    disabled={Boolean(selectedContentKey)}
                  />
                </label>

                <label>
                  Titre
                  <input
                    value={contentDraft.title}
                    onChange={(event) =>
                      setContentDraft({ ...contentDraft, title: event.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <label className="admin-form__check">
                <input
                  type="checkbox"
                  checked={contentDraft.published}
                  onChange={(event) =>
                    setContentDraft({ ...contentDraft, published: event.target.checked })
                  }
                />
                Publié
              </label>

              <EditorHelp
                type="page"
                onApplyTemplate={() => {
                  const template =
                    contentDraft.key === 'qui-sommes-nous'
                      ? CONTENT_TEMPLATES.about
                      : CONTENT_TEMPLATES.home;

                  setContentDraft({
                    ...contentDraft,
                    key: contentDraft.key || 'accueil',
                    title: contentDraft.title || 'Page d’accueil',
                    dataText: stringifyJson(template),
                  });
                }}
              />

              <label>
                Données JSON
                <textarea
                  rows="12"
                  value={contentDraft.dataText}
                  onChange={(event) =>
                    setContentDraft({ ...contentDraft, dataText: event.target.value })
                  }
                  spellCheck="false"
                  required
                />
              </label>

              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary" disabled={isSaving}>
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </AdminSection>

          <AdminSection
            id="establishments"
            title="Établissements"
            description="Ajoutez, mettez à jour ou masquez les fiches établissement."
            items={establishmentItems}
            selectedId={selectedEstablishmentSlug}
            createLabel="Nouvel établissement"
            onCreate={startNewEstablishment}
            onSelect={selectEstablishment}
            onDelete={deleteEstablishment}
            onTogglePublished={toggleEstablishmentPublished}
            renderSummary={(item) => (
              <span>
                {item.slug} · {item.published ? 'Publié' : 'Masqué'}
              </span>
            )}
          >
            <form className="admin-form" onSubmit={saveEstablishment}>
              <div className="admin-form__row">
                <label>
                  Slug
                  <input
                    value={establishmentDraft.slug}
                    onChange={(event) =>
                      setEstablishmentDraft({ ...establishmentDraft, slug: event.target.value })
                    }
                    required
                    disabled={Boolean(selectedEstablishmentSlug)}
                  />
                </label>

                <label>
                  Nom
                  <input
                    value={establishmentDraft.name}
                    onChange={(event) =>
                      setEstablishmentDraft({ ...establishmentDraft, name: event.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <label className="admin-form__check">
                <input
                  type="checkbox"
                  checked={establishmentDraft.published}
                  onChange={(event) =>
                    setEstablishmentDraft({ ...establishmentDraft, published: event.target.checked })
                  }
                />
                Publié
              </label>

              <EditorHelp
                type="établissement"
                onApplyTemplate={() =>
                  setEstablishmentDraft({
                    ...establishmentDraft,
                    slug: establishmentDraft.slug || 'nouvel-etablissement',
                    name: establishmentDraft.name || 'Nouvel établissement',
                    dataText: stringifyJson(ESTABLISHMENT_TEMPLATE),
                  })
                }
              />

              <label>
                Données JSON
                <textarea
                  rows="12"
                  value={establishmentDraft.dataText}
                  onChange={(event) =>
                    setEstablishmentDraft({ ...establishmentDraft, dataText: event.target.value })
                  }
                  spellCheck="false"
                  required
                />
              </label>

              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary" disabled={isSaving}>
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </AdminSection>

          <AdminSection
            id="faq"
            title="FAQ"
            description="Gérez les questions affichées sur le site public."
            items={faqItems}
            selectedId={selectedFaqId}
            createLabel="Nouvelle question"
            onCreate={startNewFaq}
            onSelect={selectFaq}
            onDelete={deleteFaq}
            onTogglePublished={toggleFaqPublished}
            renderSummary={(item) => (
              <span>
                Position {item.position} · {item.published ? 'Publié' : 'Masqué'}
              </span>
            )}
          >
            <form className="admin-form" onSubmit={saveFaq}>
              <label>
                Question
                <input
                  value={faqDraft.question}
                  onChange={(event) => setFaqDraft({ ...faqDraft, question: event.target.value })}
                  required
                />
              </label>

              <label>
                Réponse
                <textarea
                  rows="10"
                  value={faqDraft.answer}
                  onChange={(event) => setFaqDraft({ ...faqDraft, answer: event.target.value })}
                  required
                />
              </label>

              <div className="admin-form__row">
                <label>
                  Position
                  <input
                    type="number"
                    value={faqDraft.position}
                    onChange={(event) =>
                      setFaqDraft({ ...faqDraft, position: event.target.value })
                    }
                    min="0"
                  />
                </label>

                <label className="admin-form__check">
                  <input
                    type="checkbox"
                    checked={faqDraft.published}
                    onChange={(event) =>
                      setFaqDraft({ ...faqDraft, published: event.target.checked })
                    }
                  />
                  Publié
                </label>
              </div>

              <div className="admin-form__actions">
                <button type="submit" className="admin-button admin-button--primary" disabled={isSaving}>
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </AdminSection>
        </main>
      </div>
    </div>
  );
}
