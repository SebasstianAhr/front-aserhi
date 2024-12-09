import { EmployeesData } from '../core/mocks/mock-data-employees';

export const getEmployees = () => {
  return EmployeesData;
};

export const addEmployee = (newEmployee: Record<string, any>) => {
  const isDuplicate = EmployeesData.some(emp => emp.identificacion === newEmployee.identificacion);

  if (isDuplicate) {
    return null; 
  }

  const newId = (EmployeesData.length + 1).toString();  
  const employeeWithId = { ...newEmployee, id: newId };
  EmployeesData.push(employeeWithId); 
  return employeeWithId; 
};

export const getEmployeeById = (id: string) => {
  const employee = EmployeesData.find(emp => emp.id === id);
  return employee || null;
};
