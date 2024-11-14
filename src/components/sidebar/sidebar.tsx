import logo from '../../../public/Logo.jpeg'
import './sidebar.css'
const Sidebar = (): JSX.Element => {
  return (
    <div className='sidebar'>
      <div className='sidebar__logo-aserhi'>
        <img className='sidebar__image-logo-aserhi' src={logo} alt="Logo Aserhi" />
      </div>
      <div className='navigation__component'>
        <svg
          xmlns="http://www.w3.org/2000/svg" width={22} height={22} color='#02a4e6' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        <p>Home</p>
      </div>
      <span className='log__out'>
        <svg xmlns="http://www.w3.org/2000/svg" color='#84cc16' height={22} width={22} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>

        <p>Cerrar sesión</p>
      </span>
    </div>
  )
}

export default Sidebar