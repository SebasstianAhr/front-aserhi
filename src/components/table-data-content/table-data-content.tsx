import './table-data-content.css'

interface DataTableProps<T> {
    data: T[];
    columns: { label: string; item: keyof T }[];
  }
  
  const TableDataContent = <T,>({ data, columns }: DataTableProps<T>):JSX.Element => {
    return (
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
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.item.toString()} className="table__row table-td">
                  {col.item === 'estado'
                    ? (row[col.item] ? 'Activo' : 'Inactivo')
                    : (row[col.item] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TableDataContent;
  