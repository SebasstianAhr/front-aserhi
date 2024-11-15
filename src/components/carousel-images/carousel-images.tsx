import carouselImage1 from '../../assets/2-image-carousel.jpg'
import './carousel-images.css'

const Carousel = (): JSX.Element => {
  return (
    <div className='carousel__component'>
        <img className='carousel__image' src={carouselImage1} alt="Image to carousel" />
    </div>
  )
}

export default Carousel