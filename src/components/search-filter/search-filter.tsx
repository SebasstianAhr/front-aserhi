import React, { useState } from "react";
import "./search-filter.css";

type InputType = "text" | "date" | "select";

interface Option {
  label: string;
  value: string;
}

interface FilterField {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: Option[];
}

interface SearchFilterProps {
  fields: FilterField[];
  onFilterChange: (filters: Record<string, any>) => void;
}

const SearchFilter = ({ fields, onFilterChange }: SearchFilterProps): JSX.Element => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <form className="search-filter">
      <div className="search-filter__content">
        {fields.map((field) => (
          <div key={field.name} className="search-filter__group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="">Seleccione una opción</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchFilter;