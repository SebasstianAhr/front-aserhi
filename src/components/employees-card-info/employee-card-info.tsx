import './employee-card-info.css'

const EmployeeCardInfo = (): JSX.Element => {
  return (
    <div className='card__component'>
        <h4>Empleados</h4>
        <h5>4</h5>
        <p>100% de empleados</p>
        <div className='card__percentage-bar'></div>
    </div>
  )
}

export default EmployeeCardInfo