import './footer.css'

const Footer = () => {
  return (
    <footer id='contact' className="footer">
    <div className="footer__container">
      <div className="footer__section--items">
        <div className="footer__item">
          <h4 className="footer__item-title">NIT</h4>
          <p className="footer__item-description">830502145</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item-title">DIRECCIÓN</h4>
          <p className="footer__item-description">Cra 8 # 15N-18</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item-title">CONTACTOS</h4>
          <p className="footer__item-description footer__item-description--numbers">602 834 6956 / 315 462 8623</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item-title">EMAIL</h4>
          <p className="footer__item-description">gerencia.aserhi@hotmail.com</p>
        </div>
        <div className="footer__item">
          <h4 className="footer__item-title">GERENTE</h4>
          <p className="footer__item-description">Yhon Elkin Giraldo Aristizabal</p>
        </div>
      </div>
      <div className="footer__section footer__section--activity">
        <h4 className="footer__item-title">ACTIVIDAD ECONÓMICA</h4>
        <p className="footer__item-description">Tratamiento y disposición de desechos peligrosos</p>
      </div>
      <div className="footer__section">
        <p className="footer__copyright"><span className='footer__copyright--modified-text'>© 2021</span> ASERHI SAS ESP. <span className='footer__copyright--modified-text'>All rights reserved.</span></p>
      </div>
    </div>
  </footer>
  )
}

export default Footer