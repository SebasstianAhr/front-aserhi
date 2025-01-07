import { ModalProp } from '../../core/interface/modal-general.interface'
import './modal-general.css'

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
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default ModalGeneral