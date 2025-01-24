import TableDataContent from '../../../components/table-data-content/table-data-content';
import { getProposals } from '../../../services/management-proposals.services';
import { useEffect, useState } from 'react';
import './revision-proposals.css';
import { columsRevisionProposals } from '../../../core/utils/colums-table-data.util';

const RevisionProposals = (): JSX.Element => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchProposals = async () => {
      const data = await getProposals();
      setProposals(data);
    };

    fetchProposals();
  }, []);



  const renderActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view'
        onClick={() => console.log('View proposal', row.id)}
        stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
    </div>
  );

  return (
    <div className='revision-proposals'>
      <h1 className='revision-proposals__title'>Revisión de Propuestas</h1>
      <div className='revision-proposals__add-icon'>
        <svg height={44} width={44} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock-rotate-left" className="svg-inline--fa fa-clock-rotate-left fa-xl revision-proposals__icon-add" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"></path></svg>
      </div>
      <div className='revision-proposals__content revision-proposals__content--table'>
        <div className='revision-proposals__header--table'>
          <p className='revicion-proposals__header--page'>Pendientes</p>
          <p className='revicion-proposals__header--page'>Aprobadas</p>
        </div>
        <TableDataContent
          data={proposals}
          columns={columsRevisionProposals}
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

export default RevisionProposals;