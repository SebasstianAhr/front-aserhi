import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../../src/components/sidebar/sidebar';
import '@testing-library/jest-dom';

jest.mock('../../src/core/utils/menu-items.util', () => ({
  MenuItemsUtil: {
    getMenuItems: jest.fn(),
  },
}));

describe('Sidebar Component', () => {
  beforeEach(() => {
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
    expect(menuItem1.closest('a')).toHaveAttribute('href', '/item1');
    expect(menuItem2).toBeInTheDocument();
    expect(menuItem2.closest('a')).toHaveAttribute('href', '/item2');
  });

  test('debería mostrar el botón de cerrar sesión', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const logoutButton = screen.getByRole('button', { name: /Cerrar sesión/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
  });

  test('debería colapsar o expandir el menú al hacer clic en el ícono', () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const toggleButton = screen.getByRole('button', { name: /Toggle Menu/i });
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const menu = screen.getByTestId('sidebar-menu');
    expect(menu).toHaveClass('expanded');
  });
});
