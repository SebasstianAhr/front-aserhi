import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../src/components/sidebar/sidebar';
import '@testing-library/jest-dom';

// Mock del util para obtener items del menú
jest.mock('../../src/core/utils/menu-items.util', () => ({
  MenuItemsUtil: {
    getMenuItems: jest.fn(),
  },
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Mock de los elementos del menú
    const mockedMenuItems = [
      { label: 'Item 1', route: '/item1' },
      { label: 'Item 2', route: '/item2' },
    ];
    jest.requireMock('../../src/core/utils/menu-items.util').MenuItemsUtil.getMenuItems.mockReturnValue(mockedMenuItems);
  });

  test('debería renderizar el logo correctamente', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logo = screen.getByAltText('Logo Aserhi');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('Logo.jpeg'));
  });

  test('debería renderizar el enlace a la página de inicio', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  test('debería renderizar los elementos del menú dinámico', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const menuItem1 = screen.getByText('Item 1');
    const menuItem2 = screen.getByText('Item 2');

    expect(menuItem1).toBeInTheDocument();
    expect(menuItem2).toBeInTheDocument();
  });

  test('debería mostrar el botón de cerrar sesión', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logoutText = screen.getByText(/Cerrar sesión/i);
    expect(logoutText).toBeInTheDocument();
  });
});
