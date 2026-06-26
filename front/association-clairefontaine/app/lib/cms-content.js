import { prisma } from './prisma';

function isObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

export function mergeContent(fallback, override) {
  if (!isObject(override)) {
    return fallback;
  }

  return Object.entries(override).reduce(
    (merged, [key, value]) => {
      if (isObject(value) && isObject(merged[key])) {
        return {
          ...merged,
          [key]: mergeContent(merged[key], value),
        };
      }

      return {
        ...merged,
        [key]: value,
      };
    },
    { ...fallback },
  );
}

export async function getEstablishmentContent(slug, fallback) {
  try {
    const establishment = await prisma.establishment.findUnique({
      where: { slug },
    });

    if (!establishment?.published) {
      return fallback;
    }

    return mergeContent(fallback, establishment.data);
  } catch {
    return fallback;
  }
}
