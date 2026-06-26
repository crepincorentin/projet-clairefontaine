# Socle CMS

Ce projet utilise le backend intégré de Next.js avec Prisma.

## Installation locale

1. Copier les variables d'environnement :

```bash
cp .env.example .env
```

2. Renseigner `DATABASE_URL`, `ADMIN_SESSION_SECRET`, `ADMIN_EMAIL` et `ADMIN_PASSWORD`.

3. Créer les tables et générer Prisma Client :

```bash
npm run prisma:migrate
```

4. Créer le premier administrateur :

```bash
npm run db:seed
```

## Endpoints admin

Toutes les routes ci-dessous nécessitent une session admin, sauf le login.

- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`
- `GET /api/admin/content`
- `POST /api/admin/content`
- `GET /api/admin/content/:key`
- `PUT /api/admin/content/:key`
- `DELETE /api/admin/content/:key`
- `GET /api/admin/establishments`
- `POST /api/admin/establishments`
- `GET /api/admin/establishments/:slug`
- `PUT /api/admin/establishments/:slug`
- `DELETE /api/admin/establishments/:slug`
- `GET /api/admin/faq`
- `POST /api/admin/faq`
- `PUT /api/admin/faq/:id`
- `DELETE /api/admin/faq/:id`

## Prochaine étape

Créer les pages `/admin/login` et `/admin` qui consomment ces endpoints pour modifier les contenus.
