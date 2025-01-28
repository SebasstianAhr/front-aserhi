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
            <li><a href="#about" className="landing-page__nav-link">Sobre Nosotros</a></li>
            <li><a href="#mission" className="landing-page__nav-link">Misión</a></li>
            <li><a href="#vision" className="landing-page__nav-link">Visión</a></li>
            <li><a href="#services" className="landing-page__nav-link">Servicios</a></li>
            <li><a href="#contact" className="landing-page__nav-link">Contactos</a></li>
            <li><a href="#location" className="landing-page__nav-link">Ubicación</a></li>
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
          <div className='about__content about__content--margin about__content--flex'>
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
            <div className="abaut-content__card ">
              <div className="card__content">
                <div className="icon__container">
                <svg aria-hidden="true" width={75} height={75} focusable="false" data-prefix="fas" data-icon="bullseye" className="svg-inline--fa fa-bullseye text-7xl" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 256A192 192 0 1 0 64 256a192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg>
                </div>
                <div className="card__content--text">
                  <h5 className="card__content--title">Misión</h5>
                  <p className="card__content--description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure numquam voluptatum, nisi quas sapiente dolorum possimus modi! Quae itaque reprehenderit in veritatis impedit, non quis ab, temporibus fuga, ullam magnam!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='about__content about__content--margin'>
            <h2 className='about__title'>title</h2>
            <p className='about__paragrapht'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta facilis placeat expedita mollitia nisi necessitatibus ab doloremque eaque ea debitis voluptatum quia saepe asperiores ducimus voluptates vitae, accusantium harum.</p>
          </div>
          <div className='about__content about__content--margin'>
            <h2 className='about__title'>title</h2>
            <p className='about__paragrapht'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta facilis placeat expedita mollitia nisi necessitatibus ab doloremque eaque ea debitis voluptatum quia saepe asperiores ducimus voluptates vitae, accusantium harum.</p>
          </div>
          <div className='about__content about__content--margin'>
            <h2 className='about__title'>title</h2>
            <p className='about__paragrapht'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit soluta facilis placeat expedita mollitia nisi necessitatibus ab doloremque eaque ea debitis voluptatum quia saepe asperiores ducimus voluptates vitae, accusantium harum.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;