import { useEffect, useState } from 'react';
import './contract-clauses.css';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import { getContractClauses2, getContractClauses1 } from '../../../services/clasuses.services';

const ContractClauses = (): JSX.Element => {
  const [clauses, setClauses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [selectedClause, setSelectedClause] = useState<string>('Pequeña/Mediana');

  useEffect(() => {
    fetchClauses2();
  }, []);

  const fetchClauses1 = async () => {
    const data = await getContractClauses1();
    setClauses(data);
    setSelectedClause('Pacientes en Casa');
  };

  const fetchClauses2 = async () => {
    const data = await getContractClauses2();
    setClauses(data);
    setSelectedClause('Pequeña/Mediana');
  };

  const columns = [
    { label: 'ID', item: 'id' },
    { label: 'Cláusula', item: 'clausula' },
    { label: 'Acción', item: 'acciones' },
  ];

  const renderActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
    </div>
  );

  return (
    <div className='contract-clauses'>
      <h1 className='contract-clauses__title'>Gestión de Cláusulas de Contrato</h1>
      <div className='contract-clauses__add-icon'>
      <svg aria-hidden="true" width={44} height={44} focusable="false" data-prefix="fas" data-icon="gavel" className="contract-clauses__icon-add svg-inline--fa fa-gavel fa-sm " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4L325.4 293.4l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4L272 285.3 226.7 240 168 298.7l-1.4-1.4z"></path></svg>
      </div>
      <div className='contract-clauses__content contract-clauses__content--table'>
        <div className='contract-clauses__header--table'>
          <p
            className={`contract-clauses__header--page ${selectedClause === 'Pequeña/Mediana' ? 'contract-clauses__header--selected' : ''}`}
            onClick={fetchClauses2}
          >
            Cláusula Pequeña/Mediana
          </p>
          <p
            className={`contract-clauses__header--page ${selectedClause === 'Pacientes en Casa' ? 'contract-clauses__header--selected' : ''}`}
            onClick={fetchClauses1}
          >
            Cláusula Pacientes en casa
          </p>
        </div>
        <TableDataContent
          data={clauses}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          renderActions={renderActions}
        />
      </div>
    </div>
  );
};

export default ContractClauses;