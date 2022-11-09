import React, { useState, useEffect } from 'react';

import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Select from 'react-select';
import { totalSiteOptions, eastSiteOptions, centralSiteOptions, westSiteOptions } from '../data';

const EditResourceForm = ({ onUpdatedData, oldData }) => {
  const [name, setName] = useState('');
  const [oldName, setOldName] = useState('');
  const [email, setEmail] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [area, setArea] = useState('');
  const [oldArea, setOldArea] = useState('');
  const [site, setSite] = useState('');
  const [oldSite, setOldSite] = useState('');
  const [products, setProducts] = useState([]);
  const [oldProducts, setOldProducts] = useState([]);
  const [lead, setLead] = useState([]);
  const [oldLead, setOldLead] = useState([]);
  // const [nationality, setNationality] = useState('');
  // const [oldNationality, setOldNationality] = useState('');
  const [siteOptions, setSiteOptions] = useState(totalSiteOptions);

  const notyf = new Notyf();

  let arr = [];
  let arr2 = [];

  useEffect(() => {
    if (oldData.name) {
      console.log(oldData);
      setOldName(oldData.name);
      setOldEmail(oldData.email);
      setOldArea(oldData.area);
      setOldSite(oldData.site);
      oldData.products.forEach(item => {
        const option = {
          label: item,
          value: item
        };
        arr.push(option);
      });
      setOldProducts(arr);
      // oldData.lead.forEach(item => {
      //   const optionsLead = {
      //     label: item,
      //     value: item
      //   };
      //   arr2.push(optionsLead);
      // });
      // setOldLead(arr2);
    }
  }, [oldData]);

  const data = {
    name: name ? name : oldName,
    area: oldArea,
    site: oldSite,
    products,
    // lead,
    email: email ? email : oldEmail
  };

  console.log(data);

  const submitHandler = e => {
    e.preventDefault();
    console.log(data);
    if (data.name && data.products.length > 0 && data.email) {
      onUpdatedData(data);
    } else {
      console.log(data);
      notyf.error('Incomplete Details');
    }
  };

  const changeNameHandler = e => {
    setName(e.target.value);
  };

  const changeAreaHandler = e => {
    setOldArea(e.target.value);
    if (e.target.value === 'Central') {
      setSiteOptions(centralSiteOptions);
    } else if (e.target.value === 'East') {
      setSiteOptions(eastSiteOptions);
    } else if (e.target.value === 'West') {
      setSiteOptions(westSiteOptions);
    }
  };

  const changeSiteHandler = t => {
    console.log(t.value);
    const sit = [];

    // t.forEach(item => {
    //   sit.push(item.value);
    // });
    // console.log(sit);
    setOldSite(t.value);
  };

  const handleChangeLead = t => {
    const leadOp = [];
    t.forEach(item => {
      leadOp.push(item.value);
    });
    setLead(leadOp);
  };

  const handleChangeProducts = t => {
    const prod = [];

    t.forEach(item => {
      prod.push(item.value);
    });
    console.log(prod);
    setProducts(prod);
  };

  const changeEmailHandler = e => {
    setEmail(e.target.value);
  };

  const leadOptions = [
    { value: 'C1-Ins', label: 'C1 Installation' },
    { value: 'C1-PM', label: 'C1 Preventive Maintenance' },
    { value: 'C4-Ins', label: 'C4 Installation' },
    { value: 'C4-PM', label: 'C4 Preventive Maintenance' },
    { value: 'C5-Ins', label: 'C5 Installation' },
    { value: 'C5-PM', label: 'C5 Preventive Maintenance' },
    { value: 'C1-INSP', label: 'C1-INSP' },
    { value: 'C4-INSP', label: 'C4-INSP' },
    { value: 'C5-INSP', label: 'C5-INSP' },
    { value: '', label: 'None' }
  ];

  const productOptions = [
    { value: 'C1', label: 'C1' },
    { value: 'C4', label: 'C4' },
    { value: 'C5', label: 'C5' }
  ];

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className='p-5'>
        <div>
          <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Edit Resource Form</div>
        </div>

        <div className='mt-10 sm:mt-0'>
          <div className='w-4/5 mx-auto'>
            <div className='mt-5 md:mt-0'>
              <form action='#' method='POST' onKeyPress={handleKeyPress}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-6 gap-6'>
                      <div className='col-span-6'>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                          Name
                        </label>
                        <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNameHandler} defaultValue={oldName} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Area
                        </label>
                        <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeAreaHandler} value={oldArea}>
                          <option value=''>-</option>
                          <option value='Central'>Central</option>
                          <option value='East'>East</option>
                          <option value='West'>West</option>
                        </select>
                      </div>
                      <div className='col-span-6'>
                        <label htmlFor='site' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Site
                        </label>
                        <Select options={siteOptions} name='site' className='basic-multi-select' classNamePrefix='select' onChange={changeSiteHandler} />
                      </div>

                      <div className='col-span-6'>
                        <label htmlFor='prod' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Products
                        </label>
                        <Select options={productOptions} isMulti name='prod' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeProducts} />
                      </div>
                      {/* <div className='col-span-6'>
                        <label htmlFor='lead' className='block mb-2 text-sm font-medium text-gray-700 '>
                          Leading Ability
                        </label>
                        <Select options={leadOptions} isMulti name='lead' className='basic-multi-select' classNamePrefix='select' onChange={handleChangeLead} />
                      </div> */}

                      <div className='col-span-6'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                          Email
                        </label>
                        <input type='email' name='email' id='email' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeEmailHandler} defaultValue={oldEmail} />
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
    </>
  );
};

export default EditResourceForm;
