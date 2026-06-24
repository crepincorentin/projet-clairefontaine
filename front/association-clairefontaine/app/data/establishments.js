import {
  faBowlFood,
  faCalendarDays,
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
      value: 'XX',
      firstLine: 'soignants &',
      secondLine: 'encadrants',
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
      'Héritière de la mission des Sœurs de Notre Dame du Fief, la Maison Saint-Augustin accueille les seniors de plus de 60 ans, valides ou en perte d’autonomie. Notre priorité est de permettre à chaque résident de rester « debout », dans le respect total de sa dignité et de ses habitudes de vie.',
    image: {
      src: '/association.png',
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
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faUtensils,
      },
      {
        id: 'restauration-repas',
        title: 'Restauration',
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faBowlFood,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
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
          "Le restaurant est un lieu d'échange central où les familles sont les bienvenues pour partager un repas avec leur proche.",
        icon: faPeopleGroup,
      },
      {
        id: 'animations-programme',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
        icon: faCalendarDays,
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
          "Dossier administratif et médical complété pour inscription sur liste d'attente.",
      },
      {
        title: "L'Entrée",
        description:
          "Rendez-vous avec le Directeur et le Médecin Coordonnateur avant l'arrivée.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "Découvrez nos 65 solutions d'accueil à Bergues, du séjour permanent à l'unité Alzheimer. Un cadre bienveillant incluant un accueil de jour et des solutions de répit pour les aidants.",
    image: {
      src: '/about-bottom.png',
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
          '11 places au sein d’un secteur protégé. Un accompagnement spécifique par des experts (AMP, ergothérapeute) et des ateliers thérapeutiques pour stimuler les capacités de chacun au quotidien.',
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
      { label: 'Tarif Hébergement', price: '62,70 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '17,99 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '11,42 €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '4,84 €' },
    ],
    note: {
      title: 'Note sur le reste à charge :',
      description:
        "Ces tarifs ne tiennent pas compte des aides financières dont vous pouvez bénéficier, telles que l’APA (Allocation Personnalisée d’Autonomie), l’APL ou l’ASH. Nos équipes administratives vous accompagnent dans le montage de vos dossiers.",
    },
    image: {
      src: '/association.png',
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
      value: 'XX',
      firstLine: 'soignants &',
      secondLine: 'encadrants',
    },
    locationBadge: {
      firstLine: 'Au cœur de',
      secondLine: 'Hazebrouck',
    },
  },
  about: {
    eyebrow: 'À propos',
    title: "Un accompagnement bienveillant au centre d'Hazebrouck",
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
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faUtensils,
      },
      {
        id: 'restauration-repas',
        title: 'Restauration',
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faBowlFood,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
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
          "Le restaurant est un lieu d'échange central où les familles sont les bienvenues pour partager un repas avec leur proche.",
        icon: faPeopleGroup,
      },
      {
        id: 'animations-programme',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
        icon: faCalendarDays,
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
          "Dossier administratif et médical complété pour inscription sur liste d'attente.",
      },
      {
        title: "L'Entrée",
        description:
          "Rendez-vous avec le Directeur et le Médecin Coordonnateur avant l'arrivée.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "Découvrez nos 65 solutions d'accueil à Bergues, du séjour permanent à l'unité Alzheimer. Un cadre bienveillant incluant un accueil de jour et des solutions de répit pour les aidants.",
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
          '50 chambres médicalisées pour les seniors de plus de 60 ans. Un espace privé entièrement personnalisable avec ses propres meubles pour se sentir véritablement chez soi, la sécurité en plus.',
      },
      {
        title: 'Unité de Vie Alzheimer',
        description:
          '11 places au sein d’un secteur protégé. Un accompagnement spécifique par des experts (AMP, ergothérapeute) et des ateliers thérapeutiques pour stimuler les capacités de chacun au quotidien.',
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
      { label: 'Tarif Hébergement', price: '62,70 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '17,99 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '11,42 €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '4,84 €' },
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
      src: '/clairefontaine.jpeg',
      alt: 'Façade de la Maison de Famille Jeanne Jugan à Dunkerque',
    },
    staff: {
      value: 'XX',
      firstLine: 'soignants &',
      secondLine: 'encadrants',
    },
    locationBadge: {
      firstLine: 'Au cœur de',
      secondLine: 'Dunkerque',
    },
  },
  about: {
    eyebrow: 'À propos',
    title: "Un accompagnement associatif au cœur de Dunkerque",
    description:
      'Établissement privé à but non lucratif, la Maison Jeanne Jugan accueille 72 résidents dans un cadre moderne édifié sur 4 niveaux. Notre mission : entretenir votre capacité d\'initiative à travers un projet d\'accompagnement 100% personnalisé.',
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
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faUtensils,
      },
      {
        id: 'restauration-repas',
        title: 'Restauration',
        description: 'Repas cuisinés sur place privilégiant les circuits courts.',
        icon: faBowlFood,
      },
      {
        id: 'animations-quotidiennes',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
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
          "Le restaurant est un lieu d'échange central où les familles sont les bienvenues pour partager un repas avec leur proche.",
        icon: faPeopleGroup,
      },
      {
        id: 'animations-programme',
        title: 'Animations',
        description: "Programme quotidien pour maintenir le lien social et l'autonomie.",
        icon: faCalendarDays,
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
          "Dossier administratif et médical complété pour inscription sur liste d'attente.",
      },
      {
        title: "L'Entrée",
        description:
          "Rendez-vous avec le Directeur et le Médecin Coordonnateur avant l'arrivée.",
      },
    ],
  },
  solutions: {
    title: 'Nos Solutions',
    description:
      "Découvrez nos 65 solutions d'accueil à Bergues, du séjour permanent à l'unité Alzheimer. Un cadre bienveillant incluant un accueil de jour et des solutions de répit pour les aidants.",
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
          '50 chambres médicalisées pour les seniors de plus de 60 ans. Un espace privé entièrement personnalisable avec ses propres meubles pour se sentir véritablement chez soi, la sécurité en plus.',
      },
      {
        title: 'Unité de Vie Alzheimer',
        description:
          '11 places au sein d’un secteur protégé. Un accompagnement spécifique par des experts (AMP, ergothérapeute) et des ateliers thérapeutiques pour stimuler les capacités de chacun au quotidien.',
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
      { label: 'Tarif Hébergement', price: '62,70 €' },
      { label: 'Tarif Dépendance : GIR 1-2', price: '17,99 €' },
      { label: 'Tarif Dépendance : GIR 3-4', price: '11,42 €' },
      { label: 'Tarif Dépendance : GIR 5-6', price: '4,84 €' },
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
    name: 'EHPAD Maison de Famille Jeanne Jugan',
    address: '192 Rue Jeanne Jugan, 59240 Dunkerque',
    phone: '03 28 69 10 80',
    phoneHref: 'tel:+33328691080',
    mapEmbedUrl:
      ' https://www.google.com/maps?q=192+Rue+Jeanne+Jugan,+59240+Dunkerque&output=embed',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=192+Rue+Jeanne+Jugan,+59240+Dunkerque',
  },
};