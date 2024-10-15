import { useState, useEffect } from 'react';
import { Document } from '../types/files';

export const useAutoSaveDocuments = (documents: Document[]) => {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saveDocumentOrder = async () => {
      try {
        setIsSaving(true);
        const response = await fetch('/documents', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(documents),
        });
        if (!response.ok) {
          throw new Error('Failed to save documents');
        }
      } catch (error) {
        console.error('Error saving document order:', error);
      } finally {
        setTimeout(() => {
          setIsSaving(false);
        }, 2000);
      }
    };

    const interval = setInterval(() => {
      if (documents.length > 0) {
        saveDocumentOrder();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [documents]);

  return { isSaving };
};
