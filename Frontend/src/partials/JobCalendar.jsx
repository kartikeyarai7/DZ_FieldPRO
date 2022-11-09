import React, { useState, useEffect, createRef } from 'react';
import { Eventcalendar, CalendarPrev, CalendarNav, CalendarNext, CalendarToday, SegmentedGroup, SegmentedItem, getJson, setOptions } from '@mobiscroll/react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const JobCalendar = () => {
  const [calendarType, setCalendarType] = useState('quarter'); //Err
  const [myEvents, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [toPrint, setToPrint] = useState(false);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });
  const ref = createRef(null);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const weekends = [
    {
      background: '#efffea',
      recurring: {
        repeat: 'weekly',
        weekDays: 'FR,SA'
      }
    }
  ];

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      getJobsHandler();
    }
  }, [userInfo]);

  // useEffect(() => {
  //   getJobsHandler();
  // }, []);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  async function fetchJobs() {
    const res = await axios.get('/api/jobs');
    const d = [];
    if (res.status === 200) {
      res.data.forEach(item => {
        let rStr = '';
        // console.log(item);
        item.resources.forEach(it => {
          rStr = rStr + it + ' ';
          return rStr;
        });
        const event = {
          start: item.startDate,
          end: item.endDate,
          title: item.description + ' -  ' + rStr,
          id: item._id,
          color: 'blue'
        };
        d.push(event);
      });
      setJobs(d);
    }
  }

  const getJobsHandler = () => {
    fetchJobs();
  };

  const download = (image, { name = 'Schedule', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  const downloadScreenshot = () => {
    setToPrint(true);
  };

  const view = React.useMemo(
    () =>
      calendarType === 'quarter'
        ? {
            calendar: {
              type: 'month',
              size: 1,
              labels: 'all'
            }
          }
        : {
            calendar: {
              type: 'year'
            }
          },
    [calendarType]
  );

  const calHeight = React.useMemo(() => (calendarType === 'quarter' ? 'auto' : 'height:100%'), [calendarType]);

  const calendarHeaderSwitch = () => {
    return (
      <React.Fragment>
        <button className='m-2 p-2 text-white bg-indigo-600 rounded' onClick={downloadScreenshot}>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
          </svg>
        </button>
        <CalendarNav />
        <div className='quarter-year-header-picker'>
          <SegmentedGroup value={calendarType} onChange={changeView}>
            <SegmentedItem value='quarter'>Month</SegmentedItem>
            <SegmentedItem value='year'>Year</SegmentedItem>
          </SegmentedGroup>
        </div>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </React.Fragment>
    );
  };

  const changeView = event => {
    setCalendarType(event.target.value);
  };

  return (
    <div ref={ref}>
      {' '}
      <Eventcalendar data={jobs} view={view} height={calHeight} renderHeader={calendarHeaderSwitch} colors={weekends} />
    </div>
  );
};

export default JobCalendar;
