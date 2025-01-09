import { mockDataPotentialCustomers } from '../core/mocks/mock-data-potential-customers';

export const getPotentialCustomers = () => {
  return mockDataPotentialCustomers;
};

export const addPotentialCustomer = (newCustomer: Record<string, any>) => {
  const isDuplicate = mockDataPotentialCustomers.some(cust => cust.nitEmpresa === newCustomer.nitEmpresa);

  if (isDuplicate) {
    throw new Error('DUPLICATE_CUSTOMER');
  }

  const newId = (mockDataPotentialCustomers.length + 1).toString();
  const customerWithId = { ...newCustomer, id: newId };
  mockDataPotentialCustomers.push(customerWithId);
  return customerWithId;
};

export const getPotentialCustomerById = (id: string) => {
  const customer = mockDataPotentialCustomers.find(cust => cust.id === id);
  return customer || null;
};

export const updatePotentialCustomer = (updatedCustomer: Record<string, any>) => {
  const index = mockDataPotentialCustomers.findIndex(cust => cust.id === updatedCustomer.id);
  if (index !== -1) {
    mockDataPotentialCustomers[index] = { ...mockDataPotentialCustomers[index], ...updatedCustomer };
    return mockDataPotentialCustomers[index];
  }
  return null;
};