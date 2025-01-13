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

const ManagementProposals = (): JSX.Element => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [potentialCustomers, setPotentialCustomers] = useState<any[]>([]);
  const [showPotentialCustomersModal, setShowPotentialCustomersModal] = useState(false);
  const [showProposalFormModal, setShowProposalFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [toast, setToast] = useState<{ show: boolean, message: string, variant: 'success' | 'danger' }>({ show: false, message: '', variant: 'success' });
  const [alert, setAlert] = useState<{ show: boolean, message: string, onContinue: () => void }>({ show: false, message: '', onContinue: () => {} });

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
        setAlert({ show: false, message: '', onContinue: () => {} });
      }
    });
  };

  const fieldsFilter = [
    { name: 'search', label: 'Buscar', type: 'text', placeholder: 'Buscar por razón social o nombre solicitante' },
    { name: 'fechaPropuestaDesde', label: 'Fecha Propuesta Desde', type: 'date' },
    { name: 'fechaPropuestaHasta', label: 'Fecha Propuesta Hasta', type: 'date' },
    {
      name: 'estadoRevision', label: 'Estado Revisión', type: 'select', options: [
        { label: 'Todos', value: 'all' },
        { label: 'Pendiente', value: 'Pendiente' },
        { label: 'Aprobado', value: 'Aprobado' },
        { label: 'Rechazado', value: 'Rechazado' },
      ]
    },
    {
      name: 'estadoPropuesta', label: 'Estado Propuesta', type: 'select', options: [
        { label: 'Todos', value: 'all' },
        { label: 'En Proceso', value: 'En Proceso' },
        { label: 'Finalizado', value: 'Finalizado' },
      ]
    },
  ];

  const columns = [
    { item: 'id', label: 'ID' },
    { item: 'razonSocial', label: 'Razón Social' },
    { item: 'nombreSolicitante', label: 'Nombre Solicitante' },
    { item: 'fechaPropuesta', label: 'Fecha Propuesta' },
    { item: 'estadoRevision', label: 'Estado Revisión' },
    { item: 'estadoPropuesta', label: 'Estado Propuesta' },
    { item: 'acciones', label: 'Acciones' },
  ];

  return (
    <div className='management-proposals'>
      <h1 className='management-proposals__title'>Gestión de Propuestas</h1>
      <div className='potential-customers__add-icon' onClick={handleAddProposalClick}>
        <svg height={50} width={50} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-contract" className="svg-inline--fa fa-file-contract fa-xl potential-customers__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z"></path></svg>
      </div>
      <div className='management-proposals__content management-proposals__content--search-filter'>
        <SearchFilter fieldsFilter={fieldsFilter} onFilterChange={handleFilterChange} />
      </div>
      <div className='management-proposals__content management-proposals__content--table'>
        <TableDataContent
          data={filteredProposals}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={(id) => console.log('View proposal', id)}
          onEditEmployee={(id) => console.log('Edit proposal', id)}
          enableSorting={true}
        />
      </div>
      <ModalGeneral openModal={showPotentialCustomersModal} closeModal={setShowPotentialCustomersModal} title="Seleccionar Cliente Potencial" showHeader={true} showOverlay={true}>
        <TableDataContent
          data={potentialCustomers}
          columns={[
            { item: 'id', label: 'ID' },
            { item: 'fecha', label: 'Fecha' },
            { item: 'razonSocial', label: 'Razón Social' },
            { item: 'nit', label: 'NIT' },
            { item: 'nombres', label: 'Nombres' },
            { item: 'accion', label: 'Acción', render: (row) => <button onClick={() => handleSelectCustomer(row)}>Seleccionar</button> }
          ]}
          itemsPerPage={10}
          currentPage={1}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
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
      {toast.show && <Toast variantAlert={toast.variant} message={toast.message} show={toast.show} />}
      {alert.show && <Alert message={alert.message} onCancel={() => setAlert({ show: false, message: '', onContinue: () => {} })} onContinue={alert.onContinue} />}
    </div>
  );
};

export default ManagementProposals;