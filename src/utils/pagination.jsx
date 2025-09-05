import React from 'react';

const Pagination = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
      
      if (currentPage <= 4) {
        startPage = 2;
        endPage = 5;
      }
      
      if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      }
      
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between p-4  border-t border-gray-200">
      {/* Left side - Page info */}
      <div className="text-sm text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </div>

      {/* Center - Page navigation */}
      <div className="flex items-center space-x-1">
        {/* First page */}
        <button
          onClick={() => onChangePage(1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          title="First page"
        >
          «
        </button>

        {/* Previous page */}
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          title="Previous page"
        >
          ‹
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => onChangePage(pageNumber)}
              className={`px-4 py-2  rounded-md transition-colors font-medium ${
                currentPage === pageNumber 
                  ? 'bg-[var(--primary)] text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {pageNumber}
            </button>
          )
        ))}

        {/* Next page */}
        <button
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          title="Next page"
        >
          ›
        </button>

        {/* Last page */}
        <button
          onClick={() => onChangePage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
          title="Last page"
        >
          »
        </button>
      </div>

      {/* Right side - Rows per page */}
      <div className="relative">
        <select 
          className="appearance-none pl-3 pr-8 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-transparent focus:border-[var(--primary)]"
          value={rowsPerPage}
          onChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
        >
          <option value={7}>7 / page</option>
          <option value={10}>10 / page</option>
          <option value={15}>15 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Pagination;