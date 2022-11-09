import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../partials/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Notyf } from 'notyf';
import { Eventcalendar, CalendarPrev, CalendarNav, CalendarNext, CalendarToday, SegmentedGroup, SegmentedItem, getJson, setOptions } from '@mobiscroll/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResourceProfile = () => {
  const notyf = new Notyf();
  const [tData, setTData] = useState({});
  const [resourceId, setResourceId] = useState('');
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      checkResourceHandler(params.id);
    }
  }, [userInfo, params]);

  // useEffect(() => {
  //   checkResourceHandler(params.id);
  // }, [params]);

  async function checkResourceHandler(id) {
    const payload = {
      id: id
    };
    const res = await axios.post('/api/get_resource', payload);
    const jobs = await axios.get('/api/jobs');

    // console.log(res.data);
    if (res.status === 200 && jobs.status === 200) {
      setTData(res.data);
      setResourceId(id);
      const d = jobs.data.filter(item => item.resources.includes(res.data.name));
      setData(d);
    }
  }

  return (
    <>
      <Navbar />
      <div className='bg-white shadow overflow-hidden sm:rounded-lg p-10 mb-10'>
        <div className='px-4 py-5 sm:px-6 mb-5'>
          <h3 className='text-lg leading-6 font-medium text-gray-900'>Resource Information - {tData.name}</h3>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.name}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Area</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.area}</dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Site</dt>
              {/* <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.site && tData.site.length > 0 && tData.site.map(item => item + ', ')}</dd> */}
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.site}</dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Products</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.products && tData.products.length > 0 && tData.products.map(item => item + ', ')}</dd>
            </div>
            {/* <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Lead</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.lead && tData.lead.length > 0 && tData.lead.map(item => item + ', ')} </dd>
            </div> */}

            <div className='bgwhite px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Email</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2'>{tData.email}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className='m-5 p-5'>
        <h3 className='text-center mb-5'>Allocations</h3>
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
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.length > 0 &&
                      data.map((item, index) => {
                        return (
                          <tr className='bg-white border-b' key={uuidv4()}>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                              <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1'>{index + 1}</button>
                            </td>

                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.description}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.startDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.endDate}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.area}</td>
                            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.site}</td>
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
    </>
  );
};

export default ResourceProfile;
