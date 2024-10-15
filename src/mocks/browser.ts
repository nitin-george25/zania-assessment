import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Setup the worker with the defined request handlers
export const worker = setupWorker(...handlers);
