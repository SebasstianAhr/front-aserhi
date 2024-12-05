import React, { useState } from "react";
import "./search-filter.css";

type InputType = "text" | "select";

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
  fieldsFilter: FilterField[];
  onFilterChange: (filters: Record<string, any>) => void;
}

const SearchFilter = ({ fieldsFilter, onFilterChange }: SearchFilterProps): JSX.Element => {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <form className="filter">
      <div className="filter__content">
        {fieldsFilter.map((fieldFilter) => (
          <div key={fieldFilter.name} className="filter__group">
            <label htmlFor={fieldFilter.name}>{fieldFilter.label}</label>
            {fieldFilter.type === "select" ? (
              <select
                id={fieldFilter.name}
                name={fieldFilter.name}
                onChange={handleInputChange}
                defaultValue=""
              >
                <option value="all">All</option>
                {fieldFilter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldFilter.name}
                name={fieldFilter.name}
                type={fieldFilter.type}
                placeholder={fieldFilter.placeholder}
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
