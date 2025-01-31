import React from 'react';
import './pdf-contract.css';
import { generateGeneralContractPDF, generateHospitalContractPDF } from '../../services/pdf-contract.services';

interface PdfContractProps {
  contractType: 'general' | 'hospitalario';
}

const PdfContract: React.FC<PdfContractProps> = ({ contractType }) => {
  const handleDownload = () => {
    if (contractType === 'general') {
      generateGeneralContractPDF();
    } else if (contractType === 'hospitalario') {
      generateHospitalContractPDF();
    }
  };

  return (
    <div className="pdf-contract">
      <button onClick={handleDownload}>
        Descargar Contrato {contractType === 'general' ? 'General' : 'Hospitalario'}
      </button>
    </div>
  );
};

export default PdfContract;