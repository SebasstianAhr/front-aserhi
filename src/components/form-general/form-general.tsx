import { GeneralFormProps } from "../../core/interface/form-general.interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import './form-general.css';

const GeneralForm = ({
  fieldsForm,
  onSubmit,
  principalButtonForm = "Alert no title in the button",
  showButtonSubmit,
  valueEmployees,
  isRegisterMode = false,
  isViewMode = false,
}: GeneralFormProps): JSX.Element => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm(valueEmployees);
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onSubmit(data);
  };

  useEffect(() => {
    reset(valueEmployees);
  }, [valueEmployees, reset]);

  const handleChange = (fieldName: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="form">
      <div className="form__content">
        {fieldsForm.map((fieldForm) => (
          <div key={fieldForm.name} className="form__group">
            <label
              htmlFor={fieldForm.name}
              className={fieldForm.required && errors[fieldForm.name] ? "form__error-required" : ""}
            >
              {fieldForm.label}  
              {fieldForm.required && isRegisterMode && !touchedFields[fieldForm.name] && <span className="form__asterisk--required">*</span>}
            </label>
            
            {fieldForm.type === "select" ? (
              <select
                id={fieldForm.name}
                {...register(fieldForm.name, { required: fieldForm.required })}
                className={`${errors[fieldForm.name] ? "form__error--input-border" : ""} ${isViewMode ? "form__input--disabled" : ""}`}
                disabled={isViewMode}
                onChange={() => handleChange(fieldForm.name)}
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
                {...register(fieldForm.name, {
                  required: fieldForm.required,
                  ...(fieldForm.name === "identificacion" || fieldForm.name === "telefono" || fieldForm.name === "telefonoCorporativo"
                    ? {
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Solo se permiten números",
                      },
                    }
                    : {}),
                  ...(fieldForm.name === "password"
                    ? {
                      minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres",
                      },
                    }
                    : {}),
                })}
                className={`${errors[fieldForm.name] ? "form__error--input-border" : ""} ${isViewMode ? "form__input--disabled" : ""}`}
                disabled={isViewMode}
                onChange={() => handleChange(fieldForm.name)}
              />
            )}
            {errors[fieldForm.name] && (
              <span className="form__error--message">{errors[fieldForm.name]?.message || "Este campo es obligatorio"}</span>
            )}
          </div>
        ))}
      </div>
      {showButtonSubmit && !isViewMode && ( 
        <div className="form__actions">
          <button className="form__button" type="submit">
            {principalButtonForm}
          </button>
        </div>
      )}
    </form>
  );
};

export default GeneralForm;