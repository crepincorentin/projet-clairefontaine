import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contactMessages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return NextResponse.json({ contactMessages });
}
