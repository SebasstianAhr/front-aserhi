import ModalGeneral from "../../src/components/modal-general/modal-general";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';


describe("ModalGeneral Component", () => {
  const defaultProps = {
    openModal: true,
    closeModal: jest.fn(), 
    title: "Test Modal",
    showHeader: true,
    showOverlay: true,
    children: <p>Modal Content</p>,
  };

  it("renders correctly when openModal is true", () => {
    render(<ModalGeneral {...defaultProps} />);
    
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
  });

  it("does not render when openModal is false", () => {
    render(<ModalGeneral {...defaultProps} openModal={false} />);
    
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls closeModal when the close button is clicked", () => {
    render(<ModalGeneral {...defaultProps} />);
    
    const closeButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);

    expect(defaultProps.closeModal).toHaveBeenCalledWith(false);
  });

  it("does not show header when showHeader is false", () => {
    render(<ModalGeneral {...defaultProps} showHeader={false} />);
    
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("applies overlay class based on showOverlay prop", () => {
    const { container: withOverlay } = render(<ModalGeneral {...defaultProps} showOverlay={true} />);
    const { container: withoutOverlay } = render(<ModalGeneral {...defaultProps} showOverlay={false} />);
    
    expect(withOverlay.querySelector(".modal__overlay--show")).toBeTruthy();
    expect(withoutOverlay.querySelector(".modal__overlay--no-show")).toBeTruthy();
  });

  it("uses default title if none is provided", () => {
    render(<ModalGeneral {...defaultProps} title={undefined as unknown as string} />);
    
    expect(screen.getByText("Alert no title")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(<ModalGeneral {...defaultProps} />);
    
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });
});
