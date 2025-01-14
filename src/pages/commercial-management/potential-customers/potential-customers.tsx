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

  const renderPotentialCustomerActions = (row: PotentialCustomerFormInputs) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => handleViewPotentialCustomer(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
      <svg
        className='icon__action icon__action--edit'
        onClick={() => handleEditPotentialCustomer(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
    </div>
  );

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
          renderActions={renderPotentialCustomerActions}
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