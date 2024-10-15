import { useState, useEffect } from 'react';
import { Document } from '../types/files';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/documents');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch documents');
        }

        const data = await response.json();
        setDocuments(data);
      } catch (error: any) {
        console.error('Failed to fetch documents:', error);
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, setDocuments, loading, error };
};
