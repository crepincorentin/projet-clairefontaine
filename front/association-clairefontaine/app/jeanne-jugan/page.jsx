import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { jeannejugan } from '../data/establishments';
import { getEstablishmentContent } from '../lib/cms-content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Maison de Famille Jeanne Jugan | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Jeanne Jugan, EHPAD situé au cœur de Dunkerque.',
};

export default async function JeanneJuganPage() {
  const establishment = await getEstablishmentContent('jeanne-jugan', jeannejugan);

  return <EstablishmentPage establishment={establishment} />;
}
