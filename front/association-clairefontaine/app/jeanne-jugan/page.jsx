import EstablishmentPage from '../components/establishments/EstablishmentPage';
import { jeannejugan } from '../data/establishments';

export const metadata = {
  title: 'Maison de Famille Jeanne Jugan | Association Clairefontaine',
  description:
    'Découvrez la Maison de Famille Jeanne Jugan, EHPAD situé au cœur de Dunkerque.',
};

export default function JeanneJuganPage() {
  return <EstablishmentPage establishment={jeannejugan} />;
}
