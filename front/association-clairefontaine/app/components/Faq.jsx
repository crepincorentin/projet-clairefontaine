'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const faqData = [
  {
    question: "Comment inscrire un proche dans l'un de nos établissements ?",
    answer: "Pour inscrire un proche, vous devez remplir un dossier d'admission disponible sur la page de chaque établissement ou en contactant directement le secrétariat. Une visite de pré-admission est ensuite organisée.",
  },
  {
    question: "Quelles sont les valeurs de l'Association Clairefontaine ?",
    answer: "Nous cultivons une approche centrée sur le bien-être du résident et la solidarité avec les familles. Travailler chez nous, c'est rejoindre un acteur à but non lucratif qui valorise l'éthique et le respect de la personne.",
  },
  {
    question: "Les résidents peuvent-ils personnaliser leur chambre ?",
    answer: "Oui, les résidents sont encouragés à personnaliser leur chambre avec des petits meubles, des cadres photos et des objets personnels pour se sentir comme chez eux, dans le respect des règles de sécurité.",
  },
  {
    question: "Où consulter les tarifs de nos EHPAD ?",
    answer: "Les tarifs sont disponibles sur les pages dédiées à chaque établissement sur notre site. Vous pouvez également les obtenir en contactant directement l'accueil de l'établissement concerné.",
  },
  {
    question: "Comment postuler à une offre d'emploi au sein de l'association ?",
    answer: "Vous pouvez consulter nos offres d'emploi sur la page 'Carrières' de notre site web et postuler en ligne. Les candidatures spontanées sont également les bienvenues via le formulaire de contact.",
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
              <p>{faqData[activeIndex].answer}</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
