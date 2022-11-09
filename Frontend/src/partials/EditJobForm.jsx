import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import { totalSiteOptionsArr } from '../data';
import { v4 as uuidv4 } from 'uuid';
import 'notyf/notyf.min.css';

const EditJobForm = ({ onUpdatedData, oldData, onHide }) => {
  const [description, setDescription] = useState('');
  const [oldDescription, setOldDescription] = useState('');
  const [area, setArea] = useState('');
  const [oldArea, setOldArea] = useState('');
  const [site, setSite] = useState('');
  const [oldSite, setOldSite] = useState('');
  const [product, setProduct] = useState('');
  const [oldProduct, setOldProduct] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [oldSerialNumber, setOldSerialNumber] = useState('');
  // const [lead, setLead] = useState('');
  // const [oldLead, setOldLead] = useState('');
  const [startDate, setStartDate] = useState('');
  const [oldStartDate, setOldStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [oldEndDate, setOldEndDate] = useState('');
  const [rCount, setRCount] = useState('');
  const [oldRCount, setOldRCount] = useState('');
  const [activity, setActivity] = useState(0);
  const [oldActivity, setOldActivity] = useState(0);
  const [assigned, setAssigned] = useState([]);
  const [comment, setComment] = useState('');
  const [oldComment, setOldComment] = useState('');
  const notyf = new Notyf();

  let arr = [];

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
      setAssigned(oldData.resources);
      // setOldLead(oldData.lead);
      setOldRCount(oldData.rCount);
      if (oldData.comments) {
        setOldComment(oldData.comments);
      }
    }
  }, [oldData]);

  const data = {
    description: description ? description : oldDescription,
    activity: oldActivity,
    startDate: oldStartDate,
    endDate: oldEndDate,
    area: oldArea,
    site: oldSite,
    product: oldProduct,
    serialNumber: serialNumber ? serialNumber : oldSerialNumber,
    // lead: oldLead,
    rCount: oldRCount,
    resources: assigned,
    comments: comment ? comment : oldComment
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

  const changeCommentHandler = e => {
    setComment(e.target.value);
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

  // const changeLeadHandler = e => {
  //   setOldLead(e.target.value);
  // };

  const submitHandler = e => {
    e.preventDefault();
    onUpdatedData(data);
    // console.log(data);
  };

  const changeStartDateHandler = e => {
    setOldStartDate(e.target.value);
  };

  const changeEndDateHandler = e => {
    setOldEndDate(e.target.value);
  };

  const changeNumHandler = e => {
    setOldRCount(e.target.value);
  };

  const hideDisplayHandler = () => {
    onHide();
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='p-5'>
      <div>
        <button className='text-xs p-3 btn bg-indigo-600 text-white float-right ' onClick={hideDisplayHandler}>
          X
        </button>
      </div>
      <div>
        <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Update Job Form</div>
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
                        Description
                      </label>
                      <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeDescriptionHandler} defaultValue={oldDescription} />
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Activity
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
                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Area
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeAreaHandler} value={oldArea}>
                        <option value='Central'>Central</option>
                        <option value='East'>East</option>
                        <option value='West'>West</option>
                      </select>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Site
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
                        Product
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeProductHandler} value={oldProduct}>
                        <option value='C1'>C1</option>
                        <option value='C4'>C4</option>
                        <option value='C5'>C5</option>
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                        Serial Number
                      </label>
                      <input type='text' name='name' id='name' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeSerialNumberHandler} defaultValue={oldSerialNumber} />
                    </div>
                    {/* <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Leading Ability Required
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeLeadHandler} value={oldLead}>
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
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeNumHandler} value={oldRCount}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='comment' className='block text-sm font-medium text-gray-700'>
                        Comments
                      </label>
                      <input type='text' name='name' id='comment' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={changeCommentHandler} defaultValue={oldComment} />
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

export default EditJobForm;
