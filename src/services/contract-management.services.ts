import { mockDataContextManagement } from '../core/mocks/mock-data-contract-management';

export const getContracts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataContextManagement);
    }, 1000);
  });
};