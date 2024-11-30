import { useContext, useState } from "react";
import { PageRouterEnum } from "../../core/enum/page-router.enum";
import { useForm } from "react-hook-form";
import logo from '../../assets/Logo.jpeg';
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../context/auth-context";
import { loginService } from "../../services/auth.services";

interface LoginFormInputs {
  identification: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setErrorMessage(null);
      const user = await loginService(data); 
      authContext?.login(user); 
      navigate(PageRouterEnum.Home);
    } catch (error) {
      setErrorMessage("Identificación o contraseña incorrectas.");
    }
  };

  return (
    <div className="login__main">
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
              className={`login__input ${errors.identification ? "login__input--error" : ""}`}
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
              <p className="login__error-message">
                {errors.identification.message}
              </p>
            )}

            <input
              className={`login__input login__input--bottom ${errors.password ? "login__input--error" : ""}`}
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

            {errorMessage && (
              <p className="login__error-message">{errorMessage}</p>
            )}

            <div className="login__form-button">
              <button type="submit">INGRESAR</button>
            </div>
          </form>
          <Link className="login__link" to={PageRouterEnum.ForgotPassword}>
            <span>¿Olvidaste tu contraseña?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
