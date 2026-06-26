import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/admin-auth';
import { prisma } from '../../../../lib/prisma';

export async function GET(_request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const establishment = await prisma.establishment.findUnique({
    where: { slug },
  });

  if (!establishment) {
    return NextResponse.json({ error: 'Establishment not found' }, { status: 404 });
  }

  return NextResponse.json({ establishment });
}

export async function PUT(request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const { name, data, published } = await request.json();

  const establishment = await prisma.establishment.update({
    where: { slug },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(data !== undefined ? { data } : {}),
      ...(published !== undefined ? { published } : {}),
    },
  });

  return NextResponse.json({ establishment });
}

export async function DELETE(_request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;

  await prisma.establishment.delete({
    where: { slug },
  });

  return NextResponse.json({ ok: true });
}
