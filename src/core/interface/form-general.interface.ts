export type InputType = "text" | "email" | "number" | "select" | "password" | "tel" | "date";

export interface Option {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
}

export interface GeneralFormProps {
  fieldsForm: FormField[];
  onSubmit: (data: any) => void;
  principalButtonForm?: string;
  showButtonSubmit: boolean;
  valueEmployees?: any;
  isRegisterMode?: boolean;
  isViewMode?: boolean;
}