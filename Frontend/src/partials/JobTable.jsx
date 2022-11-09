import axios from 'axios';
import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const JobTable = ({ data, onDelete, onEdit, onAllocate, onRemove, incData }) => {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const [filterArea, setfilterArea] = useState('');
  const [filterResource, setFilterResource] = useState('');
  const [filterSite, setfilterSite] = useState('');
  const [filterProduct, setfilterProduct] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  async function deleteHandler(id) {
    const data = {
      id: id
    };
    const res = await axios.post('/api/delete_job', data);
    if (res.status === 200) {
      onDelete();
      notyf.error('Deleted Job');
    }
  }

  const allocationHandler = data => {
    onAllocate(data);
  };

  async function removeResHandler(id) {
    const data = {
      id: id
    };
    const res = await axios.post('/api/remove_res', data);
    if (res.status === 200) {
      onRemove();
      notyf.error('Removed Resources');
    }
  }

  async function editHandler(id) {
    const data = {
      id: id
    };
    onEdit(data);
  }

  const getProfileHandler = id => {
    navigate(`/job-data/${id}`);
  };

  const filterAreaHandler = e => {
    setfilterArea(e.target.value);
  };

  const filterResourceHandler = e => {
    setFilterResource(e.target.value);
  };

  const filterSiteHandler = e => {
    setfilterSite(e.target.value);
  };

  const filterProductHandler = e => {
    setfilterProduct(e.target.value);
  };

  const filterStartDateHandler = e => {
    setFilterStartDate(e.target.value);
  };

  const filterEndDateHandler = e => {
    setFilterEndDate(e.target.value);
  };

  const filterDataHandler = () => {
    console.log(incData);
    let results = [];
    if (filterStartDate && filterEndDate) {
      //ALgo HERE
      let filteredIncData = incData.filter(item => new Date(item.startDate) >= new Date(filterStartDate) && new Date(item.endDate) <= new Date(filterEndDate));
      if (filterResource && filterSite && filterProduct) {
        results = filteredIncData.filter(item => item.resources.includes(filterResource) && item.site === filterSite && item.product === filterProduct);
      } else if (filterResource && filterSite && !filterProduct) {
        results = filteredIncData.filter(item => item.resources.includes(filterResource) && item.site === filterSite);
      } else if (filterResource && filterProduct && !filterSite) {
        results = filteredIncData.filter(item => item.resources.includes(filterResource) && item.product === filterProduct);
      } else if (filterSite && filterProduct && !filterResource) {
        results = filteredIncData.filter(item => item.site === filterSite && item.product === filterProduct);
      } else if (!filterResource && filterSite && !filterProduct) {
        results = filteredIncData.filter(item => item.site === filterSite);
      } else if (!filterResource && !filterSite && filterProduct) {
        results = filteredIncData.filter(item => item.product === filterProduct);
      } else if (filterResource && !filterSite && !filterProduct) {
        results = filteredIncData.filter(item => item.resources.includes(filterResource));
      } else if (!filterResource && !filterSite && !filterProduct) {
        results = filteredIncData;
      }
    } else if (!filterStartDate && !filterEndDate) {
      if (filterResource && filterSite && filterProduct) {
        results = incData.filter(item => item.resources.includes(filterResource) && item.site === filterSite && item.product === filterProduct);
      } else if (filterResource && filterSite && !filterProduct) {
        results = incData.filter(item => item.resources.includes(filterResource) && item.site === filterSite);
      } else if (filterResource && filterProduct && !filterSite) {
        results = incData.filter(item => item.resources.includes(filterResource) && item.product === filterProduct);
      } else if (filterSite && filterProduct && !filterResource) {
        results = incData.filter(item => item.site === filterSite && item.product === filterProduct);
      } else if (!filterResource && filterSite && !filterProduct) {
        results = incData.filter(item => item.site === filterSite);
      } else if (!filterResource && !filterSite && filterProduct) {
        results = incData.filter(item => item.product === filterProduct);
      } else if (filterResource && !filterSite && !filterProduct) {
        results = incData.filter(item => item.resources.includes(filterResource));
      }
    } else {
      notyf.error('Select both Start & End Dates');
    }

    if (results.length === 0) {
      notyf.error('No Results Found');
    }

    setFilterData(results);
  };

  return (
    <div className='p-5'>
      <div className='text-center'>
        <input type='text' name='site' id='site' placeholder='Resource Here' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-1/4 shadow-sm m-5 sm:text-sm border-gray-300 rounded-md' onChange={filterResourceHandler} />
        <input type='text' name='site' id='site' placeholder='Site Here' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-1/4 shadow-sm m-5 sm:text-sm border-gray-300 rounded-md' onChange={filterSiteHandler} />
        <input type='text' name='site' id='site' placeholder='Product Here' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-1/4 shadow-sm m-5 sm:text-sm border-gray-300 rounded-md' onChange={filterProductHandler} />
        <input type='date' name='site' id='site' placeholder='Product Here' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-1/4 shadow-sm m-5 sm:text-sm border-gray-300 rounded-md' onChange={filterStartDateHandler} />
        <input type='date' name='site' id='site' placeholder='Product Here' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500  w-1/4 shadow-sm m-5 sm:text-sm border-gray-300 rounded-md' onChange={filterEndDateHandler} />
        <button className='mt-1 mx-auto btn focus:ring-indigo-500 focus:border-indigo-500  w-1/5  shadow-sm p-3 sm:text-sm border-gray-300 rounded-md bg-indigo-600 text-white' onClick={filterDataHandler}>
          Filter
        </button>
      </div>
      {/* <div className='text-center'>
        <button className='mt-1 mx-auto btn focus:ring-indigo-500 focus:border-indigo-500  w-3/4 block shadow-sm p-3 sm:text-sm border-gray-300 rounded-md'>Filter</button>
      </div> */}
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-4 inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-center'>
                <thead className='border-b bg-indigo-700'>
                  <tr>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      #
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Description
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Start
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      End
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Area
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Site
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Product
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Resources
                    </th>

                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.length > 0
                    ? filterData.map((item, index) => {
                        return (
                          <tr className='bg-white border-b' key={uuidv4()}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => getProfileHandler(item._id)}>
                                {index + 1}
                              </button>
                            </td>

                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.description}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.startDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.endDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.area}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.site}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.product}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{Number(item.resources.length) === Number(8) ? 'All Resources' : item.resources.map(res => res + ', ')}</td>

                            <td>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => editHandler(item._id)}>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                </svg>
                              </button>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => deleteHandler(item._id)}>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' />
                                </svg>
                              </button>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} onClick={() => allocationHandler(item)}>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                              </button>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} onClick={() => allocationHandler(item)}>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : data.map((item, index) => {
                        return (
                          <tr className='bg-white border-b' key={uuidv4()}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => getProfileHandler(item._id)}>
                                {index + 1}
                              </button>
                            </td>

                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.description}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.startDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.endDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.area}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.site}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.product}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{Number(item.resources.length) === Number(8) ? 'All Resources' : item.resources.map(res => res + ', ')}</td>

                            <td>
                              {item.activity !== 'Leave' && item.activity !== 'Public Holiday' && (
                                <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full m-1' onClick={() => editHandler(item._id)}>
                                  <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                                  </svg>
                                </button>
                              )}

                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => deleteHandler(item._id)}>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' />
                                </svg>
                              </button>

                              {item.activity !== 'Leave' && item.activity !== 'Public Holiday' && (
                                <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>
                                  <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2} onClick={() => allocationHandler(item)}>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                  </svg>
                                </button>
                              )}
                              {item.activity !== 'Leave' && item.activity !== 'Public Holiday' && (
                                <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => removeResHandler(item._id)}>
                                  <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' />
                                  </svg>
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
