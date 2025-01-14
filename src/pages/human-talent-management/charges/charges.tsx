import TableDataContent from '../../../components/table-data-content/table-data-content';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import GeneralForm from '../../../components/form-general/form-general';
import useCharges from '../../../hooks/charges.hook/useCharges';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';
import { useState, useCallback } from 'react';
import './charges.css';
import { formFields } from '../../../core/utils/charges-template.util';

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

  const renderChargeActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => handleViewCharge(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
      <svg
        className='icon__action icon__action--edit'
        onClick={() => handleEditCharge(row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
    </div>
  );

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
          renderActions={renderChargeActions}
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
