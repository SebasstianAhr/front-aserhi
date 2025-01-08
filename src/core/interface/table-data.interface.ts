export interface DataTableProps<T> {
    data: T[];
    columns: { label: string; item: keyof T }[];
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    maxItemsPerPage?: number;
    minItemsPerPage?: number;
    onViewEmployee: (id: string) => void;
    onEditEmployee: (id: string) => void;
    enableSorting?: boolean;
  }