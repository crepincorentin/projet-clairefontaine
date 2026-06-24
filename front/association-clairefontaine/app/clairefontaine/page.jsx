import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { clairefontaine } from '../data/establishments';

export const metadata = {
  title: 'Maison de Famille Clairefontaine | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Clairefontaine, EHPAD situé au cœur de Hazebrouck.',
};

export default function ClairefontainePage() {
  return <EstablishmentPage establishment={clairefontaine} />;
}
