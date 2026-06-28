import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const contactMessages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ contactMessages });
  } catch (error) {
    console.error('Contact messages loading failed:', error);

    return NextResponse.json(
      { error: 'Impossible de charger les messages de contact.' },
      { status: 500 },
    );
  }
}
