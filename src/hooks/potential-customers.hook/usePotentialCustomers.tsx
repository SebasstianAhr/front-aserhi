import { useState, useEffect } from 'react';
import { getPotentialCustomers } from '../../services/potential-customers.services';
import { PotentialCustomerFormInputs } from '../../core/interface/potential-customer.interface';

const usePotentialCustomers = () => {
  const [potentialCustomers, setpotentialCustomers] = useState<PotentialCustomerFormInputs[]>([]);
  const [filteredPotentialCustomers, setFilteredPotentialCustomers] = useState<PotentialCustomerFormInputs[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getPotentialCustomers();
        setpotentialCustomers(data);
        setFilteredPotentialCustomers(data);
      } catch (error) {
        console.error("Failed to fetch potential customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return {
    potentialCustomers,
    filteredPotentialCustomers,
    setFilteredPotentialCustomers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};

export default usePotentialCustomers;