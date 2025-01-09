import { EmployeeFormInputs } from "../interface/employee.interface";
import { PotentialCustomerFormInputs } from "../interface/potential-customer.interface";

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

export const columnsPotentialCustomers = [
  { label: 'ID', item: 'id' as keyof PotentialCustomerFormInputs },
  { label: 'Tipo de persona', item: 'tipoPersona' as keyof PotentialCustomerFormInputs },
  { label: 'Nombre', item: 'nombresRepresentanteLegal' as keyof PotentialCustomerFormInputs },
  { label: 'Razón social', item: 'razonSocial' as keyof PotentialCustomerFormInputs },
  { label: 'Teléfono', item: 'telefonoContacto' as keyof PotentialCustomerFormInputs },
  { label: 'Correo electrónico', item: 'correoElectronicoContacto' as keyof PotentialCustomerFormInputs },
  { label: 'Acciones', item: 'acciones' as keyof PotentialCustomerFormInputs },
];