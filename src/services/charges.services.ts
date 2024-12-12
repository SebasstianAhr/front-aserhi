import { ChargesData } from "../core/mocks/mock-data-charges";

export const getCharges = () => {
  return Promise.resolve(ChargesData);
};

export const addCharge = (charge: Omit<Charge, 'id'>): Promise<Charge> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = (ChargesData.length + 1).toString();
      const newCharge = { ...charge, id: newId }; 
      ChargesData.push(newCharge);
      resolve(newCharge);
    }, 500);
  });
};

export const getChargeById = (id: string) => {
  const  charge = ChargesData.find(item => item.id === id)
  return charge || null
}

export const updateCharge = (updatedCharge: Record<string, any>) => {
  const index = ChargesData.findIndex(item => item.id === updatedCharge.id);
  if (index !== -1) {
    ChargesData[index] = { ...ChargesData[index], ...updatedCharge };
    return ChargesData[index];
  }
  return null;
};