import './table-data-content.css';
import { useEffect } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: { label: string; item: keyof T }[];
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  maxItemsPerPage?: number;
  minItemsPerPage?: number;
  onViewEmployee: (id: string) => void;
  onEditEmployee: (id: string) => void;
}

const TableDataContent = <T,>({
  data,
  columns,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  onViewEmployee,
  onEditEmployee,
  maxItemsPerPage = 30,
  minItemsPerPage = 5,
}: DataTableProps<T>): JSX.Element => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(1);
    }
  }, [data, currentPage, totalPages, onPageChange]);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onItemsPerPageChange(value);
    onPageChange(1);
  };

  return (
    <div>
      <div className="table__controls">
        <label htmlFor="itemsPerPage">
          Mostrar:
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {Array.from(
              { length: (maxItemsPerPage - minItemsPerPage) / 5 + 1 },
              (_, i) => minItemsPerPage + i * 5
            ).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          por página
        </label>
      </div>

      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.item.toString()} className="table__row table__th">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td
                  key={col.item.toString()}
                  className={`table__row ${col.item === 'id' || col.item === 'acciones' ? 'table__center' : ''
                    } ${col.item === 'estado' ? (row[col.item] ? 'table__estado--active' : 'table__estado--inactive') : ''}`}
                >
                  {col.item === 'estado'
                    ? row[col.item]
                      ? 'Activo'
                      : 'Inactivo'
                    : col.item === 'acciones' ? (
                      <div className="table__actions">

                        <svg
                          className='icon__action icon__action--view'
                          onClick={() => onViewEmployee((row as { id: string }).id)}
                          stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
                        <svg
                          className='icon__action icon__action--edit'
                          onClick={() => onEditEmployee((row as { id: string }).id)}
                          stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>
                      </div>
                    ) : (
                      (row[col.item] as React.ReactNode)
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>


      </table>

      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handleFirst}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="pagination__button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, currentPage - 3), currentPage + 2)
          .map((page) => (
            <button
              key={page}
              className={`pagination__button ${currentPage === page ? 'active' : ''
                }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

        {currentPage + 2 < totalPages && <span>...</span>}

        <button
          className="pagination__button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="pagination__button"
          onClick={handleLast}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
      <div className="table__info">
        <p>Mostrando {currentData.length} de {data.length} registros</p>
      </div>
    </div>
  );
};

export default TableDataContent;
