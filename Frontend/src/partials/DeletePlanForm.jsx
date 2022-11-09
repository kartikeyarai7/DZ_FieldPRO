import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const DeletePlanForm = ({ onDelete, onHideDelete }) => {
  const notyf = new Notyf();
  const [jobId, setJobId] = useState('');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getPlanHandler();
  }, []);

  const getPlanHandler = () => {
    fetchPlan();
  };

  async function fetchPlan() {
    const res = await axios.get('/api/plan');
    if (res.status === 200) {
      setJobs(res.data);
    }
  }

  const changeJobIdHandler = e => {
    setJobId(e.target.value);
  };

  const hideDisplayHandler = () => {
    onHideDelete();
  };

  const submitHandler = e => {
    e.preventDefault();
    deletePlanHandler(jobId);
  };

  const resetFormHandler = () => {
    console.log(jobId);
    setJobId('');
  };

  async function deletePlanHandler(id) {
    if (id) {
      const payload = {
        id: id
      };
      const res = await axios.post('/api/delete_plan', payload);
      if (res.status === 200) {
        notyf.error('Deleted from plan');
        onDelete();
      }
    } else {
      notyf.error('Nothing selected');
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className='p-5'>
        <div className='mt-10 sm:mt-0'>
          <div className='w-4/5 mx-auto'>
            <div className='mt-5 md:mt-0'>
              <span className='text-xs px-3 py-3  '>Items marked with * are mandatory</span>
              <form action='#' method='POST' onKeyPress={handleKeyPress}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div>
                    <button className='text-xs p-2 btn bg-indigo-600 text-white float-right  ' onClick={hideDisplayHandler}>
                      X
                    </button>
                  </div>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Choose Activity*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onClick={changeJobIdHandler}>
                          <option value=''>-</option>
                          {jobs.length > 0 &&
                            jobs.map(item => {
                              return (
                                <option value={item._id} key={item._id}>
                                  {item.description}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className='col-span-6 text-center'>
                        <button type='submit' className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2 my-4' onClick={submitHandler}>
                          Delete
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

export default DeletePlanForm;
