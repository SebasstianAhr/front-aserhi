import './table-data-content.css';
import { useEffect } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: { label: string; item: keyof T }[];
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const TableDataContent = <T,>({
  data,
  columns,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
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

  return (
    <div>
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
                    : (row[col.item] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="pagination__info">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="pagination__button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TableDataContent;
