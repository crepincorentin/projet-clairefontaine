import { NextResponse } from 'next/server';
import { requireAdmin } from '../../../../lib/admin-auth';
import { prisma } from '../../../../lib/prisma';
import {
  clairefontaine,
  jeannejugan,
  saintAugustin,
} from '../../../../data/establishments';

const sourceEstablishments = [saintAugustin, clairefontaine, jeannejugan];

function getEditableData(establishment) {
  return {
    pricing: establishment.pricing,
    ...(establishment.autonomyResidence
      ? {
          autonomyResidence: {
            pricing: establishment.autonomyResidence.pricing,
          },
        }
      : {}),
  };
}

export async function POST() {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const establishments = await Promise.all(
    sourceEstablishments.map((establishment) =>
      prisma.establishment.upsert({
        where: { slug: establishment.slug },
        create: {
          slug: establishment.slug,
          name: establishment.location.name,
          data: getEditableData(establishment),
          published: true,
        },
        update: {
          name: establishment.location.name,
          data: getEditableData(establishment),
          published: true,
        },
      }),
    ),
  );

  return NextResponse.json({ establishments });
}
