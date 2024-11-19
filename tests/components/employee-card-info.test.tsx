 
import EmployeeCardInfo from '../../src/components/employees-card-info/employee-card-info';
 import { render, screen } from '@testing-library/react';



describe('EmployeeCardInfo', () => {
  test('renders the employee card info correctly', () => {
    const { container } = render(<EmployeeCardInfo />);

     // Verificar que el título "Empleados" está presente
     expect(screen.getByText('Empleados')).toBeDefined();

    // Verificar que el número "4" está presente
    expect(screen.getByText('4')).toBeDefined();

    // Verificar que el texto "100% de empleados" está presente
    expect(screen.getByText('100% de empleados')).toBeDefined();

    // Verificar que la barra de porcentaje está presente usando querySelector
    const percentageBar = container.querySelector('.card__percentage-bar');
    expect(percentageBar).toBeDefined();
  });
});

/*
import { add } from '../../src/components/employees-card-info/employee-card-info';

describe('Funciones dentro del componente EmployeeCardInfo', () => {
  describe('add', () => {
    test('Debe retornar la suma de dos números', () => {
      const result = add(4, 5); // Llama a la función con los valores 4 y 5
      expect(result).toBe(9);  // Asegúrate de que el resultado sea 9
    });

    test('Debe retornar 0 cuando ambos números son 0', () => {
      const result = add(0, 0);
      expect(result).toBe(0); // Asegúrate de que 0 + 0 sea 0
    });

    test('Debe manejar números negativos correctamente', () => {
      const result = add(-3, 5);
      expect(result).toBe(2); // Asegúrate de que -3 + 5 sea 2
    });
  });
});*/
