import { useForm, SubmitHandler } from "react-hook-form";
import { PageRouterEnum } from "../../core/enum/page-router.enum";
import { Link } from "react-router-dom";
import { users } from "../../core/mocks/mock-data";
import "./forgot-password.css";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (data) => {
    const user = users.find((u) => u.email === data.email);

    if (user) {
      console.log("Correo encontrado, enviando información:", user.email);
    } else {
      console.log("Correo no encontrado");
    }
  };

  return (
    <div className="forgot__container">
      <h3>Recupera tu cuenta</h3>
      <p>Introduce tu correo para enviarte la información.</p>
      <form className="forgot__form" onSubmit={handleSubmit(onSubmit)}>
        <label>Correo Electrónico</label>
        <input
          className={`forgot__input ${errors.email ? "input__error" : ""}`}
          type="email"
          placeholder="Introduce tu correo"
          {...register("email", {
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Introduce un correo válido",
            },
          })}
        />
        {errors.email && (
          <p className="error__message">{errors.email.message}</p>
        )}
        <div className="forgot__button">
          <button type="submit">Buscar</button>
          <Link className="forgot__link" to={PageRouterEnum.Login}>
            <span>Volver al inicio de sesión</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
