import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EmployeesData } from '../../core/mocks/mock-data-employees';

interface Employee {
  id: string;
  nombres: string;
  apellidos: string;
  tipoIdentificacion: string;
  identificacion: string;
  telefono: string;
  telefonoCorporativo: string;
  fechaNacimiento: string;
  direccion: string;
  municipio: string;
  eps: string;
  riesgosLaborales: string;
  fondoPensiones: string;
  area: string;
  cargo: string;
  perfil: string;
  fechaIngreso: string;
  estado: boolean;
  correo: string;
  password: string;
}

const generatePDF = (selectedEmployees: Employee[]) => {
  const doc = new jsPDF();
  const tableColumn = ["ID", "Nombres", "Apellidos", "Identificación", "Teléfono", "Correo"];
  const tableRows: string[][] = [];

  selectedEmployees.forEach(employee => {
    const employeeData = [
      employee.id,
      employee.nombres,
      employee.apellidos,
      employee.identificacion,
      employee.telefono,
      employee.correo,
    ];
    tableRows.push(employeeData);
  });

  doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
  doc.text("Lista de Empleados", 14, 15);
  doc.save(`empleados_${new Date().toISOString()}.pdf`);
};

const Downloads: React.FC = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>(EmployeesData);

  const handleSelectAll = () => {
    setSelectedEmployees(EmployeesData);
  };

  const handleSelectNone = () => {
    setSelectedEmployees([]);
  };

  const handleSelectEmployee = (id: string) => {
    const isSelected = selectedEmployees.some(employee => employee.id === id);
    if (isSelected) {
      setSelectedEmployees(selectedEmployees.filter(employee => employee.id !== id));
    } else {
      const employee = EmployeesData.find(employee => employee.id === id);
      if (employee) {
        setSelectedEmployees([...selectedEmployees, employee]);
      }
    }
  };

  return (
    <div>
      <h1>Descargar Lista de Empleados</h1>
      <button onClick={() => generatePDF(selectedEmployees)}>Descargar PDF</button>
      <button onClick={handleSelectAll}>Seleccionar Todos</button>
      <button onClick={handleSelectNone}>Deseleccionar Todos</button>
      <ul>
        {EmployeesData.map(employee => (
          <li key={employee.id}>
            <input
              type="checkbox"
              checked={selectedEmployees.some(e => e.id === employee.id)}
              onChange={() => handleSelectEmployee(employee.id)}
            />
            {employee.nombres} {employee.apellidos}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Downloads;