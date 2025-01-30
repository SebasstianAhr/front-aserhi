import './list-nav.css'

const ListNav = () => {
    return (
        <ul className="landing-page__nav-list">
            <li><a href="#top" className="landing-page__nav-link">Inicio</a></li>
            <li><a href="#about" className="landing-page__nav-link">Sobre Nosotros</a></li>
            <li><a href="#services" className="landing-page__nav-link">Servicios</a></li>
            <li><a href="#contact" className="landing-page__nav-link">Contactos</a></li>
        </ul>
    )
}

export default ListNav