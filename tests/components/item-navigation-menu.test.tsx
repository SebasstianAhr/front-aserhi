import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ItemNavigationMenu from '../../src/components/item-navigation-menu/item-navigation-menu';
import { MenuItem } from '../../src/core/interface/menu-item.interface';
import '@testing-library/jest-dom';

enum AttributesMenu {
    Menu1 = 'Menu 1',
    Menu2 = 'Menu 2',
    Submenu11 = 'Submenu 1.1',
    Submenu12 = 'Submenu 1.2',
    Submenu21 = 'Submenu 2.1',

    LinkMenu1 = '/menu-1',
    LinkMenu2 = '/menu-2',
    LinkSubmenu11 = '/submenu-1-1',
    LinkSubmenu12 = '/submenu-1-2',
    LinkSubmenu21 = '/submenu-2-1',
}

const mockMenuItems: MenuItem[] = [
    {
        title: AttributesMenu.Menu1,
        link: AttributesMenu.LinkMenu1,
        subMenus: [
            { title: AttributesMenu.Submenu11, link: AttributesMenu.LinkSubmenu11, subMenus: [] },
            { title: AttributesMenu.Submenu12, link: AttributesMenu.LinkSubmenu12, subMenus: [] },
        ],
    },
    {
        title: AttributesMenu.Menu2,
        link: AttributesMenu.LinkMenu2,
        subMenus: [
            { title: AttributesMenu.Submenu21, link: AttributesMenu.LinkSubmenu21, subMenus: [] },
        ],
    },
];



describe('ItemNavigationMenu Component', () => {
    const renderComponent = (menuItems = mockMenuItems) =>
        render(
            <BrowserRouter>
                <ItemNavigationMenu menuItems={menuItems} />
            </BrowserRouter>
        );

    test('renders all main menu items', () => {
        renderComponent();
        expect(screen.getByText(AttributesMenu.Menu1)).toBeInTheDocument();
        expect(screen.getByText(AttributesMenu.Menu2)).toBeInTheDocument();
    });

    test('toggles submenu visibility on click', () => {
        renderComponent();

        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));
        expect(screen.getByText(AttributesMenu.Submenu11)).toBeInTheDocument();
        expect(screen.getByText(AttributesMenu.Submenu12)).toBeInTheDocument();

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));
        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();
    });

    test('renders submenu links correctly', () => {
        renderComponent();

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));

        const link = screen.getByText(AttributesMenu.Submenu11);
        expect(link).toBeInTheDocument();
        expect(link.closest('a')).toHaveAttribute('href', AttributesMenu.LinkSubmenu11);
    });

    test('only one submenu is open at a time', () => {
        renderComponent();

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));
        expect(screen.getByText(AttributesMenu.Submenu11)).toBeInTheDocument();

        fireEvent.click(screen.getByText(AttributesMenu.Menu2));
        expect(screen.getByText(AttributesMenu.Submenu21)).toBeInTheDocument();

        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();
    });

    // Nuevas pruebas

    test('does not throw error when clicking outside interactive elements', () => {
        renderComponent();

        fireEvent.click(document.body); // Simula clic fuera de elementos interactivos

        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();
        expect(screen.queryByText(AttributesMenu.Submenu12)).not.toBeInTheDocument();
    });

    test('handles empty menu gracefully', () => {
        renderComponent([]);

        expect(screen.queryByText(AttributesMenu.Menu1)).not.toBeInTheDocument();
        expect(screen.queryByText(AttributesMenu.Menu2)).not.toBeInTheDocument();
    });

    test('handles menu items with missing data gracefully', () => {
        const brokenMenuItems: MenuItem[] = [
            { title: '', link: '', subMenus: [] }, // Datos incompletos pero válidos
        ];
    
        renderComponent(brokenMenuItems);
    
        expect(screen.queryByText('')).not.toBeInTheDocument(); // Verifica que no se muestren datos incorrectos
    });

    test('closes submenu when navigating away and back', () => {
        renderComponent();

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));
        expect(screen.getByText(AttributesMenu.Submenu11)).toBeInTheDocument();

        fireEvent.click(screen.getByText(AttributesMenu.Submenu11)); // Navega al submenú
        fireEvent.click(document.body); // Simula navegación de regreso

        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();
    });

    test('does not open disabled menu items', () => {
        const disabledMenuItems: MenuItem[] = [
            {
                title: AttributesMenu.Menu1,
                link: AttributesMenu.LinkMenu1,
                subMenus: [
                    { title: AttributesMenu.Submenu11, link: AttributesMenu.LinkSubmenu11, subMenus: [], disabled: true },
                ],
            },
        ] as unknown as MenuItem[];

        renderComponent(disabledMenuItems);

        fireEvent.click(screen.getByText(AttributesMenu.Menu1));
        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument(); // Submenú deshabilitado no se abre
    });

    test('supports keyboard navigation for accessibility', () => {
        renderComponent();

        fireEvent.keyDown(screen.getByText(AttributesMenu.Menu1), { key: 'Enter' }); // Simula apertura con Enter
        expect(screen.getByText(AttributesMenu.Submenu11)).toBeInTheDocument();

        fireEvent.keyDown(screen.getByText(AttributesMenu.Menu1), { key: 'Escape' }); // Simula cierre con Escape
        expect(screen.queryByText(AttributesMenu.Submenu11)).not.toBeInTheDocument();
    });
});

