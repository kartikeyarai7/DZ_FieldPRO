import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import axios from 'axios';

const AllocationTable = ({ data, curJob, refreshData, onHide }) => {
  const notyf = new Notyf();
  async function submitHandler(item) {
    const payload = {
      name: item.name,
      rCount: curJob.rCount,
      id: curJob._id
    };
    const res = await axios.post('/api/assign_resource', payload);
    if (res.status === 200) {
      notyf.success('Assigned Resource');
      refreshData();
    } else if (res.status === 205) {
      notyf.error('Requirement Filled');
    } else if (res.status === 204) {
      notyf.error('Assigned Already');
    }
  }

  console.log(curJob);
  console.log(data);

  const hideDisplayHandler = () => {
    onHide();
  };

  // Assigning classes for alternative resources
  const classNameHandler = area => {
    if (area === curJob.area) {
      return 'px-6 py-4 whitespace-nowrap text-sm text-white font-bold bg-green-600';
    } else {
      return 'px-6 py-4 whitespace-nowrap text-sm text-gray-900';
    }
  };

  return (
    <div className='p-8  border-t border-gray-200 '>
      <div>
        <button className='text-xs p-2 btn bg-indigo-600 text-white float-right ' onClick={hideDisplayHandler}>
          X
        </button>
        <div className='text-lg text-center '>Available Resources - {curJob.description}</div>
      </div>

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
                      Name
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Current Allocation
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Region
                    </th>
                    {/* <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Utilization
                    </th> */}
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Status
                    </th>
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    return (
                      <tr className='bg-white border-b' key={uuidv4()}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                          <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>{index + 1}</button>
                        </td>

                        <td className={item.status ? 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'}>{item.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{item.description ? item.description : '-'}</td>

                        {/* <td className={item.data && item.data.site[0] === curJob.site ? 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'}>{item.data ? item.data.site[0] : '-'}</td> */}
                        <td className={(item.data && item.data.area === curJob.area) || (item.description && item.description.split('_')[1] === curJob.area) ? 'px-6 py-4 whitespace-nowrap text-sm text-white font-bold bg-green-600' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'}>{item.data ? item.data.area : item.description.split('_')[1]}</td>

                        {/* <td className={item.site[0] === curJob.site ? `text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap ` : 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'}>{item.site[0]}</td> */}
                        <td className={item.status ? 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900' : 'px-6 py-4 whitespace-nowrap text-sm text-gray-900'}>{item.status ? 'Available' : 'Assigned'}</td>

                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                          {
                            <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => submitHandler(item)}>
                              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-3 h-3'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                              </svg>
                            </button>
                          }
                        </td>
                      </tr>
                      // <tr className='bg-white border-b' key={uuidv4()}>
                      //   <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      //     <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>{index + 1}</button>
                      //   </td>

                      //   <td className={item.site[0] === curJob.site ? `text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap ` : 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'}>{item.name}</td>

                      //   <td className={item.site[0] === curJob.site ? `text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap ` : 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'}>{item.site[0]}</td>

                      //   <td className={item.site[0] === curJob.site ? `text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap ` : 'text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'}>Available</td>

                      //   <td>
                      //     <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => submitHandler(item)}>
                      //       <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-3 h-3'>
                      //         <path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                      //       </svg>
                      //     </button>
                      //   </td>
                      // </tr>
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

export default AllocationTable;
