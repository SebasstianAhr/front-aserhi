import { useState, useCallback } from 'react';
import GeneralForm from '../../../components/form-general/form-general';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import './charges.css';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';
import useCharges from '../../../hooks/charges.hook/useCharges';

const Charges = (): JSX.Element => {
  const {
    charges,
    filteredCharges,
    currentPage,
    itemsPerPage,
    selectedCharge,
    showAlertRegister,
    showToast,
    toastMessage,
    toastVariant,
    showAlertEdit,
    handleFormSubmit,
    handleAddCharge,
    handleFilterChange,
    handleViewCharge,
    handleEditCharge,
    handleEditFormSubmit,
    handleEditChargeSubmit,
    setCurrentPage,
    setItemsPerPage,
    setShowAlertRegister,
    setShowAlertEdit,
  } = useCharges();

  const [modalAddForm, setModalAddForm] = useState(false);
  const [modalViewItem, setModalViewItem] = useState<boolean>(false);
  const [modalEditItem, setModalEditItem] = useState<boolean>(false);

  const formFields = [
    { name: 'cargo', label: 'Cargo', type: 'text' as 'text', required: true, placeholder: 'Ingrese el cargo' },
    { name: 'descripcion', label: 'Descripción', type: 'text' as 'text', required: true, placeholder: 'Ingrese la descripción' },
  ];

  const filterFields = [
    { name: 'cargo', label: 'Buscar por Cargo', type: 'text' as 'text', placeholder: 'Ejemplo: Gerente' },
  ];

  const handleAlertCancel = useCallback(() => {
    setShowAlertRegister(false);
    setModalAddForm(false);
  }, [setShowAlertRegister]);

  const handleAlertEditCancel = useCallback(() => {
    setShowAlertEdit(false);
    setModalEditItem(false);
  }, [setShowAlertEdit]);

  return (
    <div className="charges">
      <h1 className="charges__title">Gestión de Cargos</h1>
      {showToast && <Toast variantAlert={toastVariant} message={toastMessage} show={showToast} />}
      <div className="charges__add-icon">
        <svg
          onClick={() => setModalAddForm(true)}
          aria-hidden="true"
          width={50}
          height={50}
          focusable="false"
          data-prefix="fas"
          data-icon="plus"
          className="charges__icon-add svg-inline--fa fa-plus fa-xl "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </div>
      <div className='charges__content charges__content--search-filter'>
        <SearchFilter fieldsFilter={filterFields} onFilterChange={handleFilterChange} />
      </div>
      <div className="charges__content charges__content--table">
        <TableDataContent
          data={filteredCharges}
          columns={[
            { label: 'ID', item: 'id' as keyof Charge },
            { label: 'Cargo', item: 'cargo' as keyof Charge },
            { label: 'Descripción', item: 'descripcion' as keyof Charge },
            { label: 'Acciones', item: 'acciones' as keyof Charge },
          ]}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={handleViewCharge}
          onEditEmployee={handleEditCharge}
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
        title="Detalle del cargo"
        showHeader={true}
        showOverlay={true}
      >
        <GeneralForm
          fieldsForm={formFields}
          onSubmit={handleFormSubmit}
          showButtonSubmit={false}
          valueEmployees={selectedCharge}
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
          valueEmployees={selectedCharge}
        />
      </ModalGeneral>
      {showAlertRegister && (
        <Alert
          message="¿Está seguro de que desea agregar este cargo?"
          onCancel={handleAlertCancel}
          onContinue={handleAddCharge}
        />
      )}
      {showAlertEdit && (
        <Alert
          message="¿Está seguro de que desea editar este cargo?"
          onCancel={handleAlertEditCancel}
          onContinue={handleEditChargeSubmit}
        />
      )}
    </div>
  );
};

export default Charges;
