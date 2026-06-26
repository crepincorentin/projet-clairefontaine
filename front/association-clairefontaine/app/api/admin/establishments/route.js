import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const establishments = await prisma.establishment.findMany({
    orderBy: { name: 'asc' },
  });

  return NextResponse.json({ establishments });
}

export async function POST(request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, name, data, published = true } = await request.json();

  if (!slug || !name || data === undefined) {
    return NextResponse.json({ error: 'slug, name and data are required' }, { status: 400 });
  }

  const establishment = await prisma.establishment.upsert({
    where: { slug },
    create: { slug, name, data, published },
    update: { name, data, published },
  });

  return NextResponse.json({ establishment }, { status: 201 });
}
