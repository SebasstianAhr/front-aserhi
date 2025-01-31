import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { combinedContractDataMock, combinedContractDataHospitalarioMock } from '../core/mocks/mock-pdf-contract';

export const generateGeneralContractPDF = () => {
  const doc = new jsPDF();
  const data = combinedContractDataMock;

  if (data) {
    let yOffset = 10;

    // Función para agregar texto con salto de página automático
    const addTextWithPageBreak = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const pageHeight = doc.internal.pageSize.height;
      const splitText = doc.splitTextToSize(text, maxWidth);

      splitText.forEach((line: string) => {
        if (y >= pageHeight - 10) {
          doc.addPage();
          y = 10; // Reiniciar la posición Y en la nueva página
        }
        doc.text(line, x, y);
        y += lineHeight;
      });

      return y;
    };

    // Encabezado
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.contractNumber, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(data.contractType, 10, yOffset, 180, 10);
    yOffset += 10;

    // Información del contratista
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(`CONTRATISTA: ${data.contractor.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`NIT: ${data.contractor.nit}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`REPRESENTANTE LEGAL: ${data.contractor.legalRepresentative}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DIRECCIÓN: ${data.contractor.address}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`TELÉFONO: ${data.contractor.phone}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`E-MAIL: ${data.contractor.email}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Información del contratante
    yOffset = addTextWithPageBreak(`CONTRATANTE: ${data.contracted.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`NIT: ${data.contracted.nit}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`REPRESENTANTE LEGAL: ${data.contracted.legalRepresentative}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`C.C. No. ${data.contracted.idNumber}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DIRECCIÓN: ${data.contracted.address}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`MUNICIPIO: ${data.contracted.municipio}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DEPARTAMENTO: ${data.contracted.department}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`TELÉFONO: ${data.contracted.phone}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`E-MAIL: ${data.contracted.email}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Fechas
    yOffset = addTextWithPageBreak(`FECHA INICIO: ${data.startDate}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`FECHA TERMINACIÓN: ${data.endDate}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Objeto del contrato
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.first.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(data.clauses.first.description, 10, yOffset, 180, 10);
    yOffset += 20;

    // Obligaciones del contratista
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.second.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    data.clauses.second.obligations.forEach((obligation, index) => {
      yOffset = addTextWithPageBreak(`${index + 1}. ${obligation}`, 15, yOffset, 180, 10);
    });
    yOffset += 10;

    // Obligaciones del contratante
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.third.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    data.clauses.third.obligations.forEach((obligation, index) => {
      yOffset = addTextWithPageBreak(`${index + 1}. ${obligation}`, 15, yOffset, 180, 10);
    });
    yOffset += 10;

    // Duración del contrato
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.fourth.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(data.clauses.fourth.duration, 15, yOffset, 180, 10);
    yOffset += 15;

    // Tarifas
    if (data.clauses.seventh) {
      doc.setFont('helvetica', 'bold');
      yOffset = addTextWithPageBreak(data.clauses.seventh.title, 10, yOffset, 180, 10);
      doc.setFont('helvetica', 'normal');
      yOffset = addTextWithPageBreak(`Se establecen las siguientes tarifas por sedes y tipos de residuos:`, 15, yOffset, 180, 10);
      yOffset += 10;

      // Crear tabla de tarifas usando autoTable
      const tableData = Object.entries(data.clauses.seventh.rates).flatMap(([sede, rates]) =>
        rates.map(rate => [sede, rate.municipality, rate.residues, rate.treatment, rate.price])
      );

      doc.autoTable({
        startY: yOffset,
        head: [['SEDE', 'MUNICIPIO', 'RESIDUOS', 'TRATAMIENTO', 'PRECIO']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 10 },
      });

      // Ajustar el offset después de la tabla
      yOffset = doc.lastAutoTable.finalY + 10;

      // Información adicional sobre tarifas
      if (data.clauses.seventh.additionalInfo) {
        data.clauses.seventh.additionalInfo.forEach(info => {
          yOffset = addTextWithPageBreak(info, 15, yOffset, 180, 10);
        });
      }
    }

    // Firmas
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(`Firmas:`, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(`CONTRATANTE: ${data.contractedSignature.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`CONTRATISTA: ${data.contractorSignature.name}`, 10, yOffset, 180, 10);
  }

  // Guardar el PDF
  doc.save('Contrato_General.pdf');
};

export const generateHospitalContractPDF = () => {
  const doc = new jsPDF();
  const data = combinedContractDataHospitalarioMock;

  if (data) {
    let yOffset = 10;

    // Función para agregar texto con salto de página automático
    const addTextWithPageBreak = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const pageHeight = doc.internal.pageSize.height;
      const splitText = doc.splitTextToSize(text, maxWidth);

      splitText.forEach((line: string) => {
        if (y >= pageHeight - 10) {
          doc.addPage();
          y = 10; // Reiniciar la posición Y en la nueva página
        }
        doc.text(line, x, y);
        y += lineHeight;
      });

      return y;
    };

    // Encabezado
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.contractNumber, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(data.contractType, 10, yOffset, 180, 10);
    yOffset += 10;

    // Información del contratista
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(`CONTRATISTA: ${data.contractor.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`NIT: ${data.contractor.nit}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`REPRESENTANTE LEGAL: ${data.contractor.legalRepresentative}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DIRECCIÓN: ${data.contractor.address}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`TELÉFONO: ${data.contractor.phone}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`E-MAIL: ${data.contractor.email}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Información del contratante
    yOffset = addTextWithPageBreak(`CONTRATANTE: ${data.contracted.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`NIT: ${data.contracted.nit}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`REPRESENTANTE LEGAL: ${data.contracted.legalRepresentative}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`C.C. No. ${data.contracted.idNumber}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DIRECCIÓN: ${data.contracted.address}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`MUNICIPIO: ${data.contracted.municipio}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`DEPARTAMENTO: ${data.contracted.department}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`TELÉFONO: ${data.contracted.phone}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`E-MAIL: ${data.contracted.email}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Fechas
    yOffset = addTextWithPageBreak(`FECHA INICIO: ${data.startDate}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`FECHA TERMINACIÓN: ${data.endDate}`, 10, yOffset, 180, 10);
    yOffset += 15;

    // Objeto del contrato
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.first.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(data.clauses.first.description, 10, yOffset, 180, 10);
    yOffset += 20;

    // Obligaciones del contratista
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.second.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    data.clauses.second.obligations.forEach((obligation, index) => {
      yOffset = addTextWithPageBreak(`${index + 1}. ${obligation}`, 15, yOffset, 180, 10);
    });
    yOffset += 10;

    // Obligaciones del contratante
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.third.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    data.clauses.third.obligations.forEach((obligation, index) => {
      yOffset = addTextWithPageBreak(`${index + 1}. ${obligation}`, 15, yOffset, 180, 10);
    });
    yOffset += 10;

    // Duración del contrato
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(data.clauses.fourth.title, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(data.clauses.fourth.duration, 15, yOffset, 180, 10);
    yOffset += 15;

    // Tarifas
    if (data.clauses.seventh) {
      doc.setFont('helvetica', 'bold');
      yOffset = addTextWithPageBreak(data.clauses.seventh.title, 10, yOffset, 180, 10);
      doc.setFont('helvetica', 'normal');
      yOffset = addTextWithPageBreak(`Se establecen las siguientes tarifas por sedes y tipos de residuos:`, 15, yOffset, 180, 10);
      yOffset += 10;

      // Crear tabla de tarifas usando autoTable
      const tableData = Object.entries(data.clauses.seventh.rates).flatMap(([sede, rates]) =>
        rates.map(rate => [sede, rate.municipality, rate.residues, rate.treatment, rate.price])
      );

      doc.autoTable({
        startY: yOffset,
        head: [['SEDE', 'MUNICIPIO', 'RESIDUOS', 'TRATAMIENTO', 'PRECIO']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 10 },
      });

      // Ajustar el offset después de la tabla
      yOffset = doc.lastAutoTable.finalY + 10;

      // Información adicional sobre tarifas
      if (data.clauses.seventh.additionalInfo) {
        data.clauses.seventh.additionalInfo.forEach(info => {
          yOffset = addTextWithPageBreak(info, 15, yOffset, 180, 10);
        });
      }
    }

    // Firmas
    doc.setFont('helvetica', 'bold');
    yOffset = addTextWithPageBreak(`Firmas:`, 10, yOffset, 180, 10);
    doc.setFont('helvetica', 'normal');
    yOffset = addTextWithPageBreak(`CONTRATANTE: ${data.contractedSignature.name}`, 10, yOffset, 180, 10);
    yOffset = addTextWithPageBreak(`CONTRATISTA: ${data.contractorSignature.name}`, 10, yOffset, 180, 10);
  }

  // Guardar el PDF
  doc.save('Contrato_Hospitalario.pdf');
};