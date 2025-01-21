import { mockDataProfile } from '../core/mocks/mock-data-profile';

export const getProfiles = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataProfile);
    }, 1000);
  });
};