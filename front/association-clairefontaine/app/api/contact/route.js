import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
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

  const contactMessage = await prisma.contactMessage.create({
    data: {
      lastName,
      firstName,
      email: emailAddress,
      phone: phone || null,
      message: content,
    },
  });

  return NextResponse.json({ contactMessage }, { status: 201 });
}
