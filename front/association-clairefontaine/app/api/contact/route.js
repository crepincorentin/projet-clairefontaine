import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export const runtime = 'nodejs';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function ensureContactMessageTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ContactMessage" (
      "id" TEXT NOT NULL,
      "lastName" TEXT NOT NULL,
      "firstName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "message" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx"
    ON "ContactMessage"("createdAt");
  `);
}

export async function POST(request) {
  try {
    const { nom, prenom, email, telephone, message } = await request.json();

    const lastName = cleanString(nom);
    const firstName = cleanString(prenom);
    const emailAddress = cleanString(email).toLowerCase();
    const phone = cleanString(telephone);
    const content = cleanString(message);

    if (!lastName || !firstName || !emailAddress || !content) {
      return NextResponse.json(
        { error: 'Nom, prénom, email et message sont requis.' },
        { status: 400 },
      );
    }

    if (!emailAddress.includes('@')) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    await ensureContactMessageTable();

    const [contactMessage] = await prisma.$queryRawUnsafe(
      `
        INSERT INTO "ContactMessage"
          ("id", "lastName", "firstName", "email", "phone", "message")
        VALUES
          ($1, $2, $3, $4, $5, $6)
        RETURNING "id", "lastName", "firstName", "email", "phone", "message", "createdAt";
      `,
      crypto.randomUUID(),
      lastName,
      firstName,
      emailAddress,
      phone || null,
      content,
    );

    return NextResponse.json({ contactMessage }, { status: 201 });
  } catch (error) {
    console.error('Contact form submission failed:', error);

    return NextResponse.json(
      { error: 'Impossible d’enregistrer votre message pour le moment.' },
      { status: 500 },
    );
  }
}
