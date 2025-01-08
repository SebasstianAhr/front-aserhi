import { ItemsPerPageSelectorProps } from '../../core/interface/items-per-page-selector.interface';
import './items-per-page-selector.css';

const ItemsPerPageSelector = ({
  itemsPerPage,
  onItemsPerPageChange,
  maxItemsPerPage = 30,
  minItemsPerPage = 5,
}: ItemsPerPageSelectorProps): JSX.Element => {
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    onItemsPerPageChange(value);
  };

  return (
    <label htmlFor="itemsPerPage" className="items-per-page-selector">
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
  );
};

export default ItemsPerPageSelector;