import { getEmployees, addEmployee, getEmployeeById, updateEmployee } from '../../../services/employees.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import SearchFilter from '../../../components/search-filter/search-filter';
import ModalGeneral from '../../../components/modal-general/modal-general';
import GeneralForm from '../../../components/form-general/form-general';
import { formFields } from '../../../core/utils/user-template.util';
import { useEffect, useState, useCallback } from 'react';
import './employees.css';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';

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
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [employeeToAdd, setEmployeeToAdd] = useState<Record<string, any> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Record<string, any> | null>(null);
  
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

  const handleFormSubmit = useCallback((data: Record<string, any>) => {
    setEmployeeToAdd(data); 
    setShowAlertRegister(true);
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

  const handleEditFormSubmit = useCallback((data: Record<string, any>) => {
    setEmployeeToEdit(data);
    setShowAlertEdit(true);
  }, []);

  const handleAlertEditCancel = useCallback(() => {
    setShowAlertEdit(false);
    setEmployeeToEdit(null);
    setModalEditItem(false);
  }, []);

  const handleAlertEditContinue = useCallback(async () => {
    if (employeeToEdit) {
      try {
        const updatedEmployee = await updateEmployee(employeeToEdit);
        if (updatedEmployee) {
          setEmployees((prevEmployees) =>
            prevEmployees.map(emp =>
              emp.id === updatedEmployee.id ? updatedEmployee : emp
            )
          );
          setToastMessage('Empleado editado con éxito');
          setToastVariant('success');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          setShowAlertEdit(false);
          setEmployeeToEdit(null);
          setModalEditItem(false);
        } else {
          setToastMessage('Error al editar empleado.');
          setToastVariant('danger');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          setShowAlertEdit(false);
        }
      } catch (error) {
        console.error("Error al editar el empleado:", error);
        setToastMessage('Error al editar el empleado.');
        setToastVariant('danger');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertEdit(false);
      }
    }
  }, [employeeToEdit]);

  const handleAlertCancel = useCallback(() => {
    setShowAlertRegister(false);
    setEmployeeToAdd(null); 
    setModalAddForm(false); 
  }, []);
  
  const handleAlertContinue = useCallback(async () => {
    if (employeeToAdd) {
      try {
        const newEmployee = await addEmployee(employeeToAdd);
  
        if (newEmployee) {
          setEmployees((prevEmployees) => {
            const isDuplicate = prevEmployees.some(emp => emp.identificacion === newEmployee.identificacion);
            if (isDuplicate) {
              setToastMessage('El empleado ya existe.');
              setToastVariant('danger');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
              setShowAlertRegister(false);
              return prevEmployees;
            }
            return [...prevEmployees, newEmployee];
          });
          setToastMessage('Empleado agregado');
          setToastVariant('success');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          setShowAlertRegister(false);
          setEmployeeToAdd(null);
          setModalAddForm(false);
        } else {
          setToastMessage('Error al agregar empleado.');
          setToastVariant('danger');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
          setShowAlertRegister(false);
        }
      } catch (error) {
        if (error.message === 'DUPLICATE_EMPLOYEE') {
          setToastMessage('El empleado ya existe.');
        } else {
          setToastMessage('Error al registrar el empleado.');
        }
        setToastVariant('danger');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertRegister(false);
      }
    }
  }, [employeeToAdd]);
  
  useEffect(() => {
    return () => {
      setShowAlertRegister(false);
    };
  }, []);

  return (
    <div className='employees'>
      <h1 className='employees__title'>Gestión de Empleados</h1>
      {showToast && <Toast variantAlert={toastVariant} message={toastMessage} show={showToast} />}
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
      {showAlertRegister && (
        <Alert
          message="¿Está seguro de que desea agregar este empleado?"
          onCancel={handleAlertCancel}
          onContinue={handleAlertContinue}
        />
      )}
      {showAlertEdit && (
        <Alert
          message="¿Está seguro de que desea editar este empleado?"
          onCancel={handleAlertEditCancel}
          onContinue={handleAlertEditContinue}
        />
      )}
    </div>
  );
};

export default Employees;
