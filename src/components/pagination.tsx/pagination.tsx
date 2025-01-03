import React from 'react';
import './pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleFirst = () => {
    onPageChange(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={handleFirst}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className="pagination__button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(0, currentPage - 3), currentPage + 2)
        .map((page) => (
          <button
            key={page}
            className={`pagination__button ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

      {currentPage + 2 < totalPages && <span>...</span>}

      <button
        className="pagination__button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        className="pagination__button"
        onClick={handleLast}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;