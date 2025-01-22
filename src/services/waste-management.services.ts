import { mockDataWasteManagement } from '../core/mocks/mock-data-waste-management';

export const getWasteData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataWasteManagement);
    }, 1000);
  });
};