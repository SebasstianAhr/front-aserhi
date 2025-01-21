import { useEffect, useState, useCallback } from 'react';
import './profiles.css';
import TableDataContent from '../../../components/table-data-content/table-data-content';
import SearchFilter from '../../../components/search-filter/search-filter';
import { getProfiles } from '../../../services/profile.services';

const Profiles = (): JSX.Element => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getProfiles();
      setProfiles(data);
      setFilteredProfiles(data);
    };

    fetchProfiles();
  }, []);

  const handleFilterChange = useCallback((filters: Record<string, any>) => {
    let filteredData = [...profiles];

    if (filters.nombre) {
      filteredData = filteredData.filter(profile =>
        profile.nombre.toLowerCase().includes(filters.nombre.toLowerCase())
      );
    }

    setFilteredProfiles(filteredData);
  }, [profiles]);

  const columns = [
    { label: 'ID', item: 'id' },
    { label: 'Nombre', item: 'nombre' },
    { label: 'Acción', item: 'acciones' },
  ];

  const renderActions = (row: any) => (
    <div className="table__actions">
      <svg
        className='icon__action icon__action--view' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>
    </div>
  );

  const filterFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Buscar por nombre' },
  ];

  return (
    <div className='profile-page'>
      <h1 className='profile-page__title'>Gestión de Perfiles</h1>
      <div className="profile-page__add-icon">
        <svg
          aria-hidden="true"
          width={44}
          height={44}
          focusable="false"
          data-prefix="fas"
          data-icon="plus"
          className="charges__icon-add svg-inline--fa fa-plus fa-xl "
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
          />
        </svg>
      </div>
      <div className="profile-page__content profile-page__content--search-filter">
        <SearchFilter fieldsFilter={filterFields} onFilterChange={handleFilterChange} />
      </div>
      <div className="profile-page__content profile-page__content--table">
        <TableDataContent
          data={filteredProfiles}
          columns={columns}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          renderActions={renderActions}
        />
      </div>
    </div>
  );
};

export default Profiles;