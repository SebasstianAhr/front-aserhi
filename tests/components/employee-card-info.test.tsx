import EmployeeCardInfo from '../../src/components/employees-card-info/employee-card-info';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('EmployeeCardInfo', () => {
  test('renders the employee card info correctly', () => {
    const { container } = render(<EmployeeCardInfo />);

    expect(screen.getByText('Empleados')).toBeInTheDocument();

    expect(screen.getByText('4')).toBeInTheDocument();

    expect(screen.getByText('100% de empleados')).toBeInTheDocument();

    const percentageBar = container.querySelector('.card__percentage-bar');
    expect(percentageBar).toBeInTheDocument();
  });
});
