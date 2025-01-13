import { getEmployeeById, addEmployee, updateEmployee } from '../../../services/employees.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import { EmployeeFormInputs } from '../../../core/interface/employee.interface';
import { columnsEmployees } from '../../../core/utils/colums-table-data.util';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import GeneralForm from '../../../components/form-general/form-general';
import useEmployees from '../../../hooks/employees.hook/useEmployees';
import { formFields } from '../../../core/utils/user-template.util';
import { fieldFilterEmployee } from '../../../core/utils/field-filter.util';
import useToast from '../../../hooks/employees.hook/useToast';
import useModal from '../../../hooks/employees.hook/useModal';
import { useCallback, useState, useEffect } from 'react';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';
import './employees.css';



const Employees = (): JSX.Element => {
  const {
    employees,
    setEmployees, 
    filteredEmployees,
    setFilteredEmployees,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useEmployees();

  const modalAddForm = useModal();
  const modalViewItem = useModal();
  const modalEditItem = useModal();
  const { showToast, toastMessage, toastVariant, showToastMessage } = useToast();

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormInputs | null>(null);
  const [employeeToAdd, setEmployeeToAdd] = useState<Record<string, any> | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Record<string, any> | null>(null);
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);

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

  const handleViewEmployee = async (id: string) => {
    const employee = await getEmployeeById(id);
    if (employee) {
      setSelectedEmployee(employee);
      modalViewItem.toggleModal();
    }
  };

  const handleEditEmployee = async (id: string) => {
    const employee = await getEmployeeById(id);
    if (employee) {
      setSelectedEmployee(employee);
      modalEditItem.toggleModal();
    }
  };

  const handleEditFormSubmit = useCallback((data: Record<string, any>) => {
    setEmployeeToEdit(data);
    setShowAlertEdit(true);
  }, []);

  const handleAlertEditCancel = useCallback(() => {
    setShowAlertEdit(false);
    setEmployeeToEdit(null);
    modalEditItem.toggleModal();
  }, [modalEditItem]);

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
          showToastMessage('Empleado editado con éxito', 'success');
          setShowAlertEdit(false);
          setEmployeeToEdit(null);
          modalEditItem.toggleModal();
        } else {
          showToastMessage('Error al editar empleado.', 'danger');
          setShowAlertEdit(false);
        }
      } catch (error) {
        console.error("Error al editar el empleado:", error);
        showToastMessage('Error al editar el empleado.', 'danger');
        setShowAlertEdit(false);
      }
    }
  }, [employeeToEdit, showToastMessage]);

  const handleAlertCancel = useCallback(() => {
    setShowAlertRegister(false);
    setEmployeeToAdd(null);
    modalAddForm.toggleModal();
  }, [modalAddForm]);

  const handleAlertContinue = useCallback(async () => {
    if (employeeToAdd) {
      try {
        const newEmployee = await addEmployee(employeeToAdd);
  
        if (newEmployee) {
          setEmployees((prevEmployees) => {
            const isDuplicate = prevEmployees.some(emp => emp.identificacion === newEmployee.identificacion);
            if (isDuplicate) {
              showToastMessage('El empleado ya existe.', 'danger');
              setShowAlertRegister(false); 
              return prevEmployees;
            }
            return [...prevEmployees, newEmployee];
          });
          showToastMessage('Empleado agregado correctamente.', 'success');
          modalAddForm.toggleModal(); // Cierra el modal
        }
      } catch (error) {
        if (error.message === 'DUPLICATE_EMPLOYEE') {
          showToastMessage('El empleado ya existe.', 'danger');
        } else {
          console.error('Error al registrar empleado:', error);
          showToastMessage('Ocurrió un error inesperado al registrar el empleado.', 'danger');
        }
      } finally {
        setShowAlertRegister(false); // Asegura que la alerta se cierre siempre
        setEmployeeToAdd(null); // Resetea los datos
      }
    }
  }, [employeeToAdd, showToastMessage, modalAddForm]);
  




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
          onClick={modalAddForm.toggleModal}
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
        <SearchFilter fieldsFilter={fieldFilterEmployee} onFilterChange={handleFilterChange} />
      </div>
      <div className='employees__content employees__content--table'>
        <TableDataContent<EmployeeFormInputs>
          data={filteredEmployees}
          columns={columnsEmployees}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={handleViewEmployee}
          onEditEmployee={handleEditEmployee}
          enableSorting={true}
        />
      </div>
      <ModalGeneral
        openModal={modalAddForm.isOpen}
        closeModal={modalAddForm.toggleModal}
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
        openModal={modalViewItem.isOpen}
        closeModal={modalViewItem.toggleModal}
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
        openModal={modalEditItem.isOpen}
        closeModal={modalEditItem.toggleModal}
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
