import { render, screen, fireEvent } from '@testing-library/react';
import ItemNavigationMenu from '../../src/components/item-navigation-menu/item-navigation-menu';
import { BrowserRouter } from 'react-router-dom';

const mockMenuItems = [
  {
    title: 'Menu 1',
    subMenus: [
      { title: 'Submenu 1', link: '/submenu1' },
      { title: 'Submenu 2', link: '/submenu2' },
    ],
  },
  {
    title: 'Menu 2',
    subMenus: [
      { title: 'Submenu 3', link: '/submenu3' },
    ],
  },
];

describe('ItemNavigationMenu Component', () => {
  test('renders menu items correctly', () => {
    render(
      <BrowserRouter>
        <ItemNavigationMenu menuItems={mockMenuItems} />
      </BrowserRouter>
    );

    // Verifica que los títulos principales están presentes
    const menu1 = screen.getByText('Menu 1');
    const menu2 = screen.getByText('Menu 2');
    expect(menu1).toBeDefined();
    expect(menu2).toBeDefined();

    // Verifica que los submenús no se muestran inicialmente
    expect(screen.queryByText('Submenu 1')).toBeNull();
    expect(screen.queryByText('Submenu 3')).toBeNull();
  });

  test('opens and closes submenus on click', () => {
    render(
      <BrowserRouter>
        <ItemNavigationMenu menuItems={mockMenuItems} />
      </BrowserRouter>
    );

    const menu1 = screen.getByText('Menu 1');

    // Abre el submenú de "Menu 1"
    fireEvent.click(menu1);
    expect(screen.getByText('Submenu 1')).toBeDefined();

    // Cierra el submenú de "Menu 1"
    fireEvent.click(menu1);
    expect(screen.queryByText('Submenu 1')).toBeNull();
  });

  test('renders links with correct paths', () => {
    render(
      <BrowserRouter>
        <ItemNavigationMenu menuItems={mockMenuItems} />
      </BrowserRouter>
    );

    // Abre el primer menú
    fireEvent.click(screen.getByText('Menu 1'));

    const submenuLink = screen.getByText('Submenu 1');
    expect(submenuLink.closest('a')).toHaveAttribute('href', '/submenu1');
  });
});
