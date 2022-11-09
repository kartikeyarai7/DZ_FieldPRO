import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { totalSiteOptionsArr, weekCount, eastSiteOptionsArr, westSiteOptionsArr, centralSiteOptionsArr, areaOptions, productOptions, activityOptions } from '../data';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddPlanForm = ({ onNewData, onHide }) => {
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [site, setSite] = useState('');
  const [product, setProduct] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  // const [lead, setLead] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startWeek, setStartWeek] = useState('');
  const [format, setFormat] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [endWeek, setEndWeek] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [rCount, setRCount] = useState(0);
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [siteOptions, setSiteOptions] = useState(totalSiteOptionsArr);
  const [snOptions, setSnOptions] = useState(['NA']);
  const [status, setStatus] = useState('Planned');

  const notyf = new Notyf();

  let arr = [];

  const data = {
    description,
    activity,
    startDate,
    endDate,
    startWeek,
    endWeek,
    dayOfWeek,
    duration,
    area,
    site,
    product,
    serialNumber,
    status,
    // lead,
    rCount
  };

  useEffect(() => {
    getSerialNumbersHandler();
  }, []);

  async function getSerialNumbersHandler() {
    try {
      const res = await axios.get('/api/products');
      const snArr = [];
      if (res.status === 200) {
        res.data.forEach(item => {
          snArr.push(item.serialNumber);
        });
        setSnOptions(prev => {
          snArr.push(prev);
          console.log(snArr);
          return snArr;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (description.length > 0 && snOptions.length > 0 && description.split('_').length === 3 && description.split('_')[2].split('-').length === 4) {
      let t1 = description.split('_');
      let t2 = t1[2].split('-');
      let curSite = t1[0];
      let curArea = t1[1];
      let curPro = t2[0];
      let curAct = t2[1];
      let curSNO = t2[2];
      let curRC = t2[3];
      if (totalSiteOptionsArr.includes(curSite) && areaOptions.includes(curArea) && activityOptions.includes(curAct) && productOptions.includes(curPro) && Number(curRC) > 0 && Number(curRC) < 6) {
        setFormat(true);
        setArea(curArea);
        setSite(curSite);
        setSerialNumber(curSNO);
        setProduct(curPro);
        setActivity(curAct);
        if (curAct === 'PM') {
          setDuration(1);
        } else if (curAct === 'INSP') {
          setDuration(0.5);
        }
        setRCount(curRC);
      } else {
        setFormat(false);
      }
    } else {
      console.log('Not evaluating');
    }
  }, [description, snOptions]);

  const changeDescriptionHandler = e => {
    setDescription(e.target.value);
  };

  const changeDurationHandler = e => {
    setDuration(e.target.value);
  };

  const changeAreaHandler = e => {
    setArea(e.target.value);
    if (e.target.value === 'Central') {
      setSiteOptions(centralSiteOptionsArr);
    } else if (e.target.value === 'East') {
      setSiteOptions(eastSiteOptionsArr);
    } else if (e.target.value === 'West') {
      setSiteOptions(westSiteOptionsArr);
    }
  };

  const changeSerialNumberHandler = e => {
    setSerialNumber(e.target.value);
  };

  const changeActivityHandler = e => {
    setActivity(e.target.value);
    if (e.target.value === 'PM') {
      setDuration(1);
    } else if (e.target.value === 'INSP') {
      setDuration(0.5);
    }
  };

  const changeSiteHandler = e => {
    if (e.target.value !== '-') {
      setSite(e.target.value);
    }
  };

  const changeProductHandler = e => {
    setProduct(e.target.value);
  };

  // const changeLeadHandler = e => {
  //   setLead(e.target.value);
  // };

  const createSiteOptions = () => {
    let opts = [];
    siteOptions.map(item => {
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
    if (data.description && data.startWeek && data.endWeek && data.activity && data.area && data.product && data.site && data.rCount && data.serialNumber && data.duration && format) {
      if (Number(data.startWeek) <= Number(data.endWeek) && Number(data.startWeek) <= 52 && Number(data.startWeek) >= 0 && Number(data.endWeek) <= 52 && Number(data.endWeek) >= 0 && Number(dayOfWeek) <= 5 && Number(dayOfWeek) > 0) {
        onNewData(data);
        setFormat(false);
      } else {
        notyf.error('Invalid details');
      }
      // console.log(data);
    } else {
      console.log(data);
      notyf.error('Incomplete Details');
    }
  };

  const changeStartDateHandler = e => {
    setStartDate(e.target.value);
  };
  const changeStartWeekHandler = e => {
    setStartWeek(e.target.value);
  };

  const changeDayOfWeekHandler = e => {
    if (e.target.value !== '-') {
      setDayOfWeek(e.target.value);
    }
  };

  const changeEndDateHandler = e => {
    setEndDate(e.target.value);
  };
  const changeEndWeekHandler = e => {
    setEndWeek(e.target.value);
  };

  const changeNumHandler = e => {
    setRCount(e.target.value);
  };

  const hideDisplayHandler = () => {
    onHide();
  };

  const resetFormHandler = () => {
    setDescription('');
    setActivity('');
    setStartDate('');
    setEndDate('');
    setStartWeek('');
    setEndWeek('');
    setDuration('');
    setArea('');
    setSite('');
    setProduct('');
    setSerialNumber('');
    setRCount(0);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className='p-5'>
        {/* <div>
          <div className='text-lg font-medium leading-6 text-gray-900 text-center my-10 '>Add to the current Plan</div>
        </div> */}

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
                          Description* ( e.g. Oran_West_C5-PM-521ST05094-1)
                        </label>
                        <input type='text' name='name' id='name' className={format ? 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' : 'mt-1 focus:ring-red-700 focus:border-red-500 block w-full shadow-sm sm:text-sm border-red-800 rounded-md'} onChange={changeDescriptionHandler} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Activity*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeActivityHandler} value={activity}>
                          <option value=''>-</option>
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
                        <input type='date' name='start-date' id='start-date' autoComplete='given-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartDateHandler} />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='end-date' className='block text-sm font-medium text-gray-700'>
                          End Date
                        </label>
                        <input type='date' name='end-date' id='end-date' autoComplete='family-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndDateHandler} />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='sWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          StartWeek*
                        </label>
                        <input type='number' name='sWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartWeekHandler} />
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='eWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          EndWeek*
                        </label>
                        <input type='number' name='eWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndWeekHandler} />
                      </div>
                      {/* <div className='col-span-6 '>
                        <label htmlFor='dayOfWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Day Of Week* (Sun - 1 To Thu - 5)
                        </label>
                        <input type='number' name='dayOfWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDayOfWeekHandler} />
                      </div> */}
                      <div className='col-span-6'>
                        <label htmlFor='dayOfWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Day Of Week* (Sun To Thu)
                        </label>
                        <select id='dayOfWeek' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDayOfWeekHandler} value={dayOfWeek}>
                          <option value='-'>-</option>
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
                        <input type='number' name='eWeek' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDurationHandler} value={duration} />
                      </div>
                      {/* <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='startWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Start Week
                        </label>
                        <select id='startWeek' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartWeekHandler}>
                          {weekCount.map(item => {
                            return (
                              <option value={item} key={uuidv4()}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}
                      {/* <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='endWeek' className='block mb-2 text-sm font-medium text-gray-700 '>
                          End Week
                        </label>
                        <select id='endWeek' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndWeekHandler}>
                          {weekCount.map(item => {
                            return (
                              <option value={item} key={uuidv4()}>
                                {item}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}
                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Area*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeAreaHandler} value={area}>
                          <option value=''>-</option>
                          <option value='Central'>Central</option>
                          <option value='East'>East</option>
                          <option value='West'>West</option>
                        </select>
                      </div>
                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Site*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSiteHandler} value={site}>
                          {/* <option value=''>-</option> */}
                          {createSiteOptions()}
                        </select>
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Product*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeProductHandler} value={product}>
                          <option value=''>-</option>
                          <option value='C1'>C1</option>
                          <option value='C4'>C4</option>
                          <option value='C5'>C5</option>
                        </select>
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='sNo' className='block text-sm font-medium text-gray-700'>
                          Serial Number*
                        </label>
                        <input type='text' name='sNo' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSerialNumberHandler} value={serialNumber} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='num' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Number of Resources Required*
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNumHandler} value={rCount}>
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

export default AddPlanForm;
