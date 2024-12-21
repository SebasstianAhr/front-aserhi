import GeneralForm from '../../../components/form-general/form-general';
import ModalGeneral from '../../../components/modal-general/modal-general';
import SearchFilter from '../../../components/search-filter/search-filter';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import { addCharge, getChargeById, getCharges, updateCharge } from '../../../services/charges.services';
import './charges.css';
import { useState, useEffect, useCallback } from 'react';
import Alert from '../../../components/alert/alert';
import Toast from '../../../components/toast/toast';

interface Charge {
  id: string;
  cargo: string;
  descripcion: string;
}

const Charges = (): JSX.Element => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [filteredCharges, setFilteredCharges] = useState<Charge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [modalAddForm, setModalAddForm] = useState(false);
  const [modalViewItem, setModalViewItem] = useState<boolean>(false);
  const [modalEditItem, setModalEditItem] = useState<boolean>(false);
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [chargeToAdd, setChargeToAdd] = useState<Record<string, any> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [chargeToEdit, setChargeToEdit] = useState<Record<string, any> | null>(null);

  const formFields = [
    { name: 'cargo', label: 'Cargo', type: 'text' as 'text', required: true, placeholder: 'Ingrese el cargo' },
    { name: 'descripcion', label: 'Descripción', type: 'text' as 'text', required: true, placeholder: 'Ingrese la descripción' },
  ];

  const filterFields = [
    { name: 'cargo', label: 'Buscar por Cargo', type: 'text' as 'text', placeholder: 'Ejemplo: Gerente' },
  ];

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const data = await getCharges();
        setCharges(data);
        setFilteredCharges(data);
      } catch (error) {
        console.error('Failed to fetch charges', error)
      }
    }

    fetchCharges()
  }, []);

  const handleFormSubmit = useCallback((data: Record<string, any>) => {
    setChargeToAdd(data); 
    setShowAlertRegister(true);
  }, []);

  const handleAddCharge = async () => {
    if (chargeToAdd) {
      try {
        const newCharge = await addCharge(chargeToAdd);
        setCharges((prevCharges) => [...prevCharges, newCharge]);
        setFilteredCharges((prevCharges) => [...prevCharges, newCharge]);
        setToastMessage('Cargo agregado con éxito');
        setToastVariant('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertRegister(false);
        setChargeToAdd(null);
        setModalAddForm(false);
      } catch (error) {
        setToastMessage('Error al agregar cargo.');
        setToastVariant('danger');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertRegister(false);
      }
    }
  };

  const handleFilterChange = (filters: Record<string, string>) => {
    const { cargo = '' } = filters;

    const newFilteredCharges = charges.filter((charge) =>
      charge.cargo.toLowerCase().includes(cargo.toLowerCase())
    );
    setFilteredCharges(newFilteredCharges);
  };

  const columns = [
    { label: 'ID', item: 'id' as keyof Charge },
    { label: 'Cargo', item: 'cargo' as keyof Charge },
    { label: 'Descripción', item: 'descripcion' as keyof Charge },
    { label: 'Acciones', item: 'acciones' as keyof Charge },
  ];

  const handleViewCharge = async (id: string) => {
    const charge = await getChargeById(id);
    if (charge) {
      setSelectedCharge(charge)
      setModalViewItem(true)
    }
  };

  const handleEditCharge = async (id: string) => {
    const charge = await getChargeById(id);
    if (charge) {
      setSelectedCharge(charge)
      setModalEditItem(true)
    }
  };

  const handleEditFormSubmit = useCallback((data: Record<string, any>) => {
    setChargeToEdit(data);
    setShowAlertEdit(true);
  }, []);

  const handleEditChargeSubmit = async () => {
    if (chargeToEdit) {
      try {
        const updatedCharge = await updateCharge(chargeToEdit);
        setCharges((prevCharges) =>
          prevCharges.map(item =>
            item.id === updatedCharge.id ? updatedCharge : item
          )
        );
        setToastMessage('Cargo editado con éxito');
        setToastVariant('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertEdit(false);
        setChargeToEdit(null);
        setModalEditItem(false);
      } catch (error) {
        setToastMessage('Error al editar cargo.');
        setToastVariant('danger');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertEdit(false);
      }
    }
  };

  const handleAlertCancel = useCallback(() => {
    setShowAlertRegister(false);
    setChargeToAdd(null); 
    setModalAddForm(false); 
  }, []);

  const handleAlertEditCancel = useCallback(() => {
    setShowAlertEdit(false);
    setChargeToEdit(null);
    setModalEditItem(false);
  }, []);

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
          columns={columns}
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
