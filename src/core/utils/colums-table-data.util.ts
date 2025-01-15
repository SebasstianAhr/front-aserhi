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

export const columnsManagementProposals = [
  { item: 'id', label: 'ID' },
  { item: 'razonSocial', label: 'Razón Social' },
  { item: 'nombreSolicitante', label: 'Nombre Solicitante' },
  { item: 'fechaPropuesta', label: 'Fecha Propuesta' },
  { item: 'estadoRevision', label: 'Estado Revisión' },
  { item: 'estadoPropuesta', label: 'Estado Propuesta' },
  { item: 'acciones', label: 'Acciones' },
];

export const columsPotentialCustomersInManagementProposals = [
  { item: 'id', label: 'ID' },
  { item: 'fecha', label: 'Fecha' },
  { item: 'razonSocial', label: 'Razón Social' },
  { item: 'nitEmpresa', label: 'NIT' },
  { item: 'nombreCompleto', label: 'Nombres' },
  { item: 'accion', label: 'Acción' }
];

export const columsHistoryManagementProposals = [
  {item: 'fechaPropuesta', label: 'Fecha'},
  {item: 'id', label: 'Propuesta'},
  {item: 'empleado', label: 'Empleado'},
  {item: 'observacion', label: 'Observación'},
  {item: 'accion', label: 'Acción'},
]