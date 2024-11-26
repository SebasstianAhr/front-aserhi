import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../../src/pages/forgot-password/forgot-password";
import { useForgotPassword } from "../../src/hooks/use-forgot-password"; // Verifica la ruta
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';

// Mock de useForgotPassword
jest.mock("../../src/hooks/use-forgot-password", () => ({
  useForgotPassword: jest.fn(),
}));

describe("ForgotPassword", () => {
  const mockFindUserByEmail = jest.fn();

  beforeEach(() => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      status: "idle",
      userEmail: null,
      findUserByEmail: mockFindUserByEmail,
    });
  });

  it("debe renderizar el formulario correctamente", () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Introduce tu correo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /volver al inicio de sesión/i })).toBeInTheDocument();
  });

  it("debe mostrar mensaje de error cuando el correo es inválido", async () => {
    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), {
      target: { value: "correo@incorrecto" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Introduce un correo válido/i)).toBeInTheDocument();
    });
  });

  it("debe llamar a findUserByEmail cuando se envíe un correo válido", async () => {
    (useForgotPassword as jest.Mock).mockReturnValueOnce({
      status: "idle",
      userEmail: null,
      findUserByEmail: mockFindUserByEmail,
    });

    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText(/Introduce tu correo/i);
    fireEvent.change(emailInput, { target: { value: "test@correo.com" } });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => {
      expect(mockFindUserByEmail).toHaveBeenCalledWith("test@correo.com");
    });
  });

  it("debe mostrar el mensaje de 'Buscando...' cuando el estado es 'loading'", async () => {
    (useForgotPassword as jest.Mock).mockReturnValueOnce({
      status: "loading",
      userEmail: null,
      findUserByEmail: mockFindUserByEmail,
    });

    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), {
      target: { value: "test@correo.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    expect(screen.getByText(/Buscando.../i)).toBeInTheDocument();
  });

  it("debe mostrar el mensaje de éxito cuando el estado es 'success'", async () => {
    (useForgotPassword as jest.Mock).mockReturnValueOnce({
      status: "success",
      userEmail: "test@correo.com",
      findUserByEmail: mockFindUserByEmail,
    });

    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), {
      target: { value: "test@correo.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Ingrese a su correo para continuar con la recuperacion de su cuenta/i)).toBeInTheDocument();
    });
  });

  it("debe mostrar el mensaje de error cuando el estado es 'error'", async () => {
    (useForgotPassword as jest.Mock).mockReturnValueOnce({
      status: "error",
      userEmail: null,
      findUserByEmail: mockFindUserByEmail,
    });

    render(
      <Router>
        <ForgotPassword />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Introduce tu correo/i), {
      target: { value: "test@correo.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /buscar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Correo no encontrado/i)).toBeInTheDocument();
    });
  });
});
