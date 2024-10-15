// src/components/CardGrid.tsx
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from '../card/Card';
import { Document } from '../../types/files';

interface CardGridProps {
  documents: Document[];
  onReorder: (updatedDocs: Document[]) => void;
}

const ItemType = 'CARD';

const DraggableCard: React.FC<{
  document: Document;
  index: number;
  onCardClick: (doc: Document) => void;
  onDrop: (fromIndex: number, toIndex: number) => void; // Added onDrop prop
}> = ({ document, index, onCardClick, onDrop }) => {
  const [, drag] = useDrag({
    type: ItemType,
    item: { index }, // Pass only the index as the drag item
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: { index: number }) => {
      if (item.index !== index) {
        onDrop(item.index, index); // Reorder only when drop happens
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))} // Combine drag and drop references
      style={{
        cursor: 'move',
        padding: '20px',
        border: '1px solid #ccc',
        margin: '10px',
        display: 'inline-block',
      }}
    >
      <Card title={document.title} type={document.type} onClick={() => onCardClick(document)} />
    </div>
  );
};

const CardGrid: React.FC<CardGridProps> = ({ documents, onReorder }) => {
  const handleDrop = (fromIndex: number, toIndex: number) => {
    const updatedDocuments = [...documents];
    const [movedDocument] = updatedDocuments.splice(fromIndex, 1); // Remove the item from its original position
    updatedDocuments.splice(toIndex, 0, movedDocument); // Insert the item at the new position
  
    // Update the position of each document based on the new order
    updatedDocuments.forEach((doc, index) => {
      doc.position = index;  // Assign the new position
    });
  
    onReorder(updatedDocuments); // Pass the updated documents with new positions
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', flexWrap: 'wrap' }}>
      {documents.map((doc, index) => (
        <DraggableCard
          key={doc.type}
          document={doc}
          index={index}
          onCardClick={() => console.log(doc.title)}
          onDrop={handleDrop} // Pass handleDrop as prop
        />
      ))}
    </div>
  );
};

export default CardGrid;
