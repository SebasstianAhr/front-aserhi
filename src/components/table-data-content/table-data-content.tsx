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
  setModalVewItem: React.Dispatch<React.SetStateAction<boolean>>;
  modalVewItem: boolean;

}

const TableDataContent = <T,>({
  data,
  columns,
  itemsPerPage,
  currentPage,
  setModalVewItem,
  modalVewItem,
  onPageChange,
  onItemsPerPageChange,
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
    onPageChange(1); // Reset to the first page after changing items per page
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
                <td key={col.item.toString()} className="table__row table-td">
                  {col.item === 'estado'
                    ? row[col.item]
                      ? 'Activo'
                      : 'Inactivo'
                    : col.item === 'acciones' ? (
                      <button
                        className="action__button"
                        onClick={() => setModalVewItem(!modalVewItem)}
                      >
                        Ver
                      </button>
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
        Mostrando {currentData.length} de {data.length} registros
      </div>
    </div>
  );
};

export default TableDataContent;
