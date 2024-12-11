import TableDataContent from '../../../components/table-data-content/table-data-content';
import { getCharges } from '../../../services/charges.services';
import './charges.css';
import { useState, useEffect } from 'react';

interface Charge {
  id: string;
  cargo: string;
  descripcion: string;
}

const Charges = (): JSX.Element => {
  const [charges, setCharges] = useState<Charge[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const data = await getCharges();
        setCharges(data);
      } catch (error) {
        console.error('Failed to fetch charges', error)
      }
    }

    fetchCharges()
  }, []);



  const columns = [
    { label: 'ID', item: 'id' as keyof Charge },
    { label: 'Cargo', item: 'cargo' as keyof Charge },
    { label: 'Descripción', item: 'descripcion' as keyof Charge },
    { label: 'Acciones', item: 'acciones' as keyof Charge },
  ];

  const handleViewCharge = (id: string) => {
    console.log('Ver cargo con ID:', id);
  };

  const handleEditCharge = (id: string) => {
    console.log('Editar cargo con ID:', id);
  };

  return (
    <div className="charges">
      <h1 className="charges__title">Gestión de Cargos</h1>
      <div className="charges__add-icon">
        <svg
          width={50}
          height={50}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="user-plus"
          className="svg-inline--fa fa-user-plus fa-xl charges__icon-add"
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
      <div className="charges__content charges__content--table">
        <TableDataContent
          data={charges}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={handleViewCharge}
          onEditEmployee={handleEditCharge}
        />
      </div>
    </div>
  );
};

export default Charges;
