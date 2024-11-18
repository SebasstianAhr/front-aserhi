import EmployeeCardInfo from '../../src/components/employees-card-info/employee-card-info';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom'; Es como que no me reconoce el archivo setupTest y no me deja hacer las pruebas


describe('EmployeeCardInfo', () => {
  test('renders the employee card info correctly', () => {
    const { container } = render(<EmployeeCardInfo />);

    // Verificar que el título "Empleados" está presente
    expect(screen.getByText('Empleados')).toBeInTheDocument();

    // Verificar que el número "4" está presente
    expect(screen.getByText('4')).toBeInTheDocument();

    // Verificar que el texto "100% de empleados" está presente
    expect(screen.getByText('100% de empleados')).toBeInTheDocument();

    // Verificar que la barra de porcentaje está presente usando querySelector
    const percentageBar = container.querySelector('.card__percentage-bar');
    expect(percentageBar).toBeInTheDocument();
  });
});
