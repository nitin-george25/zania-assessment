import React from 'react';

interface CardProps {
  title: string;
  type: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, type, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img
        height={100}
        src={`/thumbnails/${type}.jpg`}
        alt={title}
        className="thumbnail"
      />
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
