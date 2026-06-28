import {
  faBuilding,
  faHeadSideCough,
  faHouse,
  faPalette,
  faPeopleGroup,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';

export const saintAugustin = {
  slug: 'saint-augustin',
  theme: {
    primary: '#02506D',
    accent: '#0287B7',
  },
  hero: {
    title: ['EHPAD Maison de', 'Famille Saint Augustin'],
    location: 'Bergues',
    image: {
      src: '/saint-augustin.jpeg',
      alt: 'Façade de la Maison de Famille Saint-Augustin à Bergues',
    },
    staff: {
      value: 'Équipe',
      firstLine: 'soignante &',
      secondLine: 'encadrante',
    },
    locationBadge: {
      firstLine: 'Au cœur de',
      secondLine: 'Bergues',
    },
  },
  about: {
    eyebrow: 'À propos',
    title: "Un lieu de vie empreint d'histoire",
    description:
      'Héritière de l\'engagement des Sœurs de Notre-Dame du Fief, la Maison Saint-Augustin accueille des personnes âgées de plus de 60 ans, autonomes ou en perte d\'autonomie.\n Notre mission est d\'offrir à chacun un accompagnement personnalisé, fondé sur le respect, l\'écoute et la bienveillance, afin de préserver son autonomie, sa dignité et sa qualité de vie au quotidien.',
    image: {
      src: '/saintaugustin-lieudevie.jpeg',
      alt: 'Une résidente participant à une activité accompagnée',
      width: 552,
      height: 600,
    },
    button: {
      label: 'Nous contacter',
      href: '/contact',
    },
  },
  services: {
    title: 'Nos prestations',
    items: [
      {
        id: 'restauration-cuisine',
        title: 'Restauration',
        description: 'Repas cuisinés sur place avec nos propres équipes.',
        icon: faUtensils,
      },
      {
        id: 'accueil-jour',
        title: 'Accueil de jour',
        description: 'L’accueil de jour Hom’Age accueille chaque jours 6 usagers.',
        icon: faHouse,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "L’animatrice vous propose chaque jour un planning d’activité varié et adapté.",
        icon: faPalette,
      },
      {
        id: 'cadre-de-vie',
        title: 'Cadre de vie',
        description: 'Chambres personnalisables et espaces communs conviviaux.',
        icon: faHouse,
      },
      {
        id: 'convivialite',
        title: 'Convivialité',
        description:
          "Ensemble fêtons une fois par mois les anniverssaires de chacun.",
        icon: faPeopleGroup,
      },
      {
        id: 'salon-de-coiffure',
        title: 'Salon de coiffure',
        description: "Nous metons à disposition notre salon de coiffure pour continuer à prendre soin de vous.",
        icon: faHeadSideCough,

      },
    ],
  },
  admission: {
    title: ['Parcours', "d'Admission"],
    description:
      "Parce que l'entrée en établissement est une étape majeure, notre parcours est conçu pour vous mettre en confiance dès le premier contact. De la visite de découverte à la constitution de votre dossier, nous vous accompagnons pas à pas pour que vous vous sentiez ici, chez vous, en toute liberté.",
    steps: [
      {
        title: 'La Découverte',
        description:
          'Prenez le temps de découvrir notre établissement lors d\'une visite personnalisée et laissez-nous répondre à toutes vos questions.',
      },
      {
        title: "L'Inscription",
        description:
          "Déposez votre demande de préadmission auprès de notre établissement ou via ViaTrajectoire. Notre équipe administrative l'étudiera avec attention et vous accompagnera dans les démarches jusqu'à l'attribution d'une place disponible.",
      },
      {
        title: "L'Entrée",
        description:
          "Avant toute admission, un entretien avec notre Médecin Coordonnateur est proposé afin d'échanger sur les besoins de la personne et de s'assurer que notre établissement pourra l'accompagner dans les meilleures conditions.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "Découvre nos 4 solutions d'accueil à Bergues, du séjour permanent à l'unité Alzheimer. Un cadre bienveillant incluant un accueil de jour et des solutions de répit pour les aidants.",
    image: {
      src: '/saintaugustin-materiel.jpeg',
      alt: 'Des résidents partageant un moment convivial',
      width: 522,
      height: 546,
    },
    items: [
      {
        title: 'Hébergement Permanent',
        description:
          '50 chambres médicalisées pour les seniors de plus de 60 ans. Un espace privé entièrement personnalisable avec ses propres meubles pour se sentir véritablement chez soi, la sécurité en plus.',
      },
      {
        title: 'Unité de Vie Alzheimer',
        description:
          '10 places au sein d’un secteur protégé. Un accompagnement spécifique par des experts (AMP, ergothérapeute) et des ateliers thérapeutiques pour stimuler les capacités de chacun au quotidien.',
      },
      {
        title: 'Accueil Temporaire & Urgence',
        description:
          '4 chambres dédiées aux séjours de courte durée ou aux urgences. Idéal pour une convalescence après hospitalisation ou pour tester la vie en établissement lors d’un « séjour à l’essai ».',
      },
      {
        title: 'Accueil de Jour "Hom’âge"',
        description:
          '6 places à la journée pour rompre l’isolement. Un programme d’activités stimulant qui permet au résident de sociabiliser tout en offrant un temps de repos essentiel à ses proches aidants.',
      },
    ],
  },
  pricing: {
    title: 'Tarifs - Aides financières',
    columns: {
      label: 'Tarifs',
      price: 'Prix',
    },
    rows: [
      { label: 'Tarif Hébergement', price: '75,40 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '22,34 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '14,17€ €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '6,02 €' },
    ],
    note: {
      title: 'Note sur le reste à charge :',
      description:
        "Ces tarifs ne tiennent pas compte des aides financières dont vous pouvez bénéficier, telles que l’APA (Allocation Personnalisée d’Autonomie), l’APL ou l’ASH. Nos équipes administratives vous accompagnent dans le montage de vos dossiers.",
    },
    image: {
      src: '/salon-coiffure.jpeg',
      alt: 'Une accompagnante auprès d’une résidente',
      width: 552,
      height: 600,
    },
  },
  location: {
    title: 'Nous Trouver',
    name: 'EHPAD Maison de Famille Saint-Augustin',
    address: '27 Rue de la Gare, 59380 Bergues',
    phone: '03 28 68 60 76',
    phoneHref: 'tel:+33328686076',
    mapEmbedUrl:
      'https://www.google.com/maps?q=27+Rue+de+la+Gare,+59380+Bergues&output=embed',
    coords: [50.9689, 2.4347],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=27+Rue+de+la+Gare,+59380+Bergues',
  },
};

export const clairefontaine = {
  slug: 'clairefontaine',
  theme: {
    primary: '#2D5A47',
    accent: '#52A582',
  },
  hero: {
    title: ['EHPAD Maison de', 'Famille Clairefontaine'],
    location: 'Hazebrouck',
    image: {
      src: '/clairefontaine.jpeg',
      alt: 'Façade de la Maison de Famille Clairefontaine à Hazebrouck',
    },
    staff: {
      value: 'Équipe',
      firstLine: 'soignante &',
      secondLine: 'encadrante',
    },
    locationBadge: {
      firstLine: 'Au cœur de',
      secondLine: 'Hazebrouck',
    },
  },
  about: {
    eyebrow: 'À propos',
    title: "Un accompagnement à l'écoute de vos besoins au coeur d'Hazebrouck",
    description:
      'Située au 48, rue du Maréchal de Lattre de Tassigny, la Maison de Famille Clairefontaine est un établissement à taille humaine. Notre mission, en tant qu\'acteur privé non lucratif, est de veiller quotidiennement sur le bien-être et la dignité de nos 49 résidents au sein d\'un cadre sécurisant et chaleureux.',
    image: {
      src: '/clairefontaine_exterieur.jpeg',
      alt: 'Une résidente participant à une activité accompagnée',
      width: 552,
      height: 600,
    },
    button: {
      label: 'Nous contacter',
      href: '/contact',
    },
  },
  services: {
    title: 'Nos prestations',
    items: [
      {
        id: 'restauration-cuisine',
        title: 'Restauration',
        description: 'Repas cuisinés sur place avec nos propres équipes.',
        icon: faUtensils,
      },
      {
        id: 'accueil-jour',
        title: 'Accueil de jour',
        description: 'L’accueil de jour Part’âge accueille chaque jours 12 usagers.',
        icon: faHouse,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "L’animatrice vous propose chaque jour un planning d’activité varié et adapté.",
        icon: faPalette,
      },
      {
        id: 'cadre-de-vie',
        title: 'Cadre de vie',
        description: 'Chambres personnalisables et espaces communs conviviaux.',
        icon: faHouse,
      },
      {
        id: 'convivialite',
        title: 'Convivialité',
        description:
          "Ensemble fêtons une fois par mois les anniverssaires de chacun.",
        icon: faPeopleGroup,
      },
      {
        id: 'salon-de-coiffure',
        title: 'Salon de coiffure',
        description: "Nous metons à disposition notre salon de coiffure pour continuer à prendre soin de vous.",
        icon: faHeadSideCough,

      },
    ],
  },
  admission: {
    title: ['Parcours', "d'Admission"],
    description:
      "Parce que l'entrée en établissement est une étape majeure, notre parcours est conçu pour vous mettre en confiance dès le premier contact. De la visite de découverte à la constitution de votre dossier, nous vous accompagnons pas à pas pour que vous vous sentiez ici, chez vous, en toute liberté.",
    steps: [
      {
        title: 'La Découverte',
        description:
          'Prenez le temps de découvrir notre établissement lors d\'une visite personnalisée et laissez-nous répondre à toutes vos questions.',
      },
      {
        title: "L'Inscription",
        description:
          "Déposez votre demande de préadmission auprès de notre établissement ou via ViaTrajectoire. Notre équipe administrative l'étudiera avec attention et vous accompagnera dans les démarches jusqu'à l'attribution d'une place disponible.",
      },
      {
        title: "L'Entrée",
        description:
          "Avant toute admission, un entretien avec notre Médecin Coordonnateur est proposé afin d'échanger sur les besoins de la personne et de s'assurer que notre établissement pourra l'accompagner dans les meilleures conditions.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "La Maison Clairefontaine propose 4 solutions d'accueil à Hazebrouck, de l'hébergement durable au répit temporaire. Un accompagnement expert incluant une unité Alzheimer et l'accueil de jour Part'âge.",
    image: {
      src: '/clairefontaine_interieur.jpeg',
      alt: 'Des résidents partageant un moment convivial',
      width: 522,
      height: 546,
    },
    items: [
      {
        title: 'Hébergement Permanent',
        description:
          '45 chambres médicalisées alliant confort et sécurité. Un espace privé personnalisable pour garantir le respect des habitudes de vie et la dignité de chaque résident au quotidien.',
      },
      {
        title: 'Unité de Vie Protégé (UVP)',
        description:
          '10 chambres dédiées au sein d\'un espace de vie sécurisé. Une prise en charge adaptée favorisant le maintien des capacités cognitives à travers des activités thérapeutiques spécifiques.',
      },
      {
        title: 'Accueil Temporaire & Urgence',
        description:
          '4 places (dont 1 d\'urgence) pour répondre aux besoins ponctuels. Une transition idéale après hospitalisation ou une solution de repos indispensable pour les proches aidants.',
      },
      {
        title: 'Accueil de Jour "Part’âge"',
        description:
          '12 places en journée pour rompre l\'isolement social. Un programme stimulant permettant au senior de rester à domicile tout en offrant une pause essentielle à son entourage.',
      },
    ],
  },
  pricing: {
    title: 'Tarifs - Aides financières',
    columns: {
      label: 'Tarifs',
      price: 'Prix',
    },
    rows: [
      { label: 'Tarif Hébergement', price: '75,40 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '22,34 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '14,17€ €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '6,02 €' },
    ],
    note: {
      title: 'Note sur le reste à charge :',
      description:
        "Ces tarifs ne tiennent pas compte des aides financières dont vous pouvez bénéficier, telles que l’APA (Allocation Personnalisée d’Autonomie), l’APL ou l’ASH. Nos équipes administratives vous accompagnent dans le montage de vos dossiers.",
    },
    image: {
      src: '/clairefontaine_cour.jpeg',
      alt: 'Une accompagnante auprès d’une résidente',
      width: 552,
      height: 600,
    },
  },
  location: {
    title: 'Nous Trouver',
    name: 'EHPAD Maison de Famille Clairefontaine',
    address: '48 Avenue Maréchal de Lattre de Tassigny, 59190 Hazebrouck',
    phone: '03 28 41 67 07',
    phoneHref: 'tel:+33328416707',
    mapEmbedUrl:
      'https://www.google.com/maps?q=48+Rue+du+Maréchal+de+Lattre+de+Tassigny,+59190+Hazebrouck&output=embed',
    coords: [50.7246, 2.5394],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=48+Rue+du+Maréchal+de+Lattre+de+Tassigny,+59190+Hazebrouck',
  },
};

export const jeannejugan = {
  slug: 'jeanne-jugan',
  theme: {
    primary: '#C59300',
    accent: '#ECBB2A',
  },
  hero: {
    title: ['EHPAD Maison de', 'Famille Jeanne Jugan'],
    location: 'Dunkerque',
    image: {
      src: '/jeannejugan.jpeg',
      alt: 'Façade de la Maison de Famille Jeanne Jugan à Dunkerque',
    },
    staff: {
      value: 'Équipe',
      firstLine: 'soignante &',
      secondLine: 'encadrante',
    },
    locationBadge: {
      firstLine: 'Au cœur de',
      secondLine: 'Dunkerque',
    },
  },
  about: {
    eyebrow: 'À propos',
    title: "Un accompagnement de proximité au cœur de Dunkerque",
    description:
      'Établissement privé à but non lucratif, la Maison Jeanne Jugan accueille 72 résidents dans un cadre moderne édifié sur 4 niveaux. Notre mission : entretenir votre capacité d\'initiative à travers un projet d\'accompagnement 100% personnalisé.',
    image: {
      src: '/jeannejugan_interieur.jpeg',
      alt: 'Une résidente participant à une activité accompagnée',
      width: 552,
      height: 600,
    },
    button: {
      label: 'Nous contacter',
      href: '/contact',
    },
  },
  services: {
    title: 'Nos prestations',
   items: [
      {
        id: 'restauration-cuisine',
        title: 'Restauration',
        description: 'Repas cuisinés sur place avec nos propres équipes.',
        icon: faUtensils,
      },
      {
        id: 'residence-autonomie',
        title: 'Résidence autonomie',
        description: '30 appartements pour les personnes les plus autonomes.',
        icon: faBuilding,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "L’animatrice vous propose chaque jour un planning d’activité varié et adapté.",
        icon: faPalette,
      },
      {
        id: 'cadre-de-vie',
        title: 'Cadre de vie',
        description: 'Chambres personnalisables et espaces communs conviviaux.',
        icon: faHouse,
      },
      {
        id: 'convivialite',
        title: 'Convivialité',
        description:
          "Ensemble fêtons une fois par mois les anniverssaires de chacun.",
        icon: faPeopleGroup,
      },
      {
        id: 'salon-de-coiffure',
        title: 'Salon de coiffure',
        description: "Nous metons à disposition notre salon de coiffure pour continuer à prendre soin de vous.",
        icon: faHeadSideCough,

      },
    ],
  },
  admission: {
    title: ['Parcours', "d'Admission"],
    description:
      "Parce que l'entrée en établissement est une étape majeure, notre parcours est conçu pour vous mettre en confiance dès le premier contact. De la visite de découverte à la constitution de votre dossier, nous vous accompagnons pas à pas pour que vous vous sentiez ici, chez vous, en toute liberté.",
    steps: [
      {
        title: 'La Découverte',
        description:
          'Visite des lieux (chapelle, salons, chambre) et informations sur la journée type.',
      },
      {
        title: "L'Inscription",
        description:
          "Déposez votre demande de préadmission auprès de notre établissement ou via ViaTrajectoire. Notre équipe administrative l'étudiera avec attention et vous accompagnera dans les démarches jusqu'à l'attribution d'une place disponible.",
      },
      {
        title: "L'Entrée",
        description:
          "Avant toute admission, un entretien avec notre Médecin Coordonnateur est proposé afin d'échanger sur les besoins de la personne et de s'assurer que notre établissement pourra l'accompagner dans les meilleures conditions.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "La Maison Jeanne Jugan accueille 72 résidents à Dunkerque au sein d'un cadre moderne et fonctionnel. Un accompagnement sur-mesure alliant EHPAD et Résidence Autonomie pour préserver l'autonomie de chacun.",
    image: {
      src: '/jeannejugan_lieudevie.jpeg',
      alt: 'Des résidents partageant un moment convivial',
      width: 522,
      height: 546,
    },
    items: [
      {
        title: 'Hébergement Permanent',
        description:
          '72 chambres (simples ou doubles) de 18 à 20 m² réparties sur 4 niveaux. Un espace privé où chaque résident apporte son propre mobilier pour recréer un véritable "chez-soi" confortable et équipé.',
      },
      {
        title: 'EHPAD & Résidence Autonomie',
        description:
          'Une offre mixte comprenant 42 places en EHPAD et 30 en Résidence Autonomie. Un projet de vie qui respecte la capacité de décision de la personne tout en assurant une présence médicale 24h/24.',
      },
      {
        title: 'Convivialité et bien-être au quotidien',
        description:
          'Des prestations complètes : restauration sur place, jardin avec terrasse, chapelle et salon de coiffure. Une équipe qualifiée et des animations variées pour que la solitude ne soit plus qu\'un lointain souvenir.',
      },
      {
        title: 'Admission & Liberté',
        description:
          'De la visite des lieux aux rendez-vous médicaux, tout est mis en œuvre pour une mise en confiance. Un lieu de vie libre où les résidents reçoivent leurs proches et circulent à leur guise.',
      },
    ],
  },
  autonomyResidence: {
    eyebrow: 'Résidence autonomie',
    title: 'Résidence autonomie Montjoie',
    description:
      'Située à Dunkerque, la résidence autonomie Montjoie propose des appartements adaptés aux personnes âgées autonomes qui souhaitent conserver leur indépendance tout en profitant d’un environnement rassurant, convivial et proche des services de la Maison Jeanne Jugan.',
    image: {
      src: '/montjoie.jpeg',
      alt: 'Résidence autonomie Montjoie à Dunkerque',
      width: 700,
      height: 520,
    },
    pricing: {
      title: 'Grille tarifaire',
      columns: {
        label: 'Logement',
        price: 'Tarif',
      },
      rows: [
        { label: 'Appartement T1', price: 'Nous consulter' },
        { label: 'Appartement T1 bis', price: 'Nous consulter' },
        { label: 'Appartement T2', price: 'Nous consulter' },
        { label: 'Charges et services', price: 'Selon situation' },
      ],
      note: 'Les tarifs peuvent varier selon le logement, les prestations choisies et les aides mobilisables. Notre équipe vous renseigne lors de la demande d’admission.',
    },
  },
  pricing: {
    title: 'Tarifs - Aides financières',
    columns: {
      label: 'Tarifs',
      price: 'Prix',
    },
    rows: [
      { label: 'Tarif Hébergement', price: '75,40 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '22,34 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '14,17€ €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '6,02 €' },
    ],
    note: {
      title: 'Note sur le reste à charge :',
      description:
        "Ces tarifs ne tiennent pas compte des aides financières dont vous pouvez bénéficier, telles que l’APA (Allocation Personnalisée d’Autonomie), l’APL ou l’ASH. Nos équipes administratives vous accompagnent dans le montage de vos dossiers.",
    },
    image: {
      src: '/jeannejugan_exterieur.jpeg',
      alt: 'Une accompagnante auprès d’une résidente',
      width: 552,
      height: 600,
    },
  },
  location: {
    title: 'Nous Trouver',
    name: 'EHPAD Maison de Famille Jeanne Jugan',
    address: '192 Rue Jeanne Jugan, 59240 Dunkerque',
    phone: '03 28 69 10 80',
    phoneHref: 'tel:+33328691080',
    mapEmbedUrl:
      ' https://www.google.com/maps?q=192+Rue+Jeanne+Jugan,+59240+Dunkerque&output=embed',
    coords: [51.0346, 2.3771],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=192+Rue+Jeanne+Jugan,+59240+Dunkerque',
  },
};
