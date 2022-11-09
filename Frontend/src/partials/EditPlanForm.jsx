import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import { totalSiteOptionsArr, weekCount, eastSiteOptionsArr, westSiteOptionsArr, centralSiteOptionsArr } from '../data';
import { v4 as uuidv4 } from 'uuid';
import 'notyf/notyf.min.css';
import axios from 'axios';

const EditPlanForm = ({ oldData, onUpdate, onHideEdit }) => {
  const [description, setDescription] = useState('');
  const [oldDescription, setOldDescription] = useState('');
  const [area, setArea] = useState('');
  const [format, setFormat] = useState(true);
  const [oldArea, setOldArea] = useState('');

  const [site, setSite] = useState('');
  const [oldSite, setOldSite] = useState('');

  const [product, setProduct] = useState('');
  const [oldProduct, setOldProduct] = useState('');

  const [serialNumber, setSerialNumber] = useState('');
  const [oldSerialNumber, setOldSerialNumber] = useState('');

  // const [lead, setLead] = useState('');
  const [startDate, setStartDate] = useState('');
  const [oldStartDate, setOldStartDate] = useState('');

  const [startWeek, setStartWeek] = useState('');
  const [oldStartWeek, setOldStartWeek] = useState('');

  const [endDate, setEndDate] = useState('');
  const [oldEndDate, setOldEndDate] = useState('');

  const [endWeek, setEndWeek] = useState('');
  const [oldEndWeek, setOldEndWeek] = useState('');

  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [oldDayOfWeek, setOldDayOfWeek] = useState(1);
  const [rCount, setRCount] = useState(0);
  const [oldRCount, setOldRCount] = useState(0);
  const [activity, setActivity] = useState('');
  const [oldActivity, setOldActivity] = useState(0);

  const [duration, setDuration] = useState('');
  const [oldDuration, setOldDuration] = useState('');

  const [siteOptions, setSiteOptions] = useState(totalSiteOptionsArr);
  const notyf = new Notyf();

  useEffect(() => {
    if (oldData.description) {
      setOldDescription(oldData.description);
      setOldSerialNumber(oldData.serialNumber);
      setOldActivity(oldData.activity);
      setOldStartDate(oldData.startDate);
      setOldEndDate(oldData.endDate);
      setOldArea(oldData.area);
      setOldSite(oldData.site);
      setOldProduct(oldData.product);
      setOldStartWeek(oldData.startWeek);
      setOldEndWeek(oldData.endWeek);
      setOldDayOfWeek(oldData.dayOfWeek);
      setOldDuration(oldData.duration);
      // setOldLead(oldData.lead);
      setOldRCount(oldData.rCount);
    }
  }, [oldData]);

  const data = {
    description: description ? description : oldDescription,
    activity: oldActivity,
    startDate: oldStartDate,
    endDate: oldEndDate,
    startWeek: oldStartWeek,
    endWeek: oldEndWeek,
    dayOfWeek: oldDayOfWeek,
    duration: oldDuration,
    area: oldArea,
    site: oldSite,
    product: oldProduct,
    serialNumber: serialNumber ? serialNumber : oldSerialNumber,
    // lead: oldLead,
    rCount: oldRCount
  };

  const changeDescriptionHandler = e => {
    setDescription(e.target.value);
  };

  const changeSerialNumberHandler = e => {
    setSerialNumber(e.target.value);
  };

  const changeAreaHandler = e => {
    setOldArea(e.target.value);
  };

  const changeActivityHandler = e => {
    setOldActivity(e.target.value);
  };

  const changeSiteHandler = e => {
    setOldSite(e.target.value);
  };

  const changeProductHandler = e => {
    setOldProduct(e.target.value);
  };

  const changeStartDateHandler = e => {
    setOldStartDate(e.target.value);
  };

  const changeEndDateHandler = e => {
    setOldEndDate(e.target.value);
  };

  const changeStartWeekHandler = e => {
    setOldStartWeek(e.target.value);
  };

  const changeEndWeekHandler = e => {
    setOldEndWeek(e.target.value);
  };

  const changeDayOfWeekHandler = e => {
    setOldDayOfWeek(e.target.value);
  };

  const changeDurationHandler = e => {
    setOldDuration(e.target.value);
  };

  const changeNumHandler = e => {
    setOldRCount(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (data.description && data.startWeek && data.endWeek && data.activity && data.area && data.product && data.site && data.rCount && data.serialNumber && data.duration && format) {
      if (Number(data.startWeek) <= Number(data.endWeek) && Number(data.startWeek) <= 52 && Number(data.startWeek) >= 0 && Number(data.endWeek) <= 52 && Number(data.endWeek) >= 0 && Number(dayOfWeek) <= 5 && Number(dayOfWeek) > 0) {
        onUpdate(data);
        //Update Endpoint here
        setFormat(false);
      } else {
        notyf.error('Invalid details');
      }
      // console.log(data);
    } else {
      notyf.error('Incomplete Details');
    }
  };

  const hideEditFormHandler = () => {
    onHideEdit();
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='p-5'>
      <div>
        <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Edit Plan Activity</div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='w-4/5 mx-auto'>
          <div className='mt-5 md:mt-0'>
            <form action='#' method='POST' onKeyPress={handleKeyPress}>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div>
                  <span className='text-xs px-3 py-3  '>Items marked with * are mandatory</span>
                  <button className='text-xs p-3 float-right btn bg-indigo-600 text-white ' onClick={hideEditFormHandler}>
                    X
                  </button>
                </div>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6'>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Description* ( e.g. Oran_West_C5-PM-521ST05094-1)
                      </label>
                      <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDescriptionHandler} defaultValue={oldDescription} />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Activity*
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeActivityHandler} value={oldActivity}>
                        <option value='Ins'>Ins</option>
                        <option value='PM'>PM</option>
                        <option value='CM'>CM</option>
                        <option value='INSP'>INSP</option>
                        <option value='Shadowing'>Shadowing</option>
                      </select>
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='start-date' className='block text-sm font-medium text-gray-700'>
                        Start Date
                      </label>
                      <input type='date' name='start-date' id='start-date' autoComplete='given-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartDateHandler} value={oldStartDate} />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='end-date' className='block text-sm font-medium text-gray-700'>
                        End Date
                      </label>
                      <input type='date' name='end-date' id='end-date' autoComplete='family-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndDateHandler} value={oldEndDate} />
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='start-date' className='block text-sm font-medium text-gray-700'>
                        Start Week*
                      </label>
                      <input type='text' name='start-date' id='start-date' autoComplete='given-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartWeekHandler} value={oldStartWeek} />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label htmlFor='end-date' className='block text-sm font-medium text-gray-700'>
                        End Week
                      </label>
                      <input type='text' name='end-date' id='end-date' autoComplete='family-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndWeekHandler} value={oldEndWeek} />
                    </div>
                    {/* <div className='col-span-6 '>
                      <label htmlFor='dayOfWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Day Of Week* (Sun - 1 To Thu - 5)
                      </label>
                      <input type='number' name='dayOfWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDayOfWeekHandler} value={oldDayOfWeek} />
                    </div> */}
                    <div className='col-span-6'>
                      <label htmlFor='dayOfWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Day Of Week* (Sun To Thu)
                      </label>
                      <select id='dayOfWeek' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDayOfWeekHandler} value={oldDayOfWeek}>
                        <option value='1'>Sun</option>
                        <option value='2'>Mon</option>
                        <option value='3'>Tue</option>
                        <option value='4'>Wed</option>
                        <option value='5'>Thu</option>
                      </select>
                    </div>
                    <div className='col-span-6 '>
                      <label htmlFor='eWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Duration* (days)
                      </label>
                      <input type='number' name='eWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDurationHandler} value={oldDuration} />
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Area*
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeAreaHandler} value={oldArea}>
                        <option value='Central'>Central</option>
                        <option value='East'>East</option>
                        <option value='West'>West</option>
                      </select>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Site*
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSiteHandler} value={oldSite}>
                        {totalSiteOptionsArr.map(item => {
                          return (
                            <option value={item} key={uuidv4()}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Product*
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeProductHandler} value={oldProduct}>
                        <option value=''>-</option>
                        <option value='C1'>C1</option>
                        <option value='C4'>C4</option>
                        <option value='C5'>C5</option>
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Serial Number*
                      </label>
                      <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSerialNumberHandler} defaultValue={oldSerialNumber} />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='num' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Number of Resources Required
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNumHandler} value={oldRCount}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                    <div className='col-span-6 text-center'>
                      <button type='submit' className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2 my-4' onClick={submitHandler}>
                        Update
                      </button>
                      {/* <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2 mx-4' type='reset'>
                    Reset
                  </button> */}
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
  );
};

export default EditPlanForm;
