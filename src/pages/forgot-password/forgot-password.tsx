import { useForm } from "react-hook-form";
import { requestPasswordReset } from "../../services/auth.services";
import { useState } from "react";
import './forgot-password.css';
import { Link } from "react-router-dom";
import { PageRouterEnum } from "../../core/enum/page-router.enum";

interface ForgotPasswordFormInputs {
  email: string;
}

const ForgotPassword = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      const resetLink = await requestPasswordReset(data.email);
      setMessage(`Verifica tu correo electrónico para continuar con la recuperación de tu cuenta`);
      setMessageType('success');
      console.log(`Recovery link: ${resetLink}`);
    } catch (error: any) {
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <div className="forgot__main">
      <div className="forgot__container">
        <div className="forgot__header">
          <h3 className="forgot__header-title">Recupera tu cuenta</h3>
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

          {message && (
            <p className={`forgot__status-message ${messageType}`}>
              {message}
            </p>
          )}

          <div className="forgot__actions">
            <button type="submit">Buscar</button>
          </div>
        </form>
        <div className="forgot__back">
          <Link className="forgot__back-link" to={PageRouterEnum.Login}>
            <span>Volver al inicio de sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
