import EmployeeCardInfo from '../../components/employees-card-info/employee-card-info'
import Carousel from '../../components/carousel-images/carousel-images'
import imgStatistics from '../../assets/image-statistics.png'
import './home.css'

const Home = (): JSX.Element => {
  return (
      <main className='home__page'>
        <section className='home__section-top'>
          <div className='home__page-content home--page-content-left'>
            <h3>Estadísticas de empleados</h3>
            <div className='home__section-cards'>
              <EmployeeCardInfo />
              <EmployeeCardInfo />
              <EmployeeCardInfo />
            </div>
          </div>
          <div className='home__page-content home--page-content-right'>
            <h3>Cargos en uso</h3>
            <img src={imgStatistics} alt="image statistics" />
          </div>
        </section>
        <section className='home__section-bottom'>
          <div className='home__page-content'>
            <h3>Imágenes</h3>
            <Carousel/>
          </div>
        </section>
      </main>
  )
}

export default Home