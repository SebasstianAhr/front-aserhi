import { mockDataContractClause2 } from '../core/mocks/mock-data-contract-clauses-2';
import { mockDataContractClauses1 } from '../core/mocks/mock-data-contract-clauses-1';

export const getContractClauses1 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataContractClauses1);
    }, 1000);
  });
};

export const getContractClauses2 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataContractClause2);
    }, 1000);
  });
};