import { useState, useEffect } from 'react';
import './landing-page.css';
import imageCarrusel1 from '../../assets/1-image-carousel.jpg';
import imageCarrusel2 from '../../assets/2-image-carousel.jpg';
import imageCarrusel3 from '../../assets/3-image-carousel.jpg';

const images = [imageCarrusel1, imageCarrusel2, imageCarrusel3];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [resetTimer]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setResetTimer((prev) => !prev);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setResetTimer((prev) => !prev);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setResetTimer((prev) => !prev);
  };

  return (
    <div className="landing-page">
      <header className="landing-page__header">
        <a href="#top" className="landing-page__logo">ASERHI</a>
        <nav className="landing-page__nav">
          <ul className="landing-page__nav-list">
            <li><a href="#top" className="landing-page__nav-link">Inicio</a></li>
            <li><a href="#about" className="landing-page__nav-link">Sobre Nosotros</a></li>
            <li><a href="#services" className="landing-page__nav-link">Servicios</a></li>
            <li><a href="#contact" className="landing-page__nav-link">Contactos</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="carousel">
          <div className="carousel__overlay">
            <div className="carousel__text">
              <h1>ASERHI</h1>
              <p>Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.</p>
            </div>
            <div className="explore__button">
              <a href="#about" className='button__started'>
                <svg className="icon__start" height={22} width={22} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="play-svg" aria-labelledby="play-svg" aria-hidden="true" role="img">
                  <title id="play-svg">Reproducir</title>
                  <path d="M5.944 3C5.385 3 5 3.445 5 4.22v16.018c0 .771.384 1.22.945 1.22.234 0 .499-.078.779-.243l13.553-7.972c.949-.558.952-1.468 0-2.028L6.724 3.243C6.444 3.078 6.178 3 5.944 3m1.057 2.726l11.054 6.503L7 18.732l.001-13.006"></path>
                </svg> Quiero Explorar
              </a>
            </div>
            <div className="carousel__pagination">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`carousel__dot ${index === currentIndex ? 'carousel__dot--active' : ''}`}
                  onClick={() => goToIndex(index)}
                ></span>
              ))}
            </div>
          </div>
          <button className="carousel__button carousel__button--prev" onClick={goToPrevious}>
            &#10094;
          </button>
          <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel__image" />
          <button className="carousel__button carousel__button--next" onClick={goToNext}>
            &#10095;
          </button>
        </section>
        <section id="about" className="about">
          <div className='about__content about__us'>
            <h2 className='about__title'>Sobre Nosotros</h2>
            <p className='about__paragrapht'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta facilis placeat expedita mollitia nisi necessitatibus ab doloremque eaque ea debitis voluptatum quia saepe asperiores ducimus voluptates vitae, accusantium harum.</p>
          </div>
          <div className='about__content about__content--flex'>
            <div className="abaut-content__card">
              <div className="card__content">
                <div className="icon__container">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="mountain-sun" width={75} height={75} className="icon__card svg-inline--fa fa-mountain-sun text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z"></path></svg>
                </div>
                <div className="card__content--text">
                  <h5 className="card__content--title">Misión</h5>
                  <p className="card__content--description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
            <div className="abaut-content__card abaut-content__card--special">
              <div className="card__content card__content--special">
                <div className="icon__container">
                  <svg aria-hidden="true" width={75} height={75} focusable="false" data-prefix="fas" data-icon="bullseye" className="svg-inline--fa fa-bullseye text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg>
                </div>
                <div className="card__content--text card__content--text-special">
                  <h5 className="card__content--title card__content--title-special">Visión</h5>
                  <p className="card__content--description card__content--description-special">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id='services' className='about__content abaut__content--services'>
            <h2 className='about__title'>Nuestros Servicios</h2>
            <p className='about__paragrapht'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta facilis placeat expedita mollitia nisi necessitatibus ab doloremque eaque ea debitis voluptatum quia saepe asperiores ducimus voluptates vitae, accusantium harum.</p>
          </div>
          <div className='about__content about__content--margin about__content--flex'>
            <div className="abaut-content__card">
              <div className="card__content">
                <div className="icon__container">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="seedling" width={75} height={75} className="svg-inline--fa fa-seedling text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 32c0 113.6-84.6 207.5-194.2 222c-7.1-53.4-30.6-101.6-65.3-139.3C290.8 46.3 364 0 448 0h32c17.7 0 32 14.3 32 32zM0 96C0 78.3 14.3 64 32 64H64c123.7 0 224 100.3 224 224v32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V320C100.3 320 0 219.7 0 96z"></path></svg>
                </div>
                <div className="card__content--text">
                  <h5 className="card__content--title">Primer Proceso</h5>
                  <p className="card__content--description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
            <div className="abaut-content__card abaut-content__card--special">
              <div className="card__content card__content--special">
                <div className="icon__container">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tractor" width={75} height={75} className="svg-inline--fa fa-tractor text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 64c0-35.3 28.7-64 64-64H266.3c26.2 0 49.7 15.9 59.4 40.2L373.7 160H480V126.2c0-24.8 5.8-49.3 16.9-71.6l2.5-5c7.9-15.8 27.1-22.2 42.9-14.3s22.2 27.1 14.3 42.9l-2.5 5c-6.7 13.3-10.1 28-10.1 42.9V160h56c22.1 0 40 17.9 40 40v45.4c0 16.5-8.5 31.9-22.6 40.7l-43.3 27.1c-14.2-5.9-29.8-9.2-46.1-9.2c-39.3 0-74.1 18.9-96 48H352c0 17.7-14.3 32-32 32h-8.2c-1.7 4.8-3.7 9.5-5.8 14.1l5.8 5.8c12.5 12.5 12.5 32.8 0 45.3l-22.6 22.6c-12.5 12.5-32.8 12.5-45.3 0l-5.8-5.8c-4.6 2.2-9.3 4.1-14.1 5.8V480c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32v-8.2c-4.8-1.7-9.5-3.7-14.1-5.8l-5.8 5.8c-12.5 12.5-32.8 12.5-45.3 0L40.2 449.1c-12.5-12.5-12.5-32.8 0-45.3l5.8-5.8c-2.2-4.6-4.1-9.3-5.8-14.1H32c-17.7 0-32-14.3-32-32V320c0-17.7 14.3-32 32-32h8.2c1.7-4.8 3.7-9.5 5.8-14.1l-5.8-5.8c-12.5-12.5-12.5-32.8 0-45.3l22.6-22.6c9-9 21.9-11.5 33.1-7.6V192 160 64zm170.3 0H160v96h32H304.7L266.3 64zM176 256a80 80 0 1 0 0 160 80 80 0 1 0 0-160zM528 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm0 64c-48.6 0-88-39.4-88-88c0-29.8 14.8-56.1 37.4-72c14.3-10.1 31.8-16 50.6-16c2.7 0 5.3 .1 7.9 .3c44.9 4 80.1 41.7 80.1 87.7c0 48.6-39.4 88-88 88z"></path></svg>
                </div>
                <div className="card__content--text card__content--text-special">
                  <h5 className="card__content--title card__content--title-special">Segundo Proceso</h5>
                  <p className="card__content--description card__content--description-special">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
            <div className="abaut-content__card">
              <div className="card__content">
                <div className="icon__container">
                  <svg aria-hidden="true" focusable="false" width={75} height={75} data-prefix="fas" data-icon="recycle" className="svg-inline--fa fa-recycle text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M174.7 45.1C192.2 17 223 0 256 0s63.8 17 81.3 45.1l38.6 61.7 27-15.6c8.4-4.9 18.9-4.2 26.6 1.7s11.1 15.9 8.6 25.3l-23.4 87.4c-3.4 12.8-16.6 20.4-29.4 17l-87.4-23.4c-9.4-2.5-16.3-10.4-17.6-20s3.4-19.1 11.8-23.9l28.4-16.4L283 79c-5.8-9.3-16-15-27-15s-21.2 5.7-27 15l-17.5 28c-9.2 14.8-28.6 19.5-43.6 10.5c-15.3-9.2-20.2-29.2-10.7-44.4l17.5-28zM429.5 251.9c15-9 34.4-4.3 43.6 10.5l24.4 39.1c9.4 15.1 14.4 32.4 14.6 50.2c.3 53.1-42.7 96.4-95.8 96.4L320 448v32c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-64-64c-9.4-9.4-9.4-24.6 0-33.9l64-64c6.9-6.9 17.2-8.9 26.2-5.2s14.8 12.5 14.8 22.2v32l96.2 0c17.6 0 31.9-14.4 31.8-32c0-5.9-1.7-11.7-4.8-16.7l-24.4-39.1c-9.5-15.2-4.7-35.2 10.7-44.4zm-364.6-31L36 204.2c-8.4-4.9-13.1-14.3-11.8-23.9s8.2-17.5 17.6-20l87.4-23.4c12.8-3.4 26 4.2 29.4 17L182 241.2c2.5 9.4-.9 19.3-8.6 25.3s-18.2 6.6-26.6 1.7l-26.5-15.3L68.8 335.3c-3.1 5-4.8 10.8-4.8 16.7c-.1 17.6 14.2 32 31.8 32l32.2 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32.2 0C42.7 448-.3 404.8 0 351.6c.1-17.8 5.1-35.1 14.6-50.2l50.3-80.5z"></path></svg>
                </div>
                <div className="card__content--text">
                  <h5 className="card__content--title">Tercer Proceso</h5>
                  <p className="card__content--description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                <p className="footer__item-description">602 834 6956 / 315 462 8623</p>
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
      </main>
    </div>
  );
};

export default LandingPage;