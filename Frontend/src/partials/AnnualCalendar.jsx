import React, { useState, useEffect, createRef } from 'react';
import { Eventcalendar, CalendarPrev, CalendarNav, CalendarNext, CalendarToday, SegmentedGroup, SegmentedItem, getJson, setOptions } from '@mobiscroll/react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

const AnnualCalendar = ({ changed, getId }) => {
  const [calendarType, setCalendarType] = useState('quarter'); //Err
  const [myEvents, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [toPrint, setToPrint] = useState(false);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });
  const [selectedEvent, setSelectedEvent] = useState('');
  const ref = createRef(null);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const notyf = new Notyf();

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
      getPlanHandler();
    }
  }, [userInfo, changed]);

  // useEffect(() => {
  //   getPlanHandler();
  // }, []);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  const getDateOfISOWeek = (w, y) => {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  };

  const convertDateFormat = dateF => {
    const initialDate = new Date(dateF);
    const offset = initialDate.getTimezoneOffset();
    const d = new Date(initialDate.getTime() - offset * 60 * 1000);
    // console.log(dateF);
    const adjustedDate = d.toISOString().split('T')[0];
    return adjustedDate;
  };

  const addBusinessDays = (originalDate, numDaysToAdd) => {
    const Friday = 5;
    const Saturday = 6;
    let daysRemaining = numDaysToAdd - 1;

    const newDate = new Date(originalDate);

    while (daysRemaining > 0) {
      newDate.setDate(newDate.getDate() + 1);
      if (newDate.getDay() !== 5 && newDate.getDay() !== 6) {
        daysRemaining--;
      }
    }

    return newDate;
  };

  async function fetchPlan() {
    const res = await axios.get('/api/plan_all');
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    let years = [currentYear]; // Plan applied for next year
    const d = [];
    if (res.status === 200) {
      res.data.forEach(item => {
        if (item.startDate && item.endDate) {
          const event = {
            start: item.startDate,
            end: item.endDate,
            title: item.description,
            id: item._id,
            color: 'blue'
          };
          d.push(event);
        } else {
          if (Number(item.duration) !== 1 && Number(item.duration) !== 0.5) {
            years.forEach(year => {
              let d1 = getDateOfISOWeek(item.startWeek, year);
              // let d2 = getDateOfISOWeek(item.endWeek, year);
              let d3 = new Date(d1);
              d3.setDate(d3.getDate() + Number(item.dayOfWeek) - 2);
              let d5 = addBusinessDays(d3, Number(item.duration));
              let d6 = new Date(d5);

              // let d4 = new Date(d2);
              // d4.setDate(d4.getDate() + Number(item.dayOfWeek) - 2);
              let D6 = convertDateFormat(d6.toLocaleDateString());

              let D3 = convertDateFormat(d3.toLocaleDateString());
              const event = {
                start: D3,
                end: D6,
                title: item.description,
                id: item._id,
                color: 'blue'
              };
              d.push(event);
            });
          } else {
            // Fix count working days only
            years.forEach(year => {
              let d1 = getDateOfISOWeek(item.startWeek, year);

              let d3 = new Date(d1);
              d3.setDate(d3.getDate() + Number(item.dayOfWeek) - 2);
              let d4 = new Date(d1);
              d4.setDate(d4.getDate() + Number(item.dayOfWeek) - 2);
              let D4 = convertDateFormat(d4.toLocaleDateString());

              let D3 = convertDateFormat(d3.toLocaleDateString());

              const event = {
                start: D3,
                end: D4,
                title: item.description,
                id: item._id,
                color: 'blue'
              };
              d.push(event);
            });
          }
        }
      });
      setJobs(d);
    }
  }

  const getPlanHandler = () => {
    fetchPlan();
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
              type: 'year',
              count: true,
              popover: true
            }
          },
    [calendarType]
  );

  const calHeight = React.useMemo(() => (calendarType === 'quarter' ? 'auto' : 'height:100%'), [calendarType]);

  const getScheduleHandler = date => {
    if (jobs.length > 0) {
      // console.log(jobs);
      const d1 = new Date(date);
      console.log(d1);
    }
  };

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
            {/* <SegmentedItem value='month'>Month</SegmentedItem> */}
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
      <Eventcalendar
        data={jobs}
        view={view}
        height={calHeight}
        renderHeader={calendarHeaderSwitch}
        colors={weekends}
        onEventDoubleClick={e => {
          getId(e.event);
        }}
        onCellRightClick={e => {
          getScheduleHandler(e.date);
        }}
      />
    </div>
  );
};

export default AnnualCalendar;
