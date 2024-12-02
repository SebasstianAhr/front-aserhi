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
  fields: FormField[];
  onSubmit: (data: any) => void;
  principalButton: string
}

const GeneralForm = ({ fields, onSubmit, principalButton = "Alert no title in the button" }: GeneralFormProps): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);

  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <div className="form__content">
        {fields.map((field) => (
          <div key={field.name} className="form__group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "select" ? (
              <select
                id={field.name}
                {...register(field.name, { required: field.required })}
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
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, { required: field.required })}
              />
            )}
            {errors[field.name] && <span className="error">Este campo es obligatorio</span>}
          </div>
        ))}
      </div>
      <div className="form__actions">
        <button className="form__button" type="submit">{principalButton}</button>
      </div>
    </form>
  );
};

export default GeneralForm;