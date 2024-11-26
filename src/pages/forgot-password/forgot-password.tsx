import { useForgotPassword } from "../../hooks/use-forgot-password";
import { PageRouterEnum } from "../../core/enum/page-router.enum";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import "./forgot-password.css";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();
  const { status, userEmail, findUserByEmail } = useForgotPassword();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    await findUserByEmail(data.email);
  };

  return (
    <div className="forgot__main">
    <div className="forgot__container">
      <div className="forgot__header">
        <h3>Recupera tu cuenta</h3>
        <p>Introduce tu correo para enviarte la información.</p>
      </div>
      <form className="forgot__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="forgot__label">Correo Electrónico</label>
        <input
          className={`forgot__input ${errors.email ? "forgot__input--error" : ""}`}
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
          <p className="forgot__error-message">{errors.email.message}</p>
        )}

        {status === "loading" && <p className="forgot__status">Buscando...</p>}
        {status === "success" && userEmail && (
          <p className="forgot__status">Ingrese a su correo para continuar con la recuperacion de su cuenta</p>
        )}
        {status === "error" && (
          <p className="forgot__error-message">Correo no encontrado</p>
        )}

        <div className="forgot__actions">
          <button type="submit">Buscar</button>
          <Link className="forgot__link" to={PageRouterEnum.Login}>
            <span>Volver al inicio de sesión</span>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
