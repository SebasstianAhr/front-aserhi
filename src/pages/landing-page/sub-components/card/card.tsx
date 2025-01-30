import React from 'react';
import './card.css';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSpecial?: boolean;
}

const Card: React.FC<CardProps> = ({ title, description, icon, isSpecial = false }) => {
  return (
    <div className={`about-content__card ${isSpecial ? 'about-content__card--special' : ''}`}>
      <div className={`card__content ${isSpecial ? 'card__content--special' : ''}`}>
        <div className="icon__container">
          {icon}
        </div>
        <div className={`card__content--text ${isSpecial ? 'card__content--text-special' : ''}`}>
          <h5 className={`card__content--title ${isSpecial ? 'card__content--title-special' : ''}`}>{title}</h5>
          <p className={`card__content--description ${isSpecial ? 'card__content--description-special' : ''}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;