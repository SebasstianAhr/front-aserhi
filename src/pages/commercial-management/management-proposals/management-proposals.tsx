import { useEffect, useState } from 'react';
import { getProposals } from '../../../services/management-proposals.services';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import SearchFilter from '../../../components/search-filter/search-filter';
import './management-proposals.css';

const ManagementProposals = (): JSX.Element => {
  const [proposals, setProposals] = useState([]);
  const [filteredProposals, setFilteredProposals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposals();
        setProposals(data);
        setFilteredProposals(data);
      } catch (error) {
        console.error("Failed to fetch proposals:", error);
      }
    };

    fetchProposals();
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    let filteredData = [...proposals];

    if (filters.search) {
      filteredData = filteredData.filter(proposal =>
        proposal.razonSocial.toLowerCase().includes(filters.search.toLowerCase()) ||
        proposal.nombreSolicitante.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.fechaPropuestaDesde && filters.fechaPropuestaHasta) {
      filteredData = filteredData.filter(proposal =>
        new Date(proposal.fechaPropuesta) >= new Date(filters.fechaPropuestaDesde) &&
        new Date(proposal.fechaPropuesta) <= new Date(filters.fechaPropuestaHasta)
      );
    }

    if (filters.estadoRevision && filters.estadoRevision !== "all") {
      filteredData = filteredData.filter(proposal =>
        proposal.estadoRevision === filters.estadoRevision
      );
    }

    if (filters.estadoPropuesta && filters.estadoPropuesta !== "all") {
      filteredData = filteredData.filter(proposal =>
        proposal.estadoPropuesta === filters.estadoPropuesta
      );
    }

    setFilteredProposals(filteredData);
  };

  const fieldsFilter = [
    { name: 'search', label: 'Buscar', type: 'text', placeholder: 'Buscar por razón social o nombre solicitante' },
    { name: 'fechaPropuestaDesde', label: 'Fecha Propuesta Desde', type: 'date' },
    { name: 'fechaPropuestaHasta', label: 'Fecha Propuesta Hasta', type: 'date' },
    { name: 'estadoRevision', label: 'Estado Revisión', type: 'select', options: [
      { label: 'Todos', value: 'all' },
      { label: 'Pendiente', value: 'Pendiente' },
      { label: 'Aprobado', value: 'Aprobado' },
      { label: 'Rechazado', value: 'Rechazado' },
    ]},
    { name: 'estadoPropuesta', label: 'Estado Propuesta', type: 'select', options: [
      { label: 'Todos', value: 'all' },
      { label: 'En Proceso', value: 'En Proceso' },
      { label: 'Finalizado', value: 'Finalizado' },
    ]},
  ];

  const columns = [
    { item: 'id', label: 'ID' },
    { item: 'razonSocial', label: 'Razón Social' },
    { item: 'nombreSolicitante', label: 'Nombre Solicitante' },
    { item: 'fechaPropuesta', label: 'Fecha Propuesta' },
    { item: 'estadoRevision', label: 'Estado Revisión' },
    { item: 'estadoPropuesta', label: 'Estado Propuesta' },
    { item: 'acciones', label: 'Acciones' },
  ];

  return (
    <div className='management-proposals'>
      <h1 className='management-proposals__title'>Gestión de Propuestas</h1>
      <div className='management-proposals__content management-proposals__content--search-filter'>
        <SearchFilter fieldsFilter={fieldsFilter} onFilterChange={handleFilterChange} />
      </div>
      <div className='management-proposals__content management-proposals__content--table'>
        <TableDataContent
          data={filteredProposals}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          onViewEmployee={(id) => console.log('View proposal', id)}
          onEditEmployee={(id) => console.log('Edit proposal', id)}
          enableSorting={true}
        />
      </div>
    </div>
  );
};

export default ManagementProposals;