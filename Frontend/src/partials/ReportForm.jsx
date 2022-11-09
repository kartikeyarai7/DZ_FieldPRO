import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { totalSiteOptionsArr, centralSiteOptionsArr, eastSiteOptionsArr, westSiteOptionsArr } from '../data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const ReportForm = ({ onSubmit, onCount }) => {
  const [area, setArea] = useState('');
  const [site, setSite] = useState('');
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activity, setActivity] = useState(0);
  const [resources, setResources] = useState([]);
  const [sNo, setSNo] = useState([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [siteOptions, setSiteOptions] = useState(totalSiteOptionsArr);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      getResourceHandler();
      getSerialNumberHandler();
    }
  }, [userInfo]);

  const productOptions = [
    { value: 'C1', label: 'C1' },
    { value: 'C4', label: 'C4' },
    { value: 'C5', label: 'C5' }
  ];

  const handleChangeProducts = t => {
    const prod = [];

    t.forEach(item => {
      prod.push(item.value);
    });
    setProducts(prod);
  };

  // useEffect(() => {
  //   getResourceHandler();
  // }, []);

  async function resourceHandler() {
    const res = await axios.get('/api/resources');

    const d1 = ['-'];

    if (res.status === 200) {
      res.data.forEach(item => {
        if (item.name !== 'Khaldi Bouchra') {
          d1.push(item.name);
        }
      });

      setResources(d1);
      onCount(d1.length - 1);
    }
  }

  async function serialNumberHandler() {
    const res = await axios.get('/api/serial_numbers');

    const d1 = '-';

    if (res.status === 200) {
      setSNo([d1, ...res.data]);
    }
  }

  const getResourceHandler = () => {
    resourceHandler();
  };

  const getSerialNumberHandler = () => {
    serialNumberHandler();
  };

  const notyf = new Notyf();

  const data = {
    activity,
    startDate,
    endDate,
    area,
    site,
    // product,
    products,
    name,
    serialNumber
  };

  const changeAreaHandler = e => {
    if (e.target.value === 'Central') {
      setSiteOptions(centralSiteOptionsArr);
    }
    if (e.target.value === 'East') {
      setSiteOptions(eastSiteOptionsArr);
    }
    if (e.target.value === 'West') {
      setSiteOptions(westSiteOptionsArr);
    }
    setArea(e.target.value);
  };

  const changeSNOHandler = e => {
    setSerialNumber(e.target.value);
  };

  const changeActivityHandler = e => {
    setActivity(e.target.value);
  };

  const changeSiteHandler = e => {
    setSite(e.target.value);
  };

  const changeProductHandler = e => {
    setProduct(e.target.value);
  };

  const changeNameHandler = e => {
    setName(e.target.value);
  };

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
    if ((data.startDate && data.endDate && data.area && !data.site && !data.activity && !data.name && data.products.length === 0 && !data.serialNumber) || (data.name && data.startDate && data.endDate && !data.site && !data.activity && !data.area && data.products.length === 0 && !data.serialNumber) || (data.startDate && data.endDate && !data.site && !data.activity && !data.area && data.products.length === 0 && !data.name && !data.serialNumber) || (data.startDate && data.endDate && !data.area && data.site && data.products.length === 0 && !data.name && !data.serialNumber) || (data.startDate && data.endDate && !data.area && data.site && data.activity && data.products.length === 0 && !data.name && !data.serialNumber) || (data.startDate && data.endDate && data.area && data.site && !data.activity && data.products.length === 0 && !data.name && !data.serialNumber) || (data.startDate && data.endDate && data.area && data.site && data.activity && data.products.length === 0 && !data.name && !data.serialNumber) || (data.products.length > 0 && data.startDate && data.endDate && !data.area && !data.site && !data.name && !data.serialNumber && !activity) || (data.products.length > 0 && data.startDate && data.endDate && !data.area && !data.site && !data.name && !data.serialNumber && activity) || (data.serialNumber && !data.area && !data.site && !data.activity && !data.name && !data.startDate && !data.endDate && data.products.length === 0) || (data.serialNumber && !data.area && !data.site && !data.activity && !data.name && data.startDate && data.endDate && data.products.length === 0)) {
      //   onNewData(data);
      onSubmit(data);
      console.log(data);
    } else {
      notyf.error('Invalid Form Entry');
    }
  };

  const resetFormHandler = () => {
    setName('');
    setStartDate('');
    setEndDate('');
    setArea('');
    setSite('');
    // setProduct('');
    setActivity('');
  };

  const changeStartDateHandler = e => {
    setStartDate(e.target.value);
  };

  const changeEndDateHandler = e => {
    setEndDate(e.target.value);
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
          <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Report Form</div>
        </div>

        <div className='mt-10 sm:mt-0'>
          <div className='w-4/5 mx-auto'>
            <div className='mt-5 md:mt-0'>
              <form action='#' method='POST' onKeyPress={handleKeyPress}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6 sm:col-span-3'>
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
                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Site
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSiteHandler} value={site}>
                          {/* <option value=''>-</option> */}
                          {createSiteOptions()}
                        </select>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='start-date' className='block text-sm font-medium text-gray-700'>
                          Start Date*
                        </label>
                        <input type='date' name='start-date' id='start-date' autoComplete='given-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeStartDateHandler} />
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='end-date' className='block text-sm font-medium text-gray-700'>
                          End Date*
                        </label>
                        <input type='date' name='end-date' id='end-date' autoComplete='family-name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEndDateHandler} />
                      </div>

                      {/* <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Product
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeProductHandler}>
                          <option value=''>-</option>
                          <option value='C1'>C1</option>
                          <option value='C4'>C4</option>
                          <option value='C5'>C5</option>
                        </select>
                      </div> */}

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='prod' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Products
                        </label>
                        <Select options={productOptions} isMulti name='prod' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeProducts} />
                      </div>
                      {/* <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='sno' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Serial Number
                        </label>
                        <select id='sno' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSNOHandler}>
                          {sNo.map(item => {
                            return (
                              <option value={item} key={item}>
                                {item}{' '}
                              </option>
                            );
                          })}
                        </select>
                      </div> */}

                      <div className='col-span-6 sm:col-span-3 '>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Activity
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeActivityHandler}>
                          <option value=''>-</option>
                          <option value='Ins'>Ins</option>
                          <option value='PM'>PM</option>
                          <option value='CM'>CM</option>
                          <option value='INSP'>INSP</option>
                          <option value='Shadowing'>Shadowing</option>
                        </select>
                      </div>

                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Resource
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNameHandler}>
                          {resources.map(item => {
                            return (
                              <option value={item} key={item}>
                                {item}{' '}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className='col-span-6 sm:col-span-3'>
                        <label htmlFor='sNO' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Serial Number
                        </label>
                        <select id='sNO' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSNOHandler} value={serialNumber}>
                          {sNo.map(item => {
                            return (
                              <option value={item} key={uuidv4()}>
                                {item}{' '}
                              </option>
                            );
                          })}
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

export default ReportForm;
