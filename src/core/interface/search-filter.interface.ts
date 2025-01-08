export type InputType = "text" | "select";

export interface Option {
  label: string;
  value: string;
}

export interface FilterField {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: Option[];
}

export interface SearchFilterProps {
  fieldsFilter: FilterField[];
  onFilterChange: (filters: Record<string, any>) => void;
}