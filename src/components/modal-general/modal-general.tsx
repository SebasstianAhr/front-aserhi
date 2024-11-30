import './modal-general.css'

interface ModalProp {
    children: JSX.Element,
    openModal: boolean,
    closeModal: (open: boolean) => void,
    title: string,
    showHeader: boolean,
    showOverlay: boolean,
}

const ModalGeneral = ({
    children,
    openModal,
    closeModal,
    title = 'Alert no title',
    showHeader,
    showOverlay
}: ModalProp): JSX.Element => {


    return (
        <>
            {openModal &&
                <div className={` modal__overlay ${showOverlay ? 'modal__overlay--show' : 'modal__overlay--no-show'}`}>
                    <div className='modal__content'>
                        {showHeader &&
                            <div className="modal__head">
                                <h3 className='modal__title'>{title}</h3>
                            </div>
                        }
                        <button onClick={() => closeModal(false)} className='modal__close'>X</button>
                        <div className='modal__children'>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalGeneral