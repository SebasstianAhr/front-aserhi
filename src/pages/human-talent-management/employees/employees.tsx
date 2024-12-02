import TableDataContent from '../../../components/table-data-content/table-data-content';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import { EmployeesData } from '../../../core/mocks/mock-data-employees';
import GeneralForm from '../../../components/form-general/form-general';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './employees.css';

type Employee = {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  identificacion: string;
  cargo: string;
  estado: boolean;
};

const mapEmployeesData = (data: typeof EmployeesData): Employee[] => {
  return data.map((employee) => ({
    id: employee.id,
    nombre: employee.nombres,
    apellido: employee.apellidos,
    telefono: employee.telefono,
    identificacion: employee.identificacion,
    cargo: employee.cargo,
    estado: employee.estado,
  }));
};

const columns = [
  { label: 'ID', item: 'id' as keyof Employee },
  { label: 'Nombre', item: 'nombre' as keyof Employee },
  { label: 'Apellido', item: 'apellido' as keyof Employee },
  { label: 'Teléfono', item: 'telefono' as keyof Employee },
  { label: 'Identificación', item: 'identificacion' as keyof Employee },
  { label: 'Cargo', item: 'cargo' as keyof Employee },
  { label: 'Estado', item: 'estado' as keyof Employee },
];

