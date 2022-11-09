import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { totalSiteOptionsArr, eastSiteOptionsArr, westSiteOptionsArr, centralSiteOptionsArr } from '../data';
import { v4 as uuidv4 } from 'uuid';
import Planning from '../pages/Planning';
import PlanningForm from './PlanningForm';

const JobForm = ({ onNewData }) => {
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [site, setSite] = useState('');
  const [product, setProduct] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  // const [lead, setLead] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rCount, setRCount] = useState(0);
  const [activity, setActivity] = useState(0);

  const notyf = new Notyf();

  let arr = [];

  const data = {
    description,
    activity,
    startDate,
    endDate,
    area,
    site,
    product,
    serialNumber,
    // lead,
    rCount
  };

  const changeDescriptionHandler = e => {
    setDescription(e.target.value);
  };

  const changeAreaHandler = e => {
    setArea(e.target.value);
  };

  const changeSerialNumberHandler = e => {
    setSerialNumber(e.target.value);
  };

  const changeActivityHandler = e => {
    setActivity(e.target.value);
  };

  const changeSiteHandler = e => {
    console.log(e.target.value);
    setSite(e.target.value);
  };

  const changeProductHandler = e => {
    setProduct(e.target.value);
  };

  // const changeLeadHandler = e => {
  //   setLead(e.target.value);
  // };

  const createSiteOptions = () => {
    let opts = [];
    totalSiteOptionsArr.map(item => {
      opts.push(
        <option value={item} key={uuidv4()}>
          {item}
        </option>
      );
    });
    return opts;
  };

  const submitHandler = e => {
    e.preventDefault();
    if (data.description && data.startDate && data.endDate && data.activity && data.area && data.product && data.site && data.rCount && data.serialNumber) {
      onNewData(data);
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

  const changeNumHandler = e => {
    setRCount(e.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className='p-5'>
        <div>
          <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Job Form</div>
        </div>

        <div className='text-lg font-medium leading-6 text-gray-900 text-center my-10 '>Or Add a Custom Task</div>

        <div className='mt-10 sm:mt-0'>
          <div className='w-4/5 mx-auto'>
            <div className='mt-5 md:mt-0'>
              <form action='#' method='POST' onKeyPress={handleKeyPress}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Description
                        </label>
                        <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDescriptionHandler} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Activity
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeActivityHandler}>
                          <option value=''>-</option>
                          <option value='Ins'>Ins</option>
                          <option value='PM'>PM</option>
                          <option value='INSP'>INSP</option>
                        </select>
                      </div>
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
                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Area
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeAreaHandler}>
                          <option value=''>-</option>
                          <option value='Central'>Central</option>
                          <option value='East'>East</option>
                          <option value='West'>West</option>
                        </select>
                      </div>
                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Site
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSiteHandler} value={site}>
                          {/* <option value=''>-</option> */}
                          {createSiteOptions()}
                        </select>
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Product
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeProductHandler}>
                          <option value=''>-</option>
                          <option value='C1'>C1</option>
                          <option value='C4'>C4</option>
                          <option value='C5'>C5</option>
                        </select>
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='sNo' className='block text-sm font-medium text-gray-700'>
                          Serial Number
                        </label>
                        <input type='text' name='sNo' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSerialNumberHandler} />
                      </div>
                      {/* <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Leading Ability Required
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeLeadHandler}>
                          <option value=''>-</option>
                          <option value='C1-Ins'>C1-Ins</option>
                          <option value='C1-PM'>C1-PM</option>
                          <option value='C4-Ins'>C4-Ins</option>
                          <option value='C4-PM'>C4-PM</option>
                          <option value='C5-Ins'>C5-Ins</option>
                          <option value='C5-PM'>C5-PM</option>
                          <option value='C1-Machine-Inpection'>C1-Machine-Inpection</option>
                          <option value='C4-Machine-Inpection'>C4-Machine-Inpection</option>
                          <option value='C5-Machine-Inpection'>C5-Machine-Inpection</option>
                        </select>
                      </div> */}
                      <div className='col-span-6'>
                        <label htmlFor='num' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Number of Resources Required
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNumHandler}>
                          <option value=''>-</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                          <option value='5'>5</option>
                        </select>
                      </div>
                      <div className='col-span-6 text-center'>
                        <button type='submit' className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2 my-4' onClick={submitHandler}>
                          Submit
                        </button>
                        <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2 mx-4' type='reset'>
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

export default JobForm;
