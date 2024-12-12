import { render, screen, fireEvent } from "@testing-library/react";
import GeneralFom from "../../src/components/form-general/form-general"
import "@testing-library/jest-dom";


describe("GeneralForm Component", () => {
  const fieldsForm = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "role", label: "Role", type: "select", options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }], required: true },
  ];

  const onSubmitMock = jest.fn();

  test("renders the form with the correct fields", () => {
    render(
      <GeneralForm
        fieldsForm={fieldsForm}
        onSubmit={onSubmitMock}
        showButtonSubmit={true}
        isRegisterMode={true}
      />
    );

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Role")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /alert no title in the button/i })).toBeInTheDocument();
  });

  test("does not allow interaction in view mode", () => {
    render(
      <GeneralForm
        fieldsForm={fieldsForm}
        onSubmit={onSubmitMock}
        showButtonSubmit={true}
        isViewMode={true}
      />
    );

    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Role")).toBeDisabled();

    expect(screen.queryByRole("button", { name: /alert no title in the button/i })).not.toBeInTheDocument();
  });

  test("shows error messages for required fields", async () => {
    render(
      <GeneralForm
        fieldsForm={fieldsForm}
        onSubmit={onSubmitMock}
        showButtonSubmit={true}
        isRegisterMode={true}
      />
    );

    const submitButton = screen.getByRole("button", { name: /alert no title in the button/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("Este campo es obligatorio")).toBeInTheDocument();
  });

  test("calls onSubmit with correct data", async () => {
    render(
      <GeneralForm
        fieldsForm={fieldsForm}
        onSubmit={onSubmitMock}
        showButtonSubmit={true}
        isRegisterMode={true}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText("Role"), { target: { value: "admin" } });

    const submitButton = screen.getByRole("button", { name: /alert no title in the button/i });
    fireEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john.doe@example.com",
      role: "admin",
    });
  });
});
