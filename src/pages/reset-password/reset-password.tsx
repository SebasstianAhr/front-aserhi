import { PageRouterEnum } from '../../core/enum/page-router.enum'
import { Link } from 'react-router-dom'
import './reset-password.css'

const ResetPassword = () => {
    return (
        <div className='reset'>
            <div className='reset__content'>
                <h3 className='reset__title'>Actualiza tu contraseña</h3>
                <form className='reset__form'>
                    <div className='reset__form-group'>
                        <label className='reset__label'>Introduce tu nueva contraseña</label>
                        <input type="password" className='reset__input' />
                    </div>
                    <div className='reset__form-group reset__form-group--bottom'>
                        <label className='reset__label'>Confirma tu nueva contraseña</label>
                        <input type="password" className='reset__input' />
                    </div>
                </form>
                <div className='reset__link-container'>
                    <Link to={PageRouterEnum.Login} className='reset__link'>
                        <p className='reset__link-text'>Volver al inicio de sesión</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
