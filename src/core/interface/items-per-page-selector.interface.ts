export interface ItemsPerPageSelectorProps {
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  maxItemsPerPage?: number;
  minItemsPerPage?: number;
}