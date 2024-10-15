import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CardGrid from './components/card-grid/CardGrid';

import { useDocuments } from './custom-hooks/useDocument';
import { Document } from './types/files';
import { useAutoSaveDocuments } from './custom-hooks/useAutoSaveDocuments';

import './App.css';

const App: React.FC = () => {
  const { documents, setDocuments, loading, error } = useDocuments();
  const {isSaving } = useAutoSaveDocuments(documents);

  const handleReorder = (updatedDocs: Document[]) => {
    setDocuments(updatedDocs);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents: {error}</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ maxWidth: 'fit-content' }}>
        <CardGrid documents={documents} onReorder={handleReorder} />
        {isSaving && <div className='auto-save'>Saving...</div>}
      </div>
    </DndProvider>
  );
};

export default App;
