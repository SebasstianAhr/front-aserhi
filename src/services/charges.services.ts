import { Charges } from "../core/mocks/mock-data-charges";

export const getCharges = () => {
  return Charges;
};


/*
export const addCharge = (newCharge: Record<string, any>) => {
  const isDuplicate = Charges.some(charge => charge.cargo === newCharge.cargo);

  if (isDuplicate) {
    return null;
  }

  const newId = (Charges.length + 1).toString(); // Genera un nuevo ID.
  const chargeWithId = { ...newCharge, id: newId };
  Charges.push(chargeWithId); 
  return chargeWithId; 
};

export const getChargeById = (id: string) => {
  const charge = Charges.find(charge => charge.id === id);
  return charge || null; 
};

export const updateCharge = (updatedCharge: Record<string, any>) => {
  const index = Charges.findIndex(charge => charge.id === updatedCharge.id);
  if (index !== -1) {
    Charges[index] = { ...Charges[index], ...updatedCharge };
    return Charges[index];
  }
  return null;
};

export const deleteCharge = (id: string) => {
  const index = Charges.findIndex(charge => charge.id === id);
  if (index !== -1) {
    const [deletedCharge] = Charges.splice(index, 1);
    return deletedCharge; 
  }
  return null;
};
*/