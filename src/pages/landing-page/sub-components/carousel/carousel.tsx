import './carousel.css'

interface CarouselProps {
  images: string[];
  currentIndex: number;
  goToPrevious: () => void;
  goToNext: () => void;
  goToIndex: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ images, currentIndex, goToPrevious, goToNext, goToIndex }) => {
  return (
    <section className="carousel">
      <div className="carousel__overlay">
        <div className='carousel__overlay-container'>
          <div className="carousel__text">
            <h1>ASERHI</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur sed doloremque, tenetur assumenda neque eos dolore provident. A labore unde reprehenderit placeat ipsa, aut corporis eius cum reiciendis, mollitia quis?</p>
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
      </div>
      <button className="carousel__button carousel__button--prev" onClick={goToPrevious}>
        &#10094;
      </button>
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="carousel__image" />
      <button className="carousel__button carousel__button--next" onClick={goToNext}>
        &#10095;
      </button>
    </section>
  );
};

export default Carousel;