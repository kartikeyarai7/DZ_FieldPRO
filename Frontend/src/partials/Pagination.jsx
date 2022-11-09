import { v4 as uuidv4 } from 'uuid';
const PaginationTable = ({ currentPage, nPages, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className='flex items-center justify-between  bg-white px-4 py-3 sm:px-6 mb-5'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <div href='#' className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50' onClick={prevPage}>
          Previous
        </div>
        <div href='#' className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50' onClick={nextPage}>
          Next
        </div>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{currentPage}</span> out of <span className='font-medium'>{nPages}</span>
          </p>
        </div>
        <div>
          <nav className='relative z-0 inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
            <div href='#' className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50' onClick={prevPage}>
              <span className='sr-only'>Previous</span>
              <span className='text-center'>Prev</span>
            </div>

            {pageNumbers &&
              pageNumbers.length > 0 &&
              pageNumbers.map(pgNumber => {
                return (
                  <div href='#' aria-current='page' className='relative z-10 inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-indigo-600' onClick={() => setCurrentPage(pgNumber)} key={uuidv4()}>
                    {pgNumber}
                  </div>
                );
              })}

            <div href='#' className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50' onClick={nextPage}>
              <span className='sr-only'>Next</span>
              <span className='text-center'>Next</span>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PaginationTable;
