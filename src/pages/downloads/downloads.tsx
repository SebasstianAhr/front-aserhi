import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { getEmployees } from '../../services/employees.services';
import SearchFilter from '../../components/search-filter/search-filter';
import ItemsPerPageSelector from '../../components/items-per-page-selector/items-per-page-selector';
import { Employee } from '../../core/interface/employee.interface';
import './downloads.css';
import Pagination from '../../components/pagination.tsx/pagination';

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

const Downloads = ():JSX.Element => {
  const selectAllByDefault = false;
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getEmployees();
      setEmployees(data);
      if (selectAllByDefault) {
        setSelectedEmployees(data);
      }
    };

    fetchEmployees();
  }, [selectAllByDefault]);

  const handleSelectAll = () => {
    setSelectedEmployees(employees);
  };

  const handleSelectNone = () => {
    setSelectedEmployees([]);
  };

  const handleSelectEmployee = (id: string) => {
    const isSelected = selectedEmployees.some(employee => employee.id === id);
    if (isSelected) {
      setSelectedEmployees(selectedEmployees.filter(employee => employee.id !== id));
    } else {
      const employee = employees.find(employee => employee.id === id);
      if (employee) {
        setSelectedEmployees([...selectedEmployees, employee]);
      }
    }
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };

  const filteredEmployees = employees.filter(employee => {
    return (
      (filters.nombres ? employee.nombres.toLowerCase().includes(filters.nombres.toLowerCase()) : true) &&
      (filters.apellidos ? employee.apellidos.toLowerCase().includes(filters.apellidos.toLowerCase()) : true)
    );
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => a.nombres.localeCompare(b.nombres));

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);
  const currentData = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fieldsFilter = [
    { name: "nombres", label: "Nombres", type: 'text', placeholder: "Buscar por nombres" },
    { name: "apellidos", label: "Apellidos", type: 'text', placeholder: "Buscar por apellidos" },
  ];

  return (
    <div className="downloads">
      <div className="downloads__header">
        <h1 className="downloads__title">Descargar Registro de Empleados</h1>
      </div>
      <SearchFilter fieldsFilter={fieldsFilter} onFilterChange={handleFilterChange} />
      <div className="downloads__buttons">
        <button
          className="downloads__button"
          onClick={() => generatePDF(selectedEmployees)}
          disabled={selectedEmployees.length === 0}
        >
          Descargar PDF
        </button>
        <button className="downloads__button" onClick={handleSelectAll}>Seleccionar Todos</button>
        <button className="downloads__button" onClick={handleSelectNone}>Deseleccionar Todos</button>
      </div>
      <div className='downloads__items-per-page'>
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
      <ul className="downloads__list">
        {currentData.map(employee => (  
          <li key={employee.id} className="downloads__list-item">
            <input
              type="checkbox"
              className="downloads__checkbox"
              checked={selectedEmployees.some(e => e.id === employee.id)}
              onChange={() => handleSelectEmployee(employee.id)}
            />
            {employee.nombres} {employee.apellidos}
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Downloads;