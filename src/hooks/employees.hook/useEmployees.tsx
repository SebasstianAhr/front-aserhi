import { useState, useEffect } from 'react';
import { getEmployees } from '../../services/employees.services';

interface Employee {
  id: string;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  cargo: string;
  estado: boolean;
}

const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return {
    employees,
    filteredEmployees,
    setFilteredEmployees,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};

export default useEmployees;
