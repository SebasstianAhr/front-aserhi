import { useForm, SubmitHandler } from "react-hook-form";
import "./form-general.css";

type InputType = "text" | "email" | "number" | "select" | "password" | "tel" | "date";

interface Option {
  label: string;
  value: string;
}

interface FormField {
  name: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: Option[];
  required?: boolean;
}

interface GeneralFormProps {
  fieldsForm: FormField[];
  onSubmit: (data: any) => void;
  principalButtonForm: string
}

const GeneralForm = ({ fieldsForm, onSubmit, principalButtonForm = "Alert no title in the button" }: GeneralFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);

  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <div className="form__content">
        {fieldsForm.map((fieldForm) => (
          <div key={fieldForm.name} className="form__group">
            <label htmlFor={fieldForm.name}>{fieldForm.label}</label>
            {fieldForm.type === "select" ? (
              <select
                id={fieldForm.name}
                {...register(fieldForm.name, { required: fieldForm.required })}
              >
                <option value="">Seleccione una opción</option>
                {fieldForm.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldForm.name}
                type={fieldForm.type}
                placeholder={fieldForm.placeholder}
                {...register(fieldForm.name, { required: fieldForm.required })}
              />
            )}
            {errors[fieldForm.name] && <span className="error">Este campo es obligatorio</span>}
          </div>
        ))}
      </div>
      <div className="form__actions">
        <button className="form__button" type="submit">{principalButtonForm}</button>
      </div>
    </form>
  );
};

export default GeneralForm;