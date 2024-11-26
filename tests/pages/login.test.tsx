import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/pages/login/login";
import '@testing-library/jest-dom';
import { useNavigate } from "react-router-dom";

// Mock data
jest.mock("../../src/core/mocks/mock-data", () => ({
  users: [
    { identification: "12345", password: "password123" },
    { identification: "67890", password: "password456" },
  ],
}));

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (component: JSX.Element) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Login Component", () => {
  test("Renders the initial component correctly", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/identificación/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/contraseña/i)).toBeInTheDocument();
  });

  test("Shows validation errors when fields are empty", async () => {
    renderWithRouter(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    const errorMessages = screen.getAllByClassName("login__error-message");
    expect(errorMessages[0]).toHaveTextContent(/identificación es obligatoria/i);
    expect(errorMessages[1]).toHaveTextContent(/contraseña es obligatoria/i);
  });

  test("Shows an error when incorrect credentials are entered", async () => {
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/identificación/i), {
      target: { value: "11111" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/identificación o contraseña incorrecta/i)).toBeInTheDocument();
  });

  test("Logs in successfully with valid credentials", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText(/identificación/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    // Verificar que no aparece el mensaje de error
    expect(screen.queryByText(/identificación o contraseña incorrecta/i)).not.toBeInTheDocument();

    // Verificar que la redirección ocurre
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/home"); // Ajusta a tu ruta esperada
    });
  });

  test("The '¿Olvidaste tu contraseña?' link redirects correctly", () => {
    renderWithRouter(<Login />);
    const link = screen.getByText(/¿olvidaste tu contraseña\?/i);
    expect(link).toHaveAttribute("href", "/forgotPassword"); // Ajusta la ruta
  });
});
