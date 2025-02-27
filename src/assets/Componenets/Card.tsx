
import React from 'react';
import Button from './Button';


interface CardProps {
  item: ClipboardItem;
  onCopy: () => void;
  onDelete: () => void;
}

type ClipboardItem={
  type:"text"|"image"|string;
  content:string;
  id:string;
}

const Card: React.FC<CardProps> = ({ item, onCopy, onDelete }) => {

  return (
    <div className="card">
      <div className="content">
        {item.type === 'text' ? (
          <div className="text-content">{item.content}</div>
        ) : (
          <div className="image-container">
            <img src={item.content} alt="Copied content" />
          </div>
        )}
      </div>
      <div className="actions">
        <Button label="Copy" onClick={onCopy} variant="primary" />
        <Button label="Delete" onClick={onDelete} variant="danger" />
      </div>
    </div>
  );
};

export default Card;