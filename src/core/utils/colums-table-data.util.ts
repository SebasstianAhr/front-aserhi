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
  { item: 'fechaPropuesta', label: 'Fecha' },
  { item: 'id', label: 'Propuesta' },
  { item: 'empleado', label: 'Empleado' },
  { item: 'observacion', label: 'Observación' },
  { item: 'accion', label: 'Acción' },
]

export const columsCharges = [
  { label: 'ID', item: 'id' as keyof Charge },
  { label: 'Cargo', item: 'cargo' as keyof Charge },
  { label: 'Descripción', item: 'descripcion' as keyof Charge },
  { label: 'Acciones', item: 'acciones' as keyof Charge },
]

export const columsRevisionProposals = [
  { label: 'ID', item: 'id' },
  { label: 'Razón Social', item: 'razonSocial' },
  { label: 'NIT', item: 'nitDV' },
  { label: 'Nombre Solicitante', item: 'nombreSolicitante' },
  { label: 'Fecha Propuesta', item: 'fechaPropuesta' },
  { label: 'Estado Revisión', item: 'estadoRevision' },
  { label: 'Acción', item: 'acciones' }
]

export  const columnsContractManagement = [
  { label: 'ID', item: 'id' },
  { label: 'Fecha de Inicio', item: 'fechaInicio' },
  { label: 'Contratante', item: 'contratante' },
  { label: 'Estado del Contrato', item: 'estadoContrato' },
  { label: 'Tipo de Contrato', item: 'topoContrato' },
  { label: 'Acción', item: 'acciones' },
];

export const columnsProfilePage = [
  { label: 'ID', item: 'id' },
  { label: 'Nombre', item: 'nombre' },
  { label: 'Acción', item: 'acciones' },
];

export   const columnsWasteManagement = [
  { label: 'ID', item: 'id' },
  { label: 'Tipo de Residuo', item: 'TipoResiduo' },
  { label: 'Corriente', item: 'corriente' },
  { label: 'Residuo', item: 'Residuo' },
  { label: 'Tratamiento', item: 'tratamiento' },
  { label: 'Acción', item: 'acciones' },
];

export   const columnsContractClauses = [
  { label: 'ID', item: 'id' },
  { label: 'Cláusula', item: 'clausula' },
  { label: 'Acción', item: 'acciones' },
];