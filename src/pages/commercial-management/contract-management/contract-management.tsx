import TableDataContent from '../../../components/table-data-content/table-data-content';
import { filterFieldsContractManagement } from '../../../core/utils/field-filter.util';
import { columnsContractManagement } from '../../../core/utils/colums-table-data.util';
import { ContractManagementEnum } from '../../../core/enum/contract-management.enum';
import { getContracts } from '../../../services/contract-management.services';
import SearchFilter from '../../../components/search-filter/search-filter';
import { useEffect, useState, useCallback } from 'react';
import './contract-management.css';

const ContractManagement = (): JSX.Element => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchContracts = async () => {
      const data = await getContracts();
      setContracts(data);
      setFilteredContracts(data);
    };

    fetchContracts();
  }, []);

  const handleFilterChange = useCallback((filters: Record<string, any>) => {
    let filteredData = [...contracts];

    if (filters.contratante) {
      filteredData = filteredData.filter(contract =>
        contract.contratante.toLowerCase().includes(filters.contratante.toLowerCase())
      );
    }

    if (filters.fechaInicioDesde && filters.fechaInicioHasta) {
      filteredData = filteredData.filter(contract =>
        new Date(contract.fechaInicio) >= new Date(filters.fechaInicioDesde) &&
        new Date(contract.fechaInicio) <= new Date(filters.fechaInicioHasta)
      );
    }

    if (filters.estadoContrato && filters.estadoContrato !== ContractManagementEnum.All) {
      filteredData = filteredData.filter(contract =>
        contract.estadoContrato === filters.estadoContrato
      );
    }

    setFilteredContracts(filteredData);
  }, [contracts]);

  const renderActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => console.log('View proposal', row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
    </div>
  );

  return (
    <div className='contract-management'>
      <h1 className='contract-management__title'>Gestión de Contratos</h1>
      <div className='contract-management__add-icon'>
        <svg height={44} width={44} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock-rotate-left" className="svg-inline--fa fa-clock-rotate-left fa-xl contract-management__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"></path></svg>
        <svg height={44} width={44} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-signature" className="svg-inline--fa fa-file-signature fa-xl contract-management__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z"></path></svg>
      </div>
      <div className='contract-management__content contract-management__content--search-filter'>
        <SearchFilter fieldsFilter={filterFieldsContractManagement} onFilterChange={handleFilterChange} />
      </div>
      <div className='contract-management__content contract-management__content--table'>
        <TableDataContent
          data={filteredContracts}
          columns={columnsContractManagement}
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

export default ContractManagement;