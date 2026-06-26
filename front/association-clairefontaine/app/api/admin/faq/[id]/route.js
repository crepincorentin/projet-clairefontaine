import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/admin-auth';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const { question, answer, position, published } = await request.json();

  const faqItem = await prisma.faqItem.update({
    where: { id },
    data: {
      ...(question !== undefined ? { question } : {}),
      ...(answer !== undefined ? { answer } : {}),
      ...(position !== undefined ? { position } : {}),
      ...(published !== undefined ? { published } : {}),
    },
  });

  return NextResponse.json({ faqItem });
}

export async function DELETE(_request, { params }) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.faqItem.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
