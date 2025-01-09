import { getPotentialCustomerById, addPotentialCustomer, updatePotentialCustomer } from '../../../services/potential-customers.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import { columnsPotentialCustomers } from '../../../core/utils/colums-table-data.util'; 
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import GeneralForm from '../../../components/form-general/form-general';
import usePotentialCustomers from '../../../hooks/potential-customers.hook/usePotentialCustomers';
import { potentialCustomerFields } from '../../../core/utils/potential-customers-template.util';
import useToast from '../../../hooks/potential-customers.hook/useToast';
import useModal from '../../../hooks/potential-customers.hook/useModal';
import { useCallback, useState, useEffect } from 'react';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';
import './potential-customers.css';
import { PotentialCustomerFormInputs } from '../../../core/interface/potential-customer.interface';
import { fieldFilterPotentialCustomer } from '../../../core/utils/field-filter.util';

const PotentialCustomers = (): JSX.Element => {
  const {
    potentialCustomers,
    filteredPotentialCustomers,
    setFilteredPotentialCustomers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = usePotentialCustomers();

  const modalAddForm = useModal();
  const modalViewItem = useModal();
  const modalEditItem = useModal();
  const { showToast, toastMessage, toastVariant, showToastMessage } = useToast();

  const [selectedPotentialCustomer, setSelectedPotentialCustomer] = useState<PotentialCustomerFormInputs | null>(null);
  const [potentialCustomerToAdd, setPotentialCustomerToAdd] = useState<Record<string, any> | null>(null);
  const [potentialCustomerToEdit, setPotentialCustomerToEdit] = useState<Record<string, any> | null>(null);
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [showAlertEdit, setShowAlertEdit] = useState(false);

  const handleFormSubmit = useCallback((data: Record<string, any>) => {
    setPotentialCustomerToAdd(data);
    setShowAlertRegister(true);
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filteredData = [...potentialCustomers];

    if (filters.search) {
      filteredData = filteredData.filter(customer =>
        customer.nombresRepresentanteLegal.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.tipoPersona && filters.tipoPersona !== "all") {
      filteredData = filteredData.filter(customer =>
        customer.tipoPersona === filters.tipoPersona
      );
    }

    if (filters.tamanoClientePotencial && filters.tamanoClientePotencial !== "all") {
      filteredData = filteredData.filter(customer =>
        customer.tamanoClientePotencial === filters.tamanoClientePotencial
      );
    }

    setFilteredPotentialCustomers(filteredData);
  };

  const handleViewPotentialCustomer = async (id: string) => {
    const customer = await getPotentialCustomerById(id);
    if (customer) {
      setSelectedPotentialCustomer(customer);
      modalViewItem.toggleModal();
    }
  };

  const handleEditPotentialCustomer = async (id: string) => {
    const customer = await getPotentialCustomerById(id);
    if (customer) {
      setSelectedPotentialCustomer(customer);
      modalEditItem.toggleModal();
    }
  };

  const handleEditFormSubmit = useCallback((data: Record<string, any>) => {
    setPotentialCustomerToEdit(data);
    setShowAlertEdit(true);
  }, []);

  const handleAlertEditCancel = useCallback(() => {
    setShowAlertEdit(false);
    setPotentialCustomerToEdit(null);
    modalEditItem.toggleModal();
  }, [modalEditItem]);

  const handleAlertEditContinue = useCallback(async () => {
    if (potentialCustomerToEdit) {
      try {
        const updatedCustomer = await updatePotentialCustomer(potentialCustomerToEdit);
        if (updatedCustomer) {
          setPotentialCustomers((prevCustomers) =>
            prevCustomers.map(cust =>
              cust.id === updatedCustomer.id ? updatedCustomer : cust
            )
          );
          showToastMessage('Cliente potencial editado con éxito', 'success');
          setShowAlertEdit(false);
          setPotentialCustomerToEdit(null);
          modalEditItem.toggleModal();
        } else {
          showToastMessage('Error al editar cliente potencial.', 'danger');
          setShowAlertEdit(false);
        }
      } catch (error) {
        console.error("Error al editar el cliente potencial:", error);
        showToastMessage('Error al editar el cliente potencial.', 'danger');
        setShowAlertEdit(false);
      }
    }
  }, [potentialCustomerToEdit, showToastMessage]);

  const handleAlertCancel = useCallback(() => {
    setShowAlertRegister(false);
    setPotentialCustomerToAdd(null);
    modalAddForm.toggleModal();
  }, [modalAddForm]);

  const handleAlertContinue = useCallback(async () => {
    if (potentialCustomerToAdd) {
      try {
        const newCustomer = await addPotentialCustomer(potentialCustomerToAdd);

        if (newCustomer) {
          setPotentialCustomers((prevCustomers) => {
            const isDuplicate = prevCustomers.some(cust => cust.identificacionRepresentante === newCustomer.identificacionRepresentante);
            if (isDuplicate) {
              showToastMessage('El cliente potencial ya existe.', 'danger');
              setShowAlertRegister(false);
              return prevCustomers;
            }
            return [...prevCustomers, newCustomer];
          });
          showToastMessage('Cliente potencial agregado', 'success');
          setShowAlertRegister(false);
          setPotentialCustomerToAdd(null);
          modalAddForm.toggleModal();
        } else {
          showToastMessage('Error al agregar cliente potencial.', 'danger');
          setShowAlertRegister(false);
        }
      } catch (error) {
        if (error.message === 'DUPLICATE_CUSTOMER') {
          showToastMessage('El cliente potencial ya existe.', 'danger');
        } else {
          showToastMessage('Error al registrar el cliente potencial.', 'danger');
        }
        setShowAlertRegister(false);
      }
    }
  }, [potentialCustomerToAdd, showToastMessage, modalAddForm]);

  useEffect(() => {
    return () => {
      setShowAlertRegister(false);
    };
  }, []);

  return (
    <div className='potential-customers'>
      <h1 className='potential-customers__title'>Gestión de Clientes Potenciales</h1>
      {showToast && <Toast variantAlert={toastVariant} message={toastMessage} show={showToast} />}
      <div className='potential-customers__add-icon'>
        <svg
          onClick={modalAddForm.toggleModal}
          width={50}
          height={50}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="user-plus"
          className="svg-inline--fa fa-user-plus fa-xl potential-customers__icon-add"
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
      <div className='potential-customers__content potential-customers__content--search-filter'>
        <SearchFilter fieldsFilter={fieldFilterPotentialCustomer} onFilterChange={handleFilterChange} />
      </div>
      <div className='potential-customers__content potential-customers__content--table'>
        <TableDataContent<PotentialCustomerFormInputs>
          data={filteredPotentialCustomers}
          columns={columnsPotentialCustomers}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={handleViewPotentialCustomer}
          onEditEmployee={handleEditPotentialCustomer}
          enableSorting={true}
        />
      </div>
      <ModalGeneral
        openModal={modalAddForm.isOpen}
        closeModal={modalAddForm.toggleModal}
        title="Registro de clientes potenciales"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={potentialCustomerFields}
          onSubmit={handleFormSubmit}
          principalButtonForm="Registrar"
          showButtonSubmit={true}
          isRegisterMode={true}
        />
      </ModalGeneral>
      <ModalGeneral
        openModal={modalViewItem.isOpen}
        closeModal={modalViewItem.toggleModal}
        title="Detalle del cliente potencial"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={potentialCustomerFields}
          onSubmit={handleFormSubmit}
          showButtonSubmit={false}
          valueEmployees={selectedPotentialCustomer}
          isViewMode={true}
        />
      </ModalGeneral>
      <ModalGeneral
        openModal={modalEditItem.isOpen}
        closeModal={modalEditItem.toggleModal}
        title="Editar cliente potencial"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={potentialCustomerFields}
          onSubmit={handleEditFormSubmit}
          showButtonSubmit={true}
          principalButtonForm="Guardar Cambios"
          valueEmployees={selectedPotentialCustomer}
        />
      </ModalGeneral>
      {showAlertRegister && (
        <Alert
          message="¿Está seguro de que desea agregar este cliente potencial?"
          onCancel={handleAlertCancel}
          onContinue={handleAlertContinue}
        />
      )}
      {showAlertEdit && (
        <Alert
          message="¿Está seguro de que desea editar este cliente potencial?"
          onCancel={handleAlertEditCancel}
          onContinue={handleAlertEditContinue}
        />
      )}
    </div>
  );
};

export default PotentialCustomers;