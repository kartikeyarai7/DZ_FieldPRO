import React, { useState, useEffect } from 'react';
import { totalSiteOptionsArr, areaOptions, eastSiteOptionsArr, westSiteOptionsArr, centralSiteOptionsArr } from '../data';
import { v4 as uuidv4 } from 'uuid';

const PlanningForm = ({ data, onSubmit }) => {
  const [selectedId, setSelectedId] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterSite, setFilterSite] = useState('');
  const [siteOptions, setSiteOptions] = useState(totalSiteOptionsArr);
  const [endWeek, setEndWeek] = useState(0);
  const [startWeek, setStartWeek] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    if (selectedId) {
      onSubmit(selectedId);
    }
  };

  // console.log(data);

  useEffect(() => {
    const relData = [];
    if (Number(startWeek) > 0 && Number(endWeek) > 0 && !filterSite) {
      setShowFilter(true);
      if (Number(startWeek) <= Number(endWeek)) {
        data.forEach(item => {
          if (Number(item.startWeek) >= Number(startWeek) && Number(item.endWeek) <= Number(endWeek)) {
            relData.push(item);
          }
        });
      } else {
        const relData = [];
      }
    } else if (filterSite && !startWeek && !endWeek) {
      if (filterSite !== '-') {
        setShowFilter(true);
        data.forEach(item => {
          if (item.site === filterSite) {
            relData.push(item);
          }
        });
      } else {
        setShowFilter(true);
        data.forEach(item => {
          relData.push(item);
        });
      }
    } else if (filterSite && Number(startWeek) > 0 && Number(endWeek) > 0) {
      setShowFilter(true);
      data.forEach(item => {
        if (Number(item.startWeek) >= Number(startWeek) && Number(item.endWeek) <= Number(endWeek) && item.site === filterSite) {
          relData.push(item);
        }
      });
    } else {
      setShowFilter(false);
    }
    setFilterData(relData);
  }, [startWeek, endWeek, filterSite]);

  const resetHandler = e => {
    setSelectedId('');
  };

  const clickHandler = e => {
    setSelectedId(e.target.value);
  };

  const filterSiteHandler = e => {
    setFilterSite(e.target.value);
  };

  const filterAreaHandler = e => {
    if (e.target.value && e.target.value !== '-') {
      setFilterArea(e.target.value);
      if (e.target.value === 'Central') {
        setSiteOptions(centralSiteOptionsArr);
      }
      if (e.target.value === 'East') {
        setSiteOptions(eastSiteOptionsArr);
      }
      if (e.target.value === 'West') {
        setSiteOptions(westSiteOptionsArr);
      }
    }
  };

  const changeStartWeekHandler = e => {
    setStartWeek(e.target.value);
  };

  const changeEndWeekHandler = e => {
    setEndWeek(e.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='p-5'>
      {/* <div>
        <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Planning</div>
      </div> */}
      <div>
        {/* <div className='text-2xl font-medium leading-6 text-gray-900 text-center my-10 font-bold'>Job Form</div> */}

        <div className='text-lg font-medium leading-6 text-gray-900 text-center my-10 '>Allocate Resources for Planned Activities </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='w-4/5 mx-auto'>
          <div className='mt-5 md:mt-0'>
            <form action='#' method='POST' onKeyPress={handleKeyPress}>
              <div className='shadow overflow-hidden sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
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
                    <div className='col-span-6'>
                      <label htmlFor='area' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Choose Area
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={filterAreaHandler} value={filterArea}>
                        {areaOptions.length > 0 &&
                          areaOptions.map(item => {
                            return (
                              <option value={item} key={uuidv4()}>
                                {item}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className='col-span-6'>
                      <label htmlFor='site' className='block mb-2 text-sm font-medium text-gray-700 '>
                        Choose Site
                      </label>
                      <select id='site' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onChange={filterSiteHandler} value={filterSite}>
                        {siteOptions.length > 0 &&
                          siteOptions.map(item => {
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
                        Choose Upcoming Activity
                      </label>
                      <select id='area' className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md' onClick={clickHandler}>
                        <option value=''>-</option>
                        {showFilter
                          ? data.length > 0 &&
                            filterData.map(item => {
                              return (
                                <option value={item._id} key={item._id}>
                                  {item.description}
                                </option>
                              );
                            })
                          : data.length > 0 &&
                            data.map(item => {
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
                        Submit
                      </button>
                      <button className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2 mx-4' type='reset' onClick={resetHandler}>
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
  );
};

export default PlanningForm;
