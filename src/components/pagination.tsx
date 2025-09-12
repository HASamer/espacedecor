'use client';

import { useFilter } from '@/contexts/FilterContext';

interface PaginationProps {
  totalItems: number;
}

export default function Pagination({ totalItems }: PaginationProps) {
  const { currentPage, setCurrentPage, itemsPerPage } = useFilter();
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to page 1 if current page exceeds total pages
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }
  
  // Don't show pagination if there's only one page or no items
  if (totalPages <= 1) {
    return null;
  }
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top when changing pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page range, and last page
      if (currentPage <= 3) {
        // Show first 3 pages + last page
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        if (totalPages > 4) {
          pages.push(-1); // Ellipsis
        }
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + last 3 pages
        pages.push(1);
        if (totalPages > 4) {
          pages.push(-1); // Ellipsis
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + current range + last page
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-2); // Ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-6">
      {/* Previous button */}
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="grid size-8 place-content-center rounded border border-blue-950 transition-colors hover:text-white hover:bg-blue-950 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-blue-950 disabled:cursor-not-allowed rtl:rotate-180"
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {/* Page numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === -1 || page === -2) {
          // Ellipsis
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }
        
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors ${
              currentPage === page
                ? 'border-blue-950 bg-blue-950 text-white'
                : 'border-blue-950 text-blue-950 hover:text-white hover:bg-blue-950'
            }`}
          >
            {page}
          </button>
        );
      })}
      
      {/* Next button */}
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="grid size-8 place-content-center rounded border border-blue-950 transition-colors hover:text-white hover:bg-blue-950 disabled:hover:bg-white disabled:hover:text-blue-950 disabled:opacity-50 disabled:cursor-not-allowed rtl:rotate-180"
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
    </div>
  );
}
