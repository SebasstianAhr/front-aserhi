import { getEmployeeById, addEmployee, updateEmployee } from '../../../services/employees.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import { EmployeeFormInputs } from '../../../core/interface/employee.interface';
import { columnsEmployees } from '../../../core/utils/colums-table-data.util';
import { fieldFilterEmployee } from '../../../core/utils/field-filter.util';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import GeneralForm from '../../../components/form-general/form-general';
import useEmployees from '../../../hooks/employees.hook/useEmployees';
import { formFields } from '../../../core/utils/user-template.util';
import { EmployeeEnum } from '../../../core/enum/employee.enum';
import useToast from '../../../hooks/employees.hook/useToast';
import useModal from '../../../hooks/employees.hook/useModal';
import { useCallback, useState, useEffect } from 'react';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';
import './employees.css';
import { ToastEnum } from '../../../core/enum/toast.enum';



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

    if (filters.cargo && filters.cargo !== EmployeeEnum.All) {
      filteredData = filteredData.filter(employee =>
        employee.cargo === filters.cargo
      );
    }

    if (filters.estado && filters.estado !== EmployeeEnum.All) {
      filteredData = filteredData.filter(employee =>
        (filters.estado === EmployeeEnum.Activo && employee.estado) ||
        (filters.estado === EmployeeEnum.Inactivo && !employee.estado)
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
          showToastMessage('Empleado editado con éxito', ToastEnum.Success);
          setShowAlertEdit(false);
          setEmployeeToEdit(null);
          modalEditItem.toggleModal();
        } else {
          showToastMessage('Error al editar empleado.', ToastEnum.Danger);
          setShowAlertEdit(false);
        }
      } catch (error) {
        console.error("Error al editar el empleado:", error);
        showToastMessage('Error al editar el empleado.', ToastEnum.Danger);
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
              showToastMessage('El empleado ya existe.', ToastEnum.Danger);
              setShowAlertRegister(false); 
              return prevEmployees;
            }
            return [...prevEmployees, newEmployee];
          });
          showToastMessage('Empleado agregado correctamente.', ToastEnum.Success);
          modalAddForm.toggleModal();
        }
      } catch (error) {
        if (error.message === 'DUPLICATE_EMPLOYEE') {
          showToastMessage('El empleado ya existe.', ToastEnum.Danger);
        } else {
          console.error('Error al registrar empleado:', error);
          showToastMessage('Ocurrió un error inesperado al registrar el empleado.', ToastEnum.Danger);
        }
      } finally {
        setShowAlertRegister(false);
        setEmployeeToAdd(null);
      }
    }
  }, [employeeToAdd, showToastMessage, modalAddForm]);
  




  useEffect(() => {
    return () => {
      setShowAlertRegister(false);
    };
  }, []);

  const renderEmployeeActions = (row: EmployeeFormInputs) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => handleViewEmployee(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
      <svg
        className='icon__action icon__action--edit'
        onClick={() => handleEditEmployee(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
    </div>
  );

  return (
    <div className='employees'>
      <h1 className='employees__title'>Gestión de Empleados</h1>
      {showToast && <Toast variantAlert={toastVariant} message={toastMessage} show={showToast} />}
      <div className='employees__add-icon'>
        <svg
          onClick={modalAddForm.toggleModal}
          width={44}
          height={44}
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
          renderActions={renderEmployeeActions}
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
