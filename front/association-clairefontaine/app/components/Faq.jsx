'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const faqData = [
  {
    question: "Comment inscrire un proche dans l'un de nos établissements ?",
    answer: "Pour inscrire un proche, il vous suffit de compléter le formulaire CERFA n°11126*15 et de le déposer auprès de nos secrétariats.\n Vous pouvez également réaliser votre demande en ligne via la plateforme ViaTrajectoire. Celle-ci sera automatiquement transmise à notre établissement.\n Dès réception de votre dossier, votre demande est étudiée puis inscrite sur notre liste d’attente.\n Afin de mieux comprendre votre situation et vos besoins, nous vous invitons à nous contacter par téléphone. Cet échange nous permettra de vous accompagner au mieux dans vos démarches et de répondre à vos questions.",
  },
  {
    question: "Quelles sont les valeurs de l'Association Clairefontaine ?",
    answer: "Nos valeurs se traduisent chaque jour par une attention sincère portée à chaque personne, dans le respect de son histoire, de ses choix et de sa dignité",
  },
  {
    question: "Les résidents peuvent-ils aménager leur lieu de vie ?",
    answer: "Nos établissements sont avant tout des lieux de vie. C’est pourquoi nous encourageons chaque résident à personnaliser sa chambre afin de s’y sentir pleinement chez lui.\n Selon la configuration de la chambre, les résidents peuvent aménager leur espace avec leurs propres meubles et objets personnels, dans le respect des règles de sécurité et de confort.\n Pour vous accompagner dans cette démarche, nous mettons à votre disposition les recommandations élaborées en partenariat avec L’Esprève, afin de garantir un aménagement à la fois chaleureux, fonctionnel et sécurisé.",
  },
  {
    question: "Où consulter les tarifs de nos EHPAD ?",
    answer: "Nos tarifs sont consultables directement sur notre site. Vous pouvez également nous contacter par téléphone pour obtenir plus d’informations.",
  },
  {
    question: "Comment postuler à un des établissements de l'association ?",
    answer: "Pour postuler, vous pouvez nous transmettre votre candidature directement depuis notre site ou nous contacter par téléphone. Les candidatures spontanées sont également les bienvenues.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to the second question as active

  return (
    <section className="faq-section">
      <h2 className="faq-section__title">Questions fréquentes</h2>
      <div className="faq-section__container">
        <div className="faq-section__questions">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-section__question-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="icon-container">
                <span className="circle-icon"></span>
              </div>
              <span className="text">{item.question}</span>
              <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
            </div>
          ))}
        </div>
        <div className="faq-section__answer-panel">
          {activeIndex !== null && (
            <>
              <h3>{faqData[activeIndex].question}</h3>
              <div className="faq-section__answer-content">
                {faqData[activeIndex].answer
                  .split('\n')
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
