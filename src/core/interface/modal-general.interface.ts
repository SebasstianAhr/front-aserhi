export interface ModalProp {
    children: JSX.Element,
    openModal: boolean,
    closeModal: (open: boolean) => void,
    title: string,
    showHeader: boolean,
    showOverlay: boolean,
}