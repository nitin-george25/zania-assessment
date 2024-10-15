// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { Document } from '../types/files';

const initialDocuments = [
  { type: 'bank-draft', title: 'Bank Draft', position: 0 },
  { type: 'bill-of-lading', title: 'Bill of Lading', position: 1 },
  { type: 'invoice', title: 'Invoice', position: 2 },
  { type: 'bank-draft-2', title: 'Bank Draft 2', position: 3 },
  { type: 'bill-of-lading-2', title: 'Bill of Lading 2', position: 4 },
];

// Function to get documents from localStorage or return the initial set
const getStoredDocuments = (): Document[] => {
  const storedData = localStorage.getItem('documents');
  console.log('storedData', storedData);
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    // If no data exists, save initialDocuments to localStorage and return it
    saveDocuments(initialDocuments);
    return initialDocuments;
  }
};

// Function to save documents to localStorage
const saveDocuments = (documents: Document[]) => {
  localStorage.setItem('documents', JSON.stringify(documents));
};
 
export const handlers = [
  // Intercept "GET /documents" requests...
  http.get('/documents', () => {
    // ...and respond to them using this JSON response.
    const documents = getStoredDocuments();
    return HttpResponse.json(documents)
  }),

  // Intercept "PUT /documents" requests...
  http.put('/documents', async ({ request }) => {
    // ...and update the documents in the localStorage.
    const updatedDocuments = await request.json();

    saveDocuments(updatedDocuments as Document[]);

    return HttpResponse.json(
      { message: 'Documents updated successfully!' },
      {
        status: 200,
        statusText: 'OK',
      }
    );
  }),
]
