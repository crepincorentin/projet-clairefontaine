import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { clairefontaine } from '../data/establishments';
import { getEstablishmentContent } from '../lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Maison de Famille Clairefontaine | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Clairefontaine, EHPAD situé au cœur de Hazebrouck.',
};

export default async function ClairefontainePage() {
  const establishment = await getEstablishmentContent('clairefontaine', clairefontaine);

  return <EstablishmentPage establishment={establishment} />;
}
