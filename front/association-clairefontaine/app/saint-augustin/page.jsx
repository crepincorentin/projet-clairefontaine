import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { saintAugustin } from '../data/establishments';

export const metadata = {
  title: 'Maison de Famille Saint-Augustin | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Saint-Augustin, EHPAD situé au cœur de Bergues.',
};

export default function SaintAugustinPage() {
  return <EstablishmentPage establishment={saintAugustin} />;
}
