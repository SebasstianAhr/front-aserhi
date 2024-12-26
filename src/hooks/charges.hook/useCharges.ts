import { useState, useEffect, useCallback } from 'react';
import { addCharge, getChargeById, getCharges, updateCharge } from '../../services/charges.services';

interface Charge {
  id: string;
  cargo: string;
  descripcion: string;
}

const useCharges = () => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [filteredCharges, setFilteredCharges] = useState<Charge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);
  const [showAlertRegister, setShowAlertRegister] = useState(false);
  const [chargeToAdd, setChargeToAdd] = useState<Record<string, any> | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
  const [showAlertEdit, setShowAlertEdit] = useState(false);
  const [chargeToEdit, setChargeToEdit] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const data = await getCharges();
        setCharges(data);
        setFilteredCharges(data);
      } catch (error) {
        console.error('Failed to fetch charges', error);
      }
    };

    fetchCharges();
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

  const handleViewCharge = async (id: string) => {
    const charge = await getChargeById(id);
    if (charge) {
      setSelectedCharge(charge);
    }
  };

  const handleEditCharge = async (id: string) => {
    const charge = await getChargeById(id);
    if (charge) {
      setSelectedCharge(charge);
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
          prevCharges.map((item) =>
            item.id === updatedCharge.id ? updatedCharge : item
          )
        );
        setToastMessage('Cargo editado con éxito');
        setToastVariant('success');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertEdit(false);
        setChargeToEdit(null);
      } catch (error) {
        setToastMessage('Error al editar cargo.');
        setToastVariant('danger');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        setShowAlertEdit(false);
      }
    }
  };

  return {
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
  };
};

export default useCharges;
