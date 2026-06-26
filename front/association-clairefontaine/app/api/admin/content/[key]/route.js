import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/admin-auth';
import { prisma } from '../../../../lib/prisma';

export async function GET(_request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { key } = await params;
  const content = await prisma.pageContent.findUnique({
    where: { key },
  });

  if (!content) {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }

  return NextResponse.json({ content });
}

export async function PUT(request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { key } = await params;
  const { title, data, published } = await request.json();

  const content = await prisma.pageContent.update({
    where: { key },
    data: {
      ...(title !== undefined ? { title } : {}),
      ...(data !== undefined ? { data } : {}),
      ...(published !== undefined ? { published } : {}),
    },
  });

  return NextResponse.json({ content });
}

export async function DELETE(_request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { key } = await params;

  await prisma.pageContent.delete({
    where: { key },
  });

  return NextResponse.json({ ok: true });
}
