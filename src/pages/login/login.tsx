import { PageRouterEnum } from "../../core/enum/page-router.enum";
import { useForm, SubmitHandler } from "react-hook-form";
import { users } from "../../core/mocks/mock-data";
import logo from "../../assets/Logo.jpeg";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./login.css";

interface LoginFormInputs {
  identification: string;
  password: string;
}

const Login = (): JSX.Element => {
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const user = users.find(
      (u) =>
        u.identification === data.identification &&
        u.password === data.password
    );

    if (user) {
      console.log("Inicio de sesión exitoso", user);
      setLoginError(null);
    } else {
      console.log("Credenciales incorrectas");
      setLoginError("Identificación o contraseña incorrecta");
    }
  };

  return (
    <div className="login__container">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <h3>
        INICIAR <span>SESIÓN</span>
      </h3>
      <div className="login__form-container">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className={`login__input ${
              errors.identification ? "login__input--error" : ""
            }`}
            placeholder="Identificación"
            type="text"
            {...register("identification", {
              required: "La identificación es requerida",
              pattern: {
                value: /^[0-9]+$/,
                message: "Solo se aceptan números",
              },
            })}
          />
          {errors.identification && (
            <p className="login__error-message">{errors.identification.message}</p>
          )}

          <input
            className={`login__input login__input--bottom ${
              errors.password ? "login__input--error" : ""
            }`}
            placeholder="Contraseña"
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <p className="login__error-message">{errors.password.message}</p>
          )}

          {loginError && <p className="login__error-message">{loginError}</p>}

          <div className="login__form-button">
            <button type="submit">INGRESAR</button>
          </div>
        </form>
        <Link className="login__link" to={PageRouterEnum.ForgotPassword}>
          <span>¿Olvidaste tu contraseña?</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
