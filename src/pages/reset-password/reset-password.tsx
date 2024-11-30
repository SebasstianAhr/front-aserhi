import { resetPassword } from "../../services/auth.services";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import './reset-password.css';
import { PageRouterEnum } from "../../core/enum/page-router.enum";

interface ResetPasswordFormInputs {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInputs>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setMessageType("error");
      return;
    }

    try {
      await resetPassword(id!, data.newPassword);
      setMessage("Contraseña restablecida con éxito. Redirigiendo...");
      setMessageType("success")
      setTimeout(() => navigate(PageRouterEnum.Login), 3000);
    } catch (error: any) {
      setMessage(error.message);
      setMessageType("error")

    }
  };

  return (
    <div className="reset">
      <div className="reset__content">
        <h3 className="reset__title">Actualiza tu contraseña</h3>
        <form className="reset__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="reset__form-group">
            <label className="reset__label">Nueva contraseña</label>
            <input
              type="password"
              className={`reset__input ${errors.newPassword ? "reset__input--error" : ""}`}
              {...register("newPassword", {
                required: "La contraseña es requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.newPassword && (
              <p className="reset__error-message">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="reset__form-group reset__form-group--bottom">
            <label className="reset__label">Confirmar contraseña</label>
            <input
              type="password"
              className={`reset__input ${errors.confirmPassword ? "reset__input--error" : ""}`}
              {...register("confirmPassword", {
                required: "La confirmación es requerida",
              })}
            />
            {errors.confirmPassword && (
              <p className="reset__error-message">{errors.confirmPassword.message}</p>
            )}
          </div>

          {message && (
            <p className={`reset__status-message ${messageType}`}>
              {message}
            </p>
          )}

          <div className="reset__actions">
            <button type="submit">Aceptar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
