import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

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

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await ensureContactMessageTable();

    const contactMessages = await prisma.$queryRawUnsafe(`
      SELECT "id", "lastName", "firstName", "email", "phone", "message", "createdAt"
      FROM "ContactMessage"
      ORDER BY "createdAt" DESC
      LIMIT 100;
    `);

    return NextResponse.json({ contactMessages });
  } catch (error) {
    console.error('Contact messages loading failed:', error);

    return NextResponse.json(
      { error: 'Impossible de charger les messages de contact.' },
      { status: 500 },
    );
  }
}
