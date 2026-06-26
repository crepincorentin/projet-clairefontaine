import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contents = await prisma.pageContent.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ contents });
}

export async function POST(request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { key, title, data, published = true } = await request.json();

  if (!key || !title || data === undefined) {
    return NextResponse.json({ error: 'key, title and data are required' }, { status: 400 });
  }

  const content = await prisma.pageContent.upsert({
    where: { key },
    create: { key, title, data, published },
    update: { title, data, published },
  });

  return NextResponse.json({ content }, { status: 201 });
}
