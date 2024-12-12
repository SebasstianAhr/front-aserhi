import TableDataContent from "../../src/components/table-data-content/table-data-content";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';


describe("TableDataContent Component", () => {
  const mockData = [
    { id: "1", name: "Alice", estado: true },
    { id: "2", name: "Bob", estado: false },
    { id: "3", name: "Charlie", estado: true },
    { id: "4", name: "Diana", estado: false },
    { id: "5", name: "Edward", estado: true },
  ];

  const mockColumns = [
    { label: "ID", item: "id" },
    { label: "Name", item: "name" },
    { label: "Estado", item: "estado" },
    { label: "Acciones", item: "acciones" },
  ];

  const defaultProps = {
    data: mockData,
    columns: mockColumns,
    itemsPerPage: 2,
    currentPage: 1,
    onPageChange: jest.fn(),
    onItemsPerPageChange: jest.fn(),
    onViewEmployee: jest.fn(),
    onEditEmployee: jest.fn(),
    maxItemsPerPage: 10,
    minItemsPerPage: 2,
  };

  it("renders correctly with data and columns", () => {
    render(<TableDataContent {...defaultProps} />);
    
    mockColumns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });

    expect(screen.getByText("Sebasstian")).toBeInTheDocument();
    expect(screen.getByText("Ahr")).toBeInTheDocument();

    expect(screen.getByText("<<")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  it("calls onPageChange when navigating between pages", () => {
    render(<TableDataContent {...defaultProps} />);
    
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("handles items per page change", () => {
    render(<TableDataContent {...defaultProps} />);
    
    const select = screen.getByLabelText("Mostrar:");
    fireEvent.change(select, { target: { value: "3" } });

    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(3);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onViewEmployee and onEditEmployee correctly", () => {
    render(<TableDataContent {...defaultProps} />);

    const viewButtons = screen.getAllByClassName("icon__action--view");
    fireEvent.click(viewButtons[0]);
    expect(defaultProps.onViewEmployee).toHaveBeenCalledWith("1");

    const editButtons = screen.getAllByClassName("icon__action--edit");
    fireEvent.click(editButtons[0]);
    expect(defaultProps.onEditEmployee).toHaveBeenCalledWith("1");
  });

  it("handles edge cases like empty data", () => {
    render(<TableDataContent {...defaultProps} data={[]} />);
    
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.getByText("Mostrando 0 de 0 registros")).toBeInTheDocument();
  });

  it("disables navigation buttons on first and last pages", () => {
    render(<TableDataContent {...defaultProps} currentPage={1} />);
    
    const previousButton = screen.getByText("<");
    const firstButton = screen.getByText("<<");

    expect(previousButton).toBeDisabled();
    expect(firstButton).toBeDisabled();

    render(<TableDataContent {...defaultProps} currentPage={3} />);
    const nextButton = screen.getByText(">");
    const lastButton = screen.getByText(">>");

    expect(nextButton).toBeDisabled();
    expect(lastButton).toBeDisabled();
  });
});
