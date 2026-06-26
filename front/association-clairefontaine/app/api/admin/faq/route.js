import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../lib/admin-auth';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const faqItems = await prisma.faqItem.findMany({
    orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
  });

  return NextResponse.json({ faqItems });
}

export async function POST(request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { question, answer, position = 0, published = true } = await request.json();

  if (!question || !answer) {
    return NextResponse.json({ error: 'question and answer are required' }, { status: 400 });
  }

  const faqItem = await prisma.faqItem.create({
    data: { question, answer, position, published },
  });

  return NextResponse.json({ faqItem }, { status: 201 });
}
