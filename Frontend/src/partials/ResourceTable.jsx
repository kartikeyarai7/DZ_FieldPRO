import axios from 'axios';
import React from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const ResourceTable = ({ data, onDelete, onEdit }) => {
  const notyf = new Notyf();
  const navigate = useNavigate();

  async function deleteHandler(id) {
    const data = {
      id: id
    };
    const res = await axios.post('/api/delete_resource', data);
    if (res.status === 200) {
      onDelete();
      notyf.error('Deleted Resource');
    }
  }

  async function editHandler(id) {
    const data = {
      id: id
    };
    onEdit(data);
  }

  const getProfileHandler = id => {
    navigate(`/resource-data/${id}`);
  };

  return (
    <div className='p-5'>
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
                      Area
                    </th>
                    {/* <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Sites
                    </th> */}
                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Products
                    </th>
                    {/* <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Lead
                    </th> */}

                    <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                      Email
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
                          <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => getProfileHandler(item._id)}>
                            {index + 1}
                          </button>
                        </td>

                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.name}</td>
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.area}</td>
                        {/* <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.site.map(it => it + ', ')}</td> */}
                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.products.map(it => it + ', ')}</td>
                        {/* <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.lead.map(it => it + ', ')}</td> */}

                        <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.email}</td>

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

export default ResourceTable;
