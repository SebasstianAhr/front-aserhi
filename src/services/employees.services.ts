import { EmployeesData } from '../core/mocks/mock-data-employees';

export const getEmployees = () => {
  return EmployeesData;
};

export const addEmployee = (newEmployee: Record<string, any>) => {
  const isDuplicate = EmployeesData.some(emp => emp.identificacion === newEmployee.identificacion);

  if (isDuplicate) {
    throw new Error('DUPLICATE_EMPLOYEE');
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

export const updateEmployee = (updatedEmployee: Record<string, any>) => {
  const index = EmployeesData.findIndex(emp => emp.id === updatedEmployee.id);
  if (index !== -1) {
    EmployeesData[index] = { ...EmployeesData[index], ...updatedEmployee };
    return EmployeesData[index];
  }
  return null;
};
