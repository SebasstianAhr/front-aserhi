import './management-proposals.css'
const ManagementProposals = (): JSX.Element => {
  return (
    <div className='management-proposals'>
      <h1 className='management-proposals__title'>Gestión de Propuestas</h1>
      <div className='management-proposals__content management-proposals__content--search-filter'>
        filter
      </div>
      <div className='management-proposals__content management-proposals__content--table'>
        table
      </div>
    </div>
  )
}

export default ManagementProposals