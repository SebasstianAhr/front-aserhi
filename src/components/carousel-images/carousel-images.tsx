import carouselImage1 from '../../../public/1-image-carousel.jpg'
import './carousel-images.css'

const Carousel = () => {
  return (
    <div className='carousel__component'>
        <img className='carousel__image' src={carouselImage1} alt="Image to carousel" />
    </div>
  )
}

export default Carousel