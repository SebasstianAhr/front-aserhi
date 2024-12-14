import { getEmployees, addEmployee, getEmployeeById, updateEmployee } from '../../../services/employees.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import SearchFilter from '../../../components/search-filter/search-filter';
import ModalGeneral from '../../../components/modal-general/modal-general';
import GeneralForm from '../../../components/form-general/form-general';
import { formFields } from '../../../core/utils/user-template.util';
import { useEffect, useState, useCallback } from 'react';
import './employees.css';
import Alert from '../../../components/alert/alert';

interface Employee {
  id: string;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  cargo: string;
  estado: boolean;
}

const Employees = (): JSX.Element => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalAddForm, setModalAddForm] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalViewItem, setModalViewItem] = useState<boolean>(false);
  const [modalEditItem, setModalEditItem] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [employeeToAdd, setEmployeeToAdd] = useState<Record<string, any> | null>(null);


  const fieldFilter = [
    {
      name: "search",
      label: "Buscar",
      type: "text" as "text",
      placeholder: "Buscar por nombre, apellido o identificación",
    },
    {
      name: "cargo",
      label: "Cargo",
      type: "select" as "select",
      options: [
        { label: "Super Administrador", value: "Super Administrador" },
        { label: "Conductor", value: "Conductor" },
        { label: "Ayudante de obra", value: "Ayudante de obra" },
      ],
    },
    {
      name: "estado",
      label: "Estado",
      type: "select" as "select",
      options: [
        { label: "Activo", value: "Activo" },
        { label: "Inactivo", value: "Inactivo" },
      ],
    },
  ];

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

  const columns = [
    { label: 'ID', item: 'id' as keyof Employee },
    { label: 'Nombre', item: 'nombres' as keyof Employee },
    { label: 'Apellido', item: 'apellidos' as keyof Employee },
    { label: 'Teléfono', item: 'telefono' as keyof Employee },
    { label: 'Identificación', item: 'identificacion' as keyof Employee },
    { label: 'Cargo', item: 'cargo' as keyof Employee },
    { label: 'Estado', item: 'estado' as keyof Employee },
    { label: 'Acciones', item: 'acciones' as keyof Employee },
  ];


  const handleFormSubmit = useCallback(async (data: Record<string, any>) => {
    console.log("Formulario enviado:", data);

    const newEmployee = await addEmployee(data);

    if (newEmployee) {
      setEmployees((prevEmployees) => {
        const isDuplicate = prevEmployees.some(emp => emp.identificacion === newEmployee.identificacion);
        if (isDuplicate) {
          console.log("Este empleado ya existe.");
        }
        return [...prevEmployees, newEmployee];
      });
    } else {
      console.log("Este empleado ya existe.");
    }

    setEmployeeToAdd(data);
    setShowAlert(true);
    setModalAddForm(false);
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filteredData = [...employees];

    if (filters.search) {
      filteredData = filteredData.filter(employee =>
        employee.nombres.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.apellidos.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.identificacion.includes(filters.search)
      );
    }

    if (filters.cargo && filters.cargo !== "all") {
      filteredData = filteredData.filter(employee =>
        employee.cargo === filters.cargo
      );
    }

    if (filters.estado && filters.estado !== "all") {
      filteredData = filteredData.filter(employee =>
        (filters.estado === "Activo" && employee.estado) ||
        (filters.estado === "Inactivo" && !employee.estado)
      );
    }

    setFilteredEmployees(filteredData);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
  };

  const handleViewEmployee = async (id: string) => {
    const employee = await getEmployeeById(id);
    if (employee) {
      setSelectedEmployee(employee);
      setModalViewItem(true);
    }
  };

  const handleEditEmployee = async (id: string) => {
    const employee = await getEmployeeById(id);
    if (employee) {
      setSelectedEmployee(employee);
      setModalEditItem(true);
    }
  };

  const handleEditFormSubmit = async (data: Record<string, any>) => {
    const updatedEmployee = await updateEmployee(data);
    if (updatedEmployee) {
      setEmployees((prevEmployees) =>
        prevEmployees.map(emp =>
          emp.id === updatedEmployee.id ? updatedEmployee : emp
        )
      );
      setModalEditItem(false);
    } else {
      console.log("Error updating employee.");
    }
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
    setEmployeeToAdd(null);
  };

  const handleAlertContinue = async () => {
    if (employeeToAdd) {
      const newEmployee = await addEmployee(employeeToAdd);

      if (newEmployee) {
        setEmployees((prevEmployees) => {
          const isDuplicate = prevEmployees.some(emp => emp.identificacion === newEmployee.identificacion);
          if (isDuplicate) {
            console.log("Este empleado ya existe.");
          }
          return [...prevEmployees, newEmployee];
        });
      } else {
        console.log("Este empleado ya existe.");
      }
    }

    setShowAlert(false);
    setEmployeeToAdd(null);
    setModalAddForm(false);
  };

  useEffect(() => {
    return () => {
      setShowAlert(false);
    };
  }, []);




  return (
    <div className='employees'>
      <h1 className='employees__title'>Gestión de Empleados</h1>
      <div className='employees__add-icon'>
        <svg
          onClick={() => setModalAddForm(!modalAddForm)}
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
        <SearchFilter fieldsFilter={fieldFilter} onFilterChange={handleFilterChange} />
      </div>
      <div className='employees__content employees__content--table'>
        <TableDataContent<Employee>
          data={filteredEmployees}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          onViewEmployee={handleViewEmployee}
          onEditEmployee={handleEditEmployee}
        />
      </div>
      <ModalGeneral
        openModal={modalAddForm}
        closeModal={setModalAddForm}
        title="Registro de empleados"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={formFields}
          onSubmit={handleFormSubmit}
          principalButtonForm="Registrar"
          showButtonSubmit={true}
          isRegisterMode={true}
        />
      </ModalGeneral>
      <ModalGeneral
        openModal={modalViewItem}
        closeModal={setModalViewItem}
        title="Detalle del empleado"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={formFields}
          onSubmit={handleFormSubmit}
          showButtonSubmit={false}
          valueEmployees={selectedEmployee}
          isViewMode={true}
        />
      </ModalGeneral>
      <ModalGeneral
        openModal={modalEditItem}
        closeModal={setModalEditItem}
        title="Editar empleado"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={formFields}
          onSubmit={handleEditFormSubmit}
          showButtonSubmit={true}
          principalButtonForm="Guardar Cambios"
          valueEmployees={selectedEmployee}
        />
      </ModalGeneral>
      {showAlert && (
        <Alert
          message="¿Está seguro de que desea agregar este empleado?"
          onCancel={handleAlertCancel}
          onContinue={handleAlertContinue}
        />
      )}
    </div>
  );
};

export default Employees;
