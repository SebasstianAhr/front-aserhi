import { PageRouterEnum } from "../../src/core/enum/page-router.enum";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/pages/login/login";
import '@testing-library/jest-dom';

jest.mock("../../src/core/mocks/mock-data", () => ({
  users: [
    { identification: "123456", password: "123456", email: "usuario1@example.com" },
  ],
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (ui: JSX.Element) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  it("Debe renderizar correctamente los elementos iniciales", () => {
    renderWithRouter(<Login />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Identificación")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /INGRESAR/i })).toBeInTheDocument();
    expect(screen.getByText("¿Olvidaste tu contraseña?")).toBeInTheDocument();
  });

  it("Debe mostrar errores de validación cuando los campos están vacíos", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));
    expect(await screen.findByText("La identificación es requerida")).toBeInTheDocument();
    expect(await screen.findByText("La contraseña es requerida")).toBeInTheDocument();
  });

  it("Debe mostrar un error si la identificación contiene caracteres no numéricos", async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Identificación"), {
      target: { value: "abc123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));
    expect(await screen.findByText("Solo se aceptan números")).toBeInTheDocument();
  });

  it("Debe mostrar un error si la contraseña tiene menos de 6 caracteres", async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));
    expect(
      await screen.findByText("La contraseña debe tener al menos 6 caracteres")
    ).toBeInTheDocument();
  });

  it("Debe mostrar un error si las credenciales son incorrectas", async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Identificación"), {
      target: { value: "11111" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));
    expect(
      await screen.findByText("Identificación o contraseña incorrecta")
    ).toBeInTheDocument();
  });

  it("Debe iniciar sesión exitosamente con credenciales correctas", async () => {
    const mockNavigate = jest.fn();
    const { useNavigate } = jest.requireMock("react-router-dom");
    useNavigate.mockReturnValue(mockNavigate);

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Identificación"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));

    expect(screen.queryByText("Identificación o contraseña incorrecta")).not.toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalled();
  });

  it("El enlace '¿Olvidaste tu contraseña?' debe redirigir correctamente", () => {
    renderWithRouter(<Login />);
    const link = screen.getByText("¿Olvidaste tu contraseña?");
    expect(link).toHaveAttribute("href", PageRouterEnum.ForgotPassword);
  });

  it("Debe aplicar clases de error dinámicas cuando hay validaciones fallidas", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /INGRESAR/i }));
    const input = await screen.findByPlaceholderText("Identificación");
    expect(input).toHaveClass("login__input--error");
  });

  it("El componente debe coincidir con el snapshot", () => {
    const { asFragment } = renderWithRouter(<Login />);
    expect(asFragment()).toMatchSnapshot();
  });
});
