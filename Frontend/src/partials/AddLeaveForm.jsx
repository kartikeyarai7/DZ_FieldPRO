import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddLeaveForm = ({ onNewData, onHide }) => {
  const [description, setDescription] = useState('');
  const [activity, setActivity] = useState('');

  const [startDate, setStartDate] = useState('');
  const [leaveStatus, setLeaveStatus] = useState(true);

  const [endDate, setEndDate] = useState('');
  const [resource, setResource] = useState('');
  // const [allRes, setAllRes] = useState([]);
  const [resOptions, setResOptions] = useState([]);

  const notyf = new Notyf();

  let arr = [];

  useEffect(() => {
    getResourceHandler();
  }, []);

  const getResourceHandler = () => {
    resourceHandler();
  };

  async function resourceHandler() {
    const res = await axios.get('/api/resources');

    const d1 = ['-'];
    const d2 = [];

    if (res.status === 200) {
      res.data.forEach(item => {
        if (item.name !== 'Khaldi Bouchra') {
          d1.push(item.name);
          d2.push(item.name);
        }
      });

      setResOptions(d1);
      // setAllRes(d2);
    }
  }

  const data = {
    description,
    activity,
    startDate,
    endDate,
    resource
  };

  const changeDescriptionHandler = e => {
    setDescription(e.target.value);
  };

  const changeActivityHandler = e => {
    setActivity(e.target.value);
    if (e.target.value === 'Public Holiday') {
      setLeaveStatus(false);
      setResource('All');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    if (data.description && data.activity && data.startDate && data.endDate && data.resource) {
      if (new Date(data.startDate) <= new Date(data.endDate)) {
        onNewData(data);
      } else {
        notyf.error('Invalid details');
      }
      // console.log(data);
    } else {
      notyf.error('Incomplete Details');
    }
  };

  const changeStartDateHandler = e => {
    setStartDate(e.target.value);
  };

  const changeEndDateHandler = e => {
    setEndDate(e.target.value);
  };

  const hideDisplayHandler = () => {
    onHide();
  };

  const resetFormHandler = () => {
    setDescription('');
    setActivity('');
    setStartDate('');
    setEndDate('');
    setResource('');
    setLeaveStatus(true);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const changeResourceHandler = e => {
    setResource(e.target.value);
  };

  return (
    <>
      <div className='p-5'>
        <div className='mt-10 sm:mt-0'>
          <div className='w-4/5 mx-auto'>
            <div className='mt-5 md:mt-0'>
              <form action='#' method='POST' onKeyPress={handleKeyPress}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div>
                    <span className='text-xs px-3 py-3  '>Items marked with * are mandatory</span>
                    <button className='text-xs p-3 float-right btn bg-indigo-600 text-white ' onClick={hideDisplayHandler}>
                      X
                    </button>
                  </div>

                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Description*(Annual Leave-Name)
                        </label>
                        <input type='text' name='name' id='name' className={'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'} onChange={changeDescriptionHandler} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Activity*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeActivityHandler} value={activity}>
                          <option value=''>-</option>
                          <option value='Leave'>Leave</option>
                          <option value='Public Holiday'>Public Holiday</option>
                        </select>
                      </div>
                      {leaveStatus && (
                        <div className='col-span-6'>
                          <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                            Resources
                          </label>
                          <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeResourceHandler} value={resource}>
                            {resOptions.map(item => {
                              return (
                                <option value={item} key={uuidv4()}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='start-date' className='block text-sm font-medium text-gray-700'>
                          Start Date
                        </label>
                        <input type='date' name='start-date' id='start-date' autoComplete='given-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartDateHandler} />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='end-date' className='block text-sm font-medium text-gray-700'>
                          End Date
                        </label>
                        <input type='date' name='end-date' id='end-date' autoComplete='family-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndDateHandler} />
                      </div>

                      <div className='col-span-6 text-center'>
                        <button type='submit' className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2 my-4' onClick={submitHandler}>
                          Submit
                        </button>
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2 mx-4' type='reset' onClick={resetFormHandler}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='hidden sm:block' aria-hidden='true'>
          <div className='py-5 mt-10'>
            <div className='border-t border-gray-200' />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLeaveForm;
