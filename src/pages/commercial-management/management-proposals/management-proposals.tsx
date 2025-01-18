import { useEffect, useState, useCallback } from 'react';
import { getProposals, addProposal } from '../../../services/management-proposals.services';
import { getPotentialCustomers } from '../../../services/potential-customers.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import SearchFilter from '../../../components/search-filter/search-filter';
import ModalGeneral from '../../../components/modal-general/modal-general';
import GeneralForm from '../../../components/form-general/form-general';
import Toast from '../../../components/toast/toast';
import Alert from '../../../components/alert/alert';
import './management-proposals.css';
import { fieldsFilterManagementProposals } from '../../../core/utils/field-filter.util';
import { columnsManagementProposals, columsHistoryManagementProposals, columsPotentialCustomersInManagementProposals } from '../../../core/utils/colums-table-data.util';

const ManagementProposals = (): JSX.Element => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [potentialCustomers, setPotentialCustomers] = useState<any[]>([]);
  const [showPotentialCustomersModal, setShowPotentialCustomersModal] = useState(false);
  const [showHistoryManagementProposalsModal, setShowHistoryManagementProposalsModal] = useState(false);
  const [showProposalFormModal, setShowProposalFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [toast, setToast] = useState<{ show: boolean, message: string, variant: 'success' | 'danger' }>({ show: false, message: '', variant: 'success' });
  const [alert, setAlert] = useState<{ show: boolean, message: string, onContinue: () => void }>({ show: false, message: '', onContinue: () => { } });

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposals();
        setProposals(data);
        setFilteredProposals(data);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    const fetchPotentialCustomers = async () => {
      try {
        const data = await getPotentialCustomers();
        setPotentialCustomers(data);
      } catch (error) {
        console.error("Failed to fetch potential customers:", error);
      }
    };

    fetchProposals();
    fetchPotentialCustomers();
  }, []);

  const handleFilterChange = useCallback((filters: Record<string, any>) => {
    let filteredData = [...proposals];

    if (filters.search) {
      filteredData = filteredData.filter(proposal =>
        proposal.razonSocial.toLowerCase().includes(filters.search.toLowerCase()) ||
        proposal.nombreSolicitante.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.fechaPropuestaDesde && filters.fechaPropuestaHasta) {
      filteredData = filteredData.filter(proposal =>
        new Date(proposal.fechaPropuesta) >= new Date(filters.fechaPropuestaDesde) &&
        new Date(proposal.fechaPropuesta) <= new Date(filters.fechaPropuestaHasta)
      );
    }

    if (filters.estadoRevision && filters.estadoRevision !== "all") {
      filteredData = filteredData.filter(proposal =>
        proposal.estadoRevision === filters.estadoRevision
      );
    }

    if (filters.estadoPropuesta && filters.estadoPropuesta !== "all") {
      filteredData = filteredData.filter(proposal =>
        proposal.estadoPropuesta === filters.estadoPropuesta
      );
    }

    setFilteredProposals(filteredData);
  }, [proposals]);

  const handleAddProposalClick = () => {
    setShowPotentialCustomersModal(true);
  };

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setShowPotentialCustomersModal(false);
    setShowProposalFormModal(true);
  };

  const handleFormSubmit = async (data: any) => {
    setAlert({
      show: true,
      message: '¿Está seguro de continuar?',
      onContinue: async () => {
        try {
          await addProposal({ ...data, cliente: selectedCustomer.nombre });
          setToast({ show: true, message: 'Propuesta creada exitosamente', variant: 'success' });
          setShowProposalFormModal(false);
          setSelectedCustomer(null);
          fetchProposals();
        } catch (error) {
          setToast({ show: true, message: 'Error al crear la propuesta', variant: 'danger' });
        }
        setAlert({ show: false, message: '', onContinue: () => { } });
      }
    });
  };

  const renderProposalActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => console.log('View proposal', row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
      <svg
        className='icon__action icon__action--edit'
        onClick={() => console.log('Edit proposal', row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
    </div>
  );

  const renderSelectCustomerAction = (row: any) => (
    <button onClick={() => handleSelectCustomer(row)}>Seleccionar</button>
  );

  const handleHistoryProposalClick = () => {
    setShowHistoryManagementProposalsModal(true); // set el estado para mostrar el modal
  };



  return (
    <div className='management-proposals'>
      <h1 className='management-proposals__title'>Gestión de Propuestas</h1>
      <div className='management-proposals__add-icon'>
        <svg height={44} width={44} onClick={handleHistoryProposalClick} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock-rotate-left" className="svg-inline--fa fa-clock-rotate-left fa-xl potential-customers__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"></path></svg>
        <svg height={44} width={44} onClick={handleAddProposalClick} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-contract" className="svg-inline--fa fa-file-contract fa-xl potential-customers__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"></path></svg>
      </div>
      <div className='management-proposals__content management-proposals__content--search-filter'>
        <SearchFilter fieldsFilter={fieldsFilterManagementProposals} onFilterChange={handleFilterChange} />
      </div>
      <div className='management-proposals__content management-proposals__content--table'>
        <TableDataContent
          data={filteredProposals}
          columns={columnsManagementProposals}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={(id) => console.log('View proposal', id)}
          onEditEmployee={(id) => console.log('Edit proposal', id)}
          enableSorting={false}
          renderActions={renderProposalActions}
        />
      </div>
      <ModalGeneral openModal={showPotentialCustomersModal} closeModal={setShowPotentialCustomersModal} title="Seleccionar Cliente Potencial" showHeader={true} showOverlay={true}>
        <TableDataContent
          data={potentialCustomers}
          columns={columsPotentialCustomersInManagementProposals}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={() => { }}
          onItemsPerPageChange={() => { }}
          renderActions={renderSelectCustomerAction}
        />
      </ModalGeneral>
      <ModalGeneral openModal={showProposalFormModal} closeModal={setShowProposalFormModal} title="Crear Propuesta" showHeader={true} showOverlay={true}>
        <GeneralForm
          fieldsForm={[
            { name: 'municipio', label: 'Municipio', type: 'text', required: true },
            { name: 'cliente', label: 'Cliente', type: 'text', required: true, defaultValue: selectedCustomer?.nombre, disabled: true },
            { name: 'medioPago', label: 'Medio de Pago', type: 'select', options: [{ label: 'Transferencia Bancaria', value: 'transferencia_bancaria' }, { label: 'Tarjeta de Crédito', value: 'tarjeta_credito' }, { label: 'PayPal', value: 'paypal' }], required: true },
            { name: 'formaPago', label: 'Forma de Pago', type: 'select', options: [{ label: 'Efectivo', value: 'efectivo' }, { label: 'Cheque', value: 'cheque' }, { label: 'Transferencia Electrónica', value: 'transferencia_electronica' }, { label: 'Pago a Plazos', value: 'pago_a_plazos' }], required: true },
            { name: 'validezPropuesta', label: 'Validez de Propuesta', type: 'date', required: true },
            { name: 'tipoIdentificacionSolicitante', label: 'Tipo de Identificación Solicitante', type: 'select', options: [{ label: 'Cédula de Ciudadanía', value: 'cedula_ciudadania' }, { label: 'Cédula de Extranjería', value: 'cedula_extranjeria' }, { label: 'Pasaporte', value: 'pasaporte' }], required: true },
            { name: 'identificacionSolicitante', label: 'Identificación de Solicitante', type: 'text', required: true },
            { name: 'correoSolicitante', label: 'Correo de Solicitante', type: 'email', required: true },
            { name: 'cargoSolicitante', label: 'Cargo Solicitante', type: 'text', required: true },
            { name: 'tipoPropuesta', label: 'Tipo de Propuesta', type: 'select', options: [{ label: 'Grande', value: 'grande' }, { label: 'Pequeña/Mediana', value: 'pequena_mediana' }, { label: 'Pacientes en Casa', value: 'pacientes_en_casa' }], required: true },
          ]}
          onSubmit={handleFormSubmit}
          principalButtonForm="Registrar"
          showButtonSubmit={true}
        />
      </ModalGeneral>
      <ModalGeneral openModal={showHistoryManagementProposalsModal} closeModal={setShowHistoryManagementProposalsModal} title="Historial de Propuestas" showHeader={true} showOverlay={true}>
        <TableDataContent
          data={proposals}
          columns={columsHistoryManagementProposals}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={() => { }}
          onItemsPerPageChange={() => { }}
        />
      </ModalGeneral>
      {toast.show && <Toast variantAlert={toast.variant} message={toast.message} show={toast.show} />}
      {alert.show && <Alert message={alert.message} onCancel={() => setAlert({ show: false, message: '', onContinue: () => { } })} onContinue={alert.onContinue} />}
    </div>
  );
};

export default ManagementProposals;