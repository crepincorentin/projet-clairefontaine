import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { createAdminSession } from '../../../../lib/admin-auth';
import { prisma } from '../../../../lib/prisma';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (!admin || !admin.active) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const passwordIsValid = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordIsValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  await createAdminSession(admin);

  return NextResponse.json({
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    },
  });
}
