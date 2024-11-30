import TableDataContent from '../../../components/table-data-content/table-data-content';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import { EmployeesData } from '../../../core/mocks/mock-data-employees';
import { useState } from 'react';
import './employees.css';
import FormGeneral from '../../../components/form-general/form-general';

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
  const employees = mapEmployeesData(EmployeesData);

  const [modalState, setModalState] = useState<boolean>(false)

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
        <FormGeneral />
      </ModalGeneral>
    </div>
  );
};

export default Employees;