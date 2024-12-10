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

  const handleClearFilters = () => {
    const resetFilters: Record<string, any> = {};
    fieldsFilter.forEach(field => {
      resetFilters[field.name] = field.type === "select" ? "all" : "";
    });
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <form className="filter">
    <div className="filter__content">
      {fieldsFilter.map((fieldFilter) => (
        <div key={fieldFilter.name} className="filter__group">
          <label className="filter__label" htmlFor={fieldFilter.name}>
            {fieldFilter.label}
          </label>
          {fieldFilter.type === "select" ? (
            <select
              className="filter__input filter__input--select"
              id={fieldFilter.name}
              name={fieldFilter.name}
              onChange={handleInputChange}
              value={filters[fieldFilter.name] || "all"}
            >
              <option className="filter__option" value="all">All</option>
              {fieldFilter.options?.map((option) => (
                <option className="filter__option" key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className="filter__input filter__input--text"
              id={fieldFilter.name}
              name={fieldFilter.name}
              type={fieldFilter.type}
              placeholder={fieldFilter.placeholder}
              value={filters[fieldFilter.name] || ""}
              onChange={handleInputChange}
            />
          )}
        </div>
      ))}
    </div>
    <div className="filter__actions">
      <button
        type="button"
        className="filter__clear--button"
        onClick={handleClearFilters}
      >
        Limpiar
      </button>
    </div>
  </form>  
  );
};

export default SearchFilter;
