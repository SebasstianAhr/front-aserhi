import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemNavigationMenu from '../../src/components/item-navigation-menu/item-navigation-menu';
import { MenuItem } from '../../src/core/interface/menu-item.interface';
import '@testing-library/jest-dom';

// Datos de ejemplo para las pruebas
const mockMenuItems: MenuItem[] = [
    {
        title: 'Menu 1',
        link: '/menu-1',
        subMenus: [
            { title: 'Submenu 1.1', link: '/submenu-1-1', subMenus: [] },
            { title: 'Submenu 1.2', link: '/submenu-1-2', subMenus: [] },
        ],
    },
    {
        title: 'Menu 2',
        link: '/menu-2',
        subMenus: [
            { title: 'Submenu 2.1', link: '/submenu-2-1', subMenus: [] },
        ],
    },
];

describe('ItemNavigationMenu Component', () => {
    const renderComponent = () =>
        render(
            <BrowserRouter>
                <ItemNavigationMenu menuItems={mockMenuItems} />
            </BrowserRouter>
        );

    test('renders all main menu items', () => {
        renderComponent();
        expect(screen.getByText('Menu 1')).toBeInTheDocument();
        expect(screen.getByText('Menu 2')).toBeInTheDocument();
    });

    test('toggles submenu visibility on click', () => {
        renderComponent();

        // Verify submenu is not visible initially
        expect(screen.queryByText('Submenu 1.1')).not.toBeInTheDocument();

        // Click on "Menu 1" to open the submenu
        fireEvent.click(screen.getByText('Menu 1'));
        expect(screen.getByText('Submenu 1.1')).toBeInTheDocument();
        expect(screen.getByText('Submenu 1.2')).toBeInTheDocument();

        // Click again to close the submenu
        fireEvent.click(screen.getByText('Menu 1'));
        expect(screen.queryByText('Submenu 1.1')).not.toBeInTheDocument();
    });

    test('renders submenu links correctly', () => {
        renderComponent();

        // Open the first menu
        fireEvent.click(screen.getByText('Menu 1'));

        const link = screen.getByText('Submenu 1.1');
        expect(link).toBeInTheDocument();
        expect(link.closest('a')).toHaveAttribute('href', '/submenu-1-1');
    });

    test('only one submenu is open at a time', () => {
        renderComponent();

        // Open the first menu
        fireEvent.click(screen.getByText('Menu 1'));
        expect(screen.getByText('Submenu 1.1')).toBeInTheDocument();

        // Open the second menu
        fireEvent.click(screen.getByText('Menu 2'));
        expect(screen.getByText('Submenu 2.1')).toBeInTheDocument();

        // Verify the first menu is closed
        expect(screen.queryByText('Submenu 1.1')).not.toBeInTheDocument();
    });
});
