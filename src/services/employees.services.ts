import { EmployeesData } from '../core/mocks/mock-data-employees';

export const getEmployees = () => {
  return EmployeesData;
};

export const addEmployee = (newEmployee: Record<string, any>) => {
  // Verifica si el empleado ya existe (por ejemplo, por identificador)
  const isDuplicate = EmployeesData.some(emp => emp.identificacion === newEmployee.identificacion);

  if (isDuplicate) {
    return null;  // Si es un duplicado, no se agrega
  }

  const newId = (EmployeesData.length + 1).toString();  // Genera un nuevo ID único
  const employeeWithId = { ...newEmployee, id: newId };
  EmployeesData.push(employeeWithId);  // Simula la adición de un empleado
  return employeeWithId;  // Devuelve el empleado agregado
};
