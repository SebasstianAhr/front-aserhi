import { EmployeeFormInputs } from "../interface/employee.interface";

export const columnsEmployees = [
    { label: 'ID', item: 'id' as keyof EmployeeFormInputs },
    { label: 'Nombre', item: 'nombres' as keyof EmployeeFormInputs },
    { label: 'Apellido', item: 'apellidos' as keyof EmployeeFormInputs },
    { label: 'Teléfono', item: 'telefono' as keyof EmployeeFormInputs },
    { label: 'Identificación', item: 'identificacion' as keyof EmployeeFormInputs },
    { label: 'Cargo', item: 'cargo' as keyof EmployeeFormInputs },
    { label: 'Estado', item: 'estado' as keyof EmployeeFormInputs },
    { label: 'Acciones', item: 'acciones' as keyof EmployeeFormInputs },
  ];