const Employees = (): JSX.Element => {

  const [employees, setEmployees] = useState<Employee[]>(mapEmployeesData(EmployeesData));

  const [modalState, setModalState] = useState<boolean>(false);

  const formFields = [
    { name: 'nombres', label: 'Nombre(s)', type: 'text' as 'text', placeholder: 'Ingrese los nombre(s)', required: true },
    { name: 'apellidos', label: 'Apellido(s)', type: 'text' as 'text', placeholder: 'Ingrese los apellido(s)', required: true },
    {
      name: 'tipoIdentificacion', label: 'Tipo de Identificación', type: 'select' as 'select', options: [
        { label: 'Cédula de Ciudadanía', value: 'Cédula de Ciudadanía' },
        { label: 'Cédula de Extranjería', value: 'Cédula de Extranjería' },
        { label: 'Pasaporte', value: 'Pasaporte' }
      ], required: true
    },
    { name: 'identificacion', label: 'Identificación', type: 'text' as 'text', placeholder: 'Ingrese la identificación', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel' as 'tel', placeholder: 'Ingrese el teléfono', required: true },
    { name: 'telefonoCorporativo', label: 'Teléfono Corporativo', type: 'tel' as 'tel', placeholder: 'Ingrese el teléfono corporativo', required: false },
    { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' as 'date', placeholder: 'Ingrese la fecha de nacimiento (YYYY-MM-DD)', required: true },
    { name: 'direccion', label: 'Dirección', type: 'text' as 'text', placeholder: 'Ingrese la dirección', required: true },
    { name: 'municipio', label: 'Municipio', type: 'text' as 'text', placeholder: 'Ingrese el municipio', required: true },
    {
      name: 'eps', label: 'EPS', type: 'select' as 'select', options: [
        { label: 'Sanitas', value: 'Sanitas' },
        { label: 'Compensar', value: 'Compensar' }
      ], required: true
    },
    {
      name: 'riesgosLaborales', label: 'Riesgos Laborales', type: 'select' as 'select', options: [
        { label: 'Aseguradora de riesgos laborales en Popayán', value: 'Aseguradora de riesgos laborales en Popayán' },
        { label: 'Positiva', value: 'Positiva' }
      ], required: true
    },
    {
      name: 'fondoPensiones', label: 'Fondo de Pensiones', type: 'select' as 'select', options: [
        { label: 'Colpensiones', value: 'Colpensiones' },
        { label: 'Porvenir', value: 'Porvenir' },
        { label: 'Colfondos', value: 'Colfondos' },
        { label: 'Protección', value: 'Protección' }
      ], required: true
    },
    {
      name: 'area', label: 'Área', type: 'select' as 'select', options: [
        { label: 'Administración', value: 'Administración' },
        { label: 'Ruta', value: 'Ruta' },
        { label: 'Planta', value: 'Planta' },
        { label: 'Aprovechamiento', value: 'Aprovechamiento' }
      ], required: true
    },
    {
      name: 'cargo', label: 'Cargo', type: 'select' as 'select', options: [
        { label: 'Super Administrador', value: 'Super Administrador' },
        { label: 'Contador', value: 'Contador' },
        { label: 'Ayudante de obra', value: 'Ayudante de obra' },
        { label: 'Contratista operario soldador armador', value: 'Contratista operario soldador armador' },
        { label: 'Directora administrativa y financiera', value: 'Directora administrativa y financiera' },
        { label: 'Profesional de gestión ambiental y capacitación', value: 'Profesional de gestión ambiental y capacitación' },
        { label: 'Coordinador de gestión del talento humano', value: 'Coordinador de gestión del talento humano' },
        { label: 'Coordinador operativo', value: 'Coordinador operativo' },
        { label: 'Coordinador SGSST', value: 'Coordinador SGSST' },
        { label: 'Aprendiz SENA', value: 'Aprendiz SENA' },
        { label: 'Coordinador de producción', value: 'Coordinador de producción' },
        { label: 'Auxiliar de mantenimiento', value: 'Auxiliar de mantenimiento' },
        { label: 'Contratista profesional SGSST', value: 'Contratista profesional SGSST' },
        { label: 'Operario de aprovechamiento', value: 'Operario de aprovechamiento' },
        { label: 'Coordinador del sistema de gestión integrado', value: 'Coordinador del sistema de gestión integrado' },
        { label: 'Operario de planta', value: 'Operario de planta' },
        { label: 'Asistente de facturación y cartera', value: 'Asistente de facturación y cartera' },
        { label: 'Conductor', value: 'Conductor' },
        { label: 'Asistente comercial', value: 'Asistente comercial' },
        { label: 'Auxiliar de ruta', value: 'Auxiliar de ruta' },
        { label: 'Consultor Ambiental', value: 'Consultor Ambiental' }
      ], required: true
    },
    {
      name: 'perfil', label: 'Perfil', type: 'select' as 'select', options: [
        { label: 'Administrador', value: 'Administrador' },
        { label: 'Gestión Comercial', value: 'Gestión Comercial' },
        { label: 'Talento Humano', value: 'Talento Humano' }
      ], required: true
    },
    { name: 'fechaIngreso', label: 'Fecha de Ingreso', type: 'date' as 'date', placeholder: 'Ingrese la fecha de ingreso (YYYY-MM-DD)', required: true },
    {
      name: 'estado', label: 'Estado', type: 'select' as 'select', options: [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' }
      ], required: true
    },
    { name: 'correo', label: 'Correo Electrónico', type: 'email' as 'email', placeholder: 'Ingrese el correo electrónico', required: true },
    { name: 'password', label: 'Contraseña', type: 'password' as 'password', placeholder: 'Ingrese la contraseña', required: true }
  ];



  const handleFormSubmit = (data: any) => {
    console.log('Datos del formulario:', data);

    // Crear el nuevo empleado con los datos del formulario
    const newEmployee: Employee = {
      id: (employees.length + 1).toString(),  // Generar un nuevo ID, en una app real lo generarías en el backend
      nombre: data.nombres,
      apellido: data.apellidos,
      telefono: data.telefono,
      identificacion: data.identificacion,
      cargo: data.cargo,
      estado: data.estado === 'Activo'  // Convertir el valor de 'Activo' a un booleano
    };

    // Agregar el nuevo empleado al estado
    setEmployees([...employees, newEmployee]);

    // Cerrar el modal
    setModalState(false);
  };


  return (
    <div className='employees'>
      <h1 className='employees__title'>Gestión de Empleados</h1>
      <div className='employees__add-icon'>
        <h3>Agregar</h3>
        <svg
          onClick={() => setModalState(!modalState)}
          width={50}
          height={50}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="user-plus"
          className="svg-inline--fa fa-user-plus fa-xl employees__icon-add"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
          />
        </svg>
      </div>
      <div className='employees__content employees__content--search-filter'>
        <SearchFilter />
      </div>
      <div className='employees__content employees__content--table'>
        <TableDataContent<Employee> data={employees} columns={columns} />
      </div>
      <ModalGeneral
        openModal={modalState}
        closeModal={setModalState}
        title="Registro de empleados"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm fields={formFields} onSubmit={handleFormSubmit} principalButton='Agregar Empleado' />
      </ModalGeneral>
    </div>
  );
};

export default Employees;