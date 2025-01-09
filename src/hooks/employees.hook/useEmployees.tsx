import { useState, useEffect } from 'react';
import { getEmployees } from '../../services/employees.services';
import { EmployeeFormInputs } from '../../core/interface/employee.interface';


const useEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeFormInputs[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeFormInputs[]>([]);
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
