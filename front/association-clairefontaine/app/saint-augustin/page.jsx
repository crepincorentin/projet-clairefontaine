import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { saintAugustin } from '../data/establishments';
import { getEstablishmentContent } from '../lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Maison de Famille Saint-Augustin | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Saint-Augustin, EHPAD situé au cœur de Bergues.',
};

export default async function SaintAugustinPage() {
  const establishment = await getEstablishmentContent('saint-augustin', saintAugustin);

  return <EstablishmentPage establishment={establishment} />;
}
