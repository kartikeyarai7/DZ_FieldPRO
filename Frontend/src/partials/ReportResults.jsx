import React, { useState, useEffect } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Chart } from 'react-google-charts';

const ReportResults = ({ data, entryData, onHide, rC }) => {
  const [workingDays, setworkingDays] = useState(0);
  const [workingHours, setworkingHours] = useState(0);
  const [utilization, setutilization] = useState(0);
  const [pmC, setPmC] = useState(0);
  const [c1Count, setC1Count] = useState(0);
  const [c4Count, setC4Count] = useState(0);
  const [c5Count, setC5Count] = useState(0);
  const [cmC, setCmC] = useState(0);
  const [iC, setIC] = useState(0);
  const [svC, setSvC] = useState(0);
  const [shC, setShC] = useState(0);

  const notyf = new Notyf();
  const navigate = useNavigate();

  const getProfileHandler = id => {
    navigate(`/job-data/${id}`);
  };

  useEffect(() => {
    if (data.length > 0) {
      const duration = {
        startDate: entryData.startDate,
        endDate: entryData.endDate
      };
      dataAnalysisHandler(data, duration);
      //   calculateUtilization(duration);
    }
  }, [data, entryData]);

  const dataAnalysisHandler = (data, duration) => {
    let count = 0;
    let wHours = 0;
    let pmCount = 0;
    let insCount = 0;
    let svCount = 0;
    let cmCount = 0;
    let shCount = 0;
    let c1C = 0;
    let c4C = 0;
    let c5C = 0;
    let t = 0;
    data.forEach(item => {
      if (item.activity === 'PM' || item.activity === 'CM' || item.activity === 'INST' || item.activity === 'Ins' || item.activity === 'Shadowing') {
        t = 8;
      } else if (item.activity === 'INSP') {
        if (item.product === 'C1') {
          t = 2;
        }
        if (item.product === 'C4') {
          t = 4;
        }
        if (item.product === 'C5') {
          t = 4;
        }
      }
      // count = count + getBusinessDaysCount(item.startDate, item.endDate);
      wHours = wHours + getBusinessHoursCount(item.startDate, item.endDate, t);
    });
    setworkingDays(data.length);
    setworkingHours(count);
    let total = getTotalDays(duration.startDate, duration.endDate);
    let totalHours = total;
    if (!entryData.resource && entryData.startDate && entryData.endDate) {
      let res = [];

      totalHours = total * 8 * Number(rC);
    } else {
      totalHours = total * 8;
    }
    // let util = Math.round((count * 100) / total);
    let util = Math.round((wHours * 100) / totalHours);
    console.log(util);
    setutilization(util);

    data.forEach(item => {
      if (item.activity === 'PM') {
        let pmT = getBusinessDatesCount(item.startDate, item.endDate);
        pmCount = pmCount + pmT;
      } else if (item.activity === 'CM') {
        let cmT = getBusinessDatesCount(item.startDate, item.endDate);
        cmCount = cmCount + cmT;
      } else if (item.activity === 'Shadowing') {
        let shT = getBusinessDatesCount(item.startDate, item.endDate);
        shCount = shCount + shT;
      } else if (item.activity === 'Ins' || item.activity === 'INST') {
        let insT = getBusinessDatesCount(item.startDate, item.endDate);
        insCount = insCount + insT;
      } else if (item.activity.includes('INSP')) {
        let siteT = getBusinessDatesCount(item.startDate, item.endDate);
        svCount = svCount + siteT;
      }
    });

    data.forEach(item => {
      if (item.product === 'C1') {
        c1C++;
      } else if (item.product === 'C4') {
        c4C++;
      } else if (item.product === 'C5') {
        c5C++;
      }
    });

    setC1Count(c1C);
    setC4Count(c4C);
    setC5Count(c5C);
    setPmC(pmCount);
    setIC(insCount);
    setSvC(svCount);
    setCmC(cmCount);
    setShC(shCount);
  };

  const getBusinessDatesCount = (a, b) => {
    if (entryData.startDate && entryData.endDate) {
      let endBound = entryData.endDate.split('-');
      let startBound = entryData.startDate.split('-');
      let endBoundDate = new Date(endBound[1] + '/' + endBound[2] + '/' + endBound[0]);
      let startBoundDate = new Date(startBound[1] + '/' + startBound[2] + '/' + startBound[0]);
      let startArray = a.split('-');
      let endArray = b.split('-');
      let startDate = new Date(startArray[1] + '/' + startArray[2] + '/' + startArray[0]);
      let endDate = new Date(endArray[1] + '/' + endArray[2] + '/' + endArray[0]);
      let count = 0;
      const curDate = new Date(startDate.getTime());
      if (startDate >= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate <= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate < startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate && curDate <= endBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate >= startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate <= endBoundDate) {
            count++;
            console.log(count); //Rectify
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      }

      return count;
    } else {
      //   let endBound = entryData.endDate.split('-');
      // let startBound = entryData.startDate.split('-');
      // let endBoundDate = new Date(endBound[1] + '/' + endBound[2] + '/' + endBound[0]);
      // let startBoundDate = new Date(startBound[1] + '/' + startBound[2] + '/' + startBound[0]);
      let startArray = a.split('-');
      let endArray = b.split('-');
      let startDate = new Date(startArray[1] + '/' + startArray[2] + '/' + startArray[0]);
      let endDate = new Date(endArray[1] + '/' + endArray[2] + '/' + endArray[0]);
      let startBoundDate = startDate;
      let endBoundDate = endDate;
      let count = 0;
      const curDate = new Date(startDate.getTime());
      if (startDate >= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate <= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate < startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate && curDate <= endBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate >= startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate <= endBoundDate) {
            count++;
            console.log(count); //Rectify
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      }

      return count;
    }
  };

  const getBusinessDaysCount = (a, b) => {
    if (entryData.startDate && entryData.endDate) {
      let endBound = entryData.endDate.split('-');
      let startBound = entryData.startDate.split('-');
      let endBoundDate = new Date(endBound[1] + '/' + endBound[2] + '/' + endBound[0]);
      let startBoundDate = new Date(startBound[1] + '/' + startBound[2] + '/' + startBound[0]);
      let startArray = a.split('-');
      let endArray = b.split('-');
      let startDate = new Date(startArray[1] + '/' + startArray[2] + '/' + startArray[0]);
      let endDate = new Date(endArray[1] + '/' + endArray[2] + '/' + endArray[0]);
      let count = 0;
      const curDate = new Date(startDate.getTime());
      if (startDate >= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate <= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate < startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate && curDate <= endBoundDate) {
            count++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate >= startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate <= endBoundDate) {
            count++;
            console.log(count); //Rectify
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      }

      return count;
    }
  };
  const getBusinessHoursCount = (a, b, t) => {
    if (entryData.startDate && entryData.endDate) {
      let endBound = entryData.endDate.split('-');
      let startBound = entryData.startDate.split('-');
      let endBoundDate = new Date(endBound[1] + '/' + endBound[2] + '/' + endBound[0]);
      let startBoundDate = new Date(startBound[1] + '/' + startBound[2] + '/' + startBound[0]);
      let startArray = a.split('-');
      let endArray = b.split('-');
      let startDate = new Date(startArray[1] + '/' + startArray[2] + '/' + startArray[0]);
      let endDate = new Date(endArray[1] + '/' + endArray[2] + '/' + endArray[0]);
      let count = 0;
      const curDate = new Date(startDate.getTime());
      if (startDate >= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6) {
            count = count + t;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate <= startBoundDate && endDate <= endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate) {
            count = count + t;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate < startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate >= startBoundDate && curDate <= endBoundDate) {
            count = count + t;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      } else if (startDate >= startBoundDate && endDate > endBoundDate) {
        while (curDate <= endDate) {
          const dayOfWeek = curDate.getDay();
          if (dayOfWeek !== 5 && dayOfWeek !== 6 && curDate <= endBoundDate) {
            count = count + t;
            console.log(count); //Rectify
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      }

      return count;
    }
  };

  const getTotalDays = (a, b) => {
    let startArray = a.split('-');
    let endArray = b.split('-');
    let startDate = new Date(startArray[1] + '/' + startArray[2] + '/' + startArray[0]);
    let endDate = new Date(endArray[1] + '/' + endArray[2] + '/' + endArray[0]);
    let count = 0;
    const curDate = new Date(startDate.getTime());

    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 5 && dayOfWeek !== 6) {
        count++;
      }
      curDate.setDate(curDate.getDate() + 1);
    }

    return count;
  };

  //   const calculateUtilization = data => {
  //     const total = getBusinessDatesCount(data.startDate, data.endDate);
  //     console.log(total);
  //   };

  const dataChart = [
    ['Task', 'Days'],
    ['PM', pmC],
    ['CM', cmC],
    ['INS', iC],
    ['INSP', svC],
    ['Shadowing', shC]
  ];

  const productDataChart = [
    ['Products', 'Count'],
    ['C1', c1Count],
    ['C4', c4Count],
    ['C5', c5Count]
  ];

  const options = {
    title: 'Job Breakdown'
  };

  const productOptions = {
    title: 'Product Breakdown'
  };

  const hideDisplayHandler = () => {
    onHide();
  };

  return (
    <>
      <div className='p-5'>
        <div>
          <button className='text-xs p-2 btn bg-indigo-600 text-white float-right  ' onClick={hideDisplayHandler}>
            X
          </button>
        </div>
        <div>
          {entryData && data.length > 0 && (
            <div className='grid grid-cols-6 gap-4  mb-7'>
              {entryData && data.length > 0 && (
                <div className='bg-gray col-span-3 p-5 text-center border shadow-lg shadow-indigo-100   rounded'>
                  <div className='mt-7 mb-5 text-3xl'>{workingDays ? workingDays : 'NA'}</div>
                  <div>Activities</div>
                </div>
              )}
              {entryData && data.length > 0 && (
                <div className='bg-gray col-span-3 row-span-2 p-5 text-center border shadow-lg shadow-indigo-100 rounded'>
                  <div>
                    {' '}
                    <Chart chartType='PieChart' data={dataChart} options={options} width={'100%'} height={'400px'} />
                  </div>
                </div>
              )}
              {entryData && data.length > 0 && (
                <div className='bg-gray col-span-3 row-span-2 p-5 text-center border shadow-lg shadow-indigo-100 rounded'>
                  <div>
                    {' '}
                    <Chart chartType='PieChart' data={productDataChart} options={productOptions} width={'100%'} height={'400px'} />
                  </div>
                </div>
              )}
              {entryData && entryData.resource && data.length > 0 && (
                <div className='bg-gray col-span-3 p-5 text-center border shadow-lg shadow-indigo-100 rounded'>
                  <div className='mt-7 mb-5 text-3xl'>{utilization ? utilization + '%' : 'NA'}</div>
                  <div>Utilization</div>
                </div>
              )}
              {entryData && !entryData.resource && data.length > 0 && entryData.startDate && entryData.endDate && (
                <div className='bg-gray col-span-3 p-5 text-center border shadow-lg shadow-indigo-100 rounded'>
                  <div className='mt-7 mb-5 text-3xl'>{utilization ? utilization + '%' : 'NA'}</div>
                  <div>Average Utilization</div>
                </div>
              )}
            </div>
          )}
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
                        <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                          Product
                        </th>
                        <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                          Resources
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
                                <button className='bg-indigo-700 hover:bg-blue-700 text-white  py-2 px-2 rounded-full mx-1' onClick={() => getProfileHandler(item._id)}>
                                  {index + 1}
                                </button>
                              </td>

                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.description}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.startDate}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.endDate}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.area}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.site}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.product}</td>
                              <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{item.resources.map(res => res + ', ')}</td>
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
      </div>
    </>
  );
};

export default ReportResults;
