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
    <div id="top" className="landing-page">
      <header className="landing-page__header">
        <a href="#top" className="landing-page__logo">ASERHI</a>
        <nav className="landing-page__nav">
          <ul className="landing-page__nav-list">
            <li><a href="#about" className="landing-page__nav-link">Sobre Nosotros</a></li>
            <li><a href="#mission" className="landing-page__nav-link">Misión</a></li>
            <li><a href="#vision" className="landing-page__nav-link">Visión</a></li>
            <li><a href="#services" className="landing-page__nav-link">Servicios</a></li>
            <li><a href="#contact" className="landing-page__nav-link">Contactos</a></li>
            <li><a href="#location" className="landing-page__nav-link">Ubicación</a></li>
          </ul>
        </nav>
      </header>
      <div className="carousel">
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
      </div>
      <section id="about" className="section about">
        <h2>Sobre Nosotros</h2>
        <p>Información sobre la empresa.</p>
      </section>
      <section id="mission" className="section mission">
        <h2>Misión</h2>
        <p>Nuestra misión es...</p>
      </section>
      <section id="vision" className="section vision">
        <h2>Visión</h2>
        <p>Nuestra visión es...</p>
      </section>
      <section id="services" className="section services">
        <h2>Servicios</h2>
        <p>Descripción de los servicios ofrecidos.</p>
      </section>
      <section id="contact" className="section contact">
        <h2>Contactos</h2>
        <p>Información de contacto.</p>
      </section>
      <section id="location" className="section location">
        <h2>Ubicación</h2>
        <p>Información sobre la ubicación.</p>
      </section>
    </div>
  );
};

export default LandingPage;