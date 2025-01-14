import ItemsPerPageSelector from '../items-per-page-selector/items-per-page-selector';
import { DataTableProps } from '../../core/interface/table-data.interface';
import Pagination from '../pagination.tsx/pagination';
import './table-data-content.css';
import { useEffect, useState } from 'react';

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
  enableSorting = false,
  renderActions,
}: DataTableProps<T>): JSX.Element => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortField, setSortField] = useState<keyof T>('id');

  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(1);
    }
  }, [data, currentPage, totalPages, onPageChange]);

  const sortedData = [...data].sort((a, b) => {
    const field = sortField || 'id';
    if (field === 'id') {
      const idA = parseInt(a[field] as unknown as string, 10);
      const idB = parseInt(b[field] as unknown as string, 10);
      return sortOrder === 'asc' ? idA - idB : idB - idA;
    } else {
      if (sortOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    }
  });

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  const handleSortFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as keyof T);
  };

  return (
    <div>
      <div className="table__controls">
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          maxItemsPerPage={maxItemsPerPage}
          minItemsPerPage={minItemsPerPage}
        />
        {enableSorting && (
          <>
            <label htmlFor="sortOrder">
              Ordenar:
              <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="desc">Más recientes</option>
                <option value="asc">Más antiguos</option>
              </select>
            </label>

            <label htmlFor="sortField">
              Ordenar alfabéticamente por:
              <select id="sortField" value={sortField || ''} onChange={handleSortFieldChange}>
                <option value="">Ninguno</option>
                <option value="nombres">Nombre</option>
                <option value="apellidos">Apellido</option>
              </select>
            </label>
          </>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.item.toString()} className={`table__row table__th ${col.item === 'id' ? 'table__th--clickable' : ''}`} onClick={() => col.item === 'id' && setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {col.label}
                {col.item === 'id' && (
                  <span>{sortOrder === 'asc' ? ' ↑' : ' ↓'}</span>
                )}
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
                    : col.item === 'acciones' && renderActions ? (
                      renderActions(row)
                    ) : (
                      (row[col.item] as React.ReactNode)
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <div className="table__info">
        <p>Mostrando {currentData.length} de {data.length} registros</p>
      </div>
    </div>
  );
};

export default TableDataContent;