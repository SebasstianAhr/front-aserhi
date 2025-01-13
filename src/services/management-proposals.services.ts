import { mockDataProposals } from '../core/mocks/mock-data-proposals';

export const getProposals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDataProposals);
    }, 1000);
  });
};

export const addProposal = async (newProposal: Record<string, any>) => {
  const isDuplicate = mockDataProposals.some(proposal => proposal.id === newProposal.id);

  if (isDuplicate) {
    throw new Error('DUPLICATE_PROPOSAL');
  }

  const newId = (mockDataProposals.length + 1).toString();
  const proposalWithId = { ...newProposal, id: newId, estadoRevision: 'Pendiente', estadoPropuesta: 'En Proceso' };
  mockDataProposals.push(proposalWithId);
  return proposalWithId;
};

export const getProposalById = async (id: string) => {
  const proposal = mockDataProposals.find(proposal => proposal.id === id);
  return proposal || null;
};

export const updateProposal = async (updatedProposal: Record<string, any>) => {
  const index = mockDataProposals.findIndex(proposal => proposal.id === updatedProposal.id);
  if (index !== -1) {
    mockDataProposals[index] = { ...mockDataProposals[index], ...updatedProposal };
    return mockDataProposals[index];
  }
  return null;
};