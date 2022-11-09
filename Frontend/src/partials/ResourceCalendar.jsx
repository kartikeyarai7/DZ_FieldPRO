import React, { useMemo, useEffect, useState, createRef } from 'react';
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import axios from 'axios';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResourceCalendar = () => {
  const [resources, setResources] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toPrint, setToPrint] = useState(false);
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      getResourceHandler();
      getJobsHandler();
    }
  }, [userInfo]);

  // useEffect(() => {
  //   getResourceHandler();
  //   getJobsHandler();
  // }, []);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  const download = (image, { name = 'Resource-Schedule', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  const downloadScreenshot = () => {
    setToPrint(true);
  };

  // console.log(jobs);
  // console.log(resources);

  async function resourceHandler() {
    const res = await axios.get('/api/resources');

    const d1 = [];

    if (res.status === 200) {
      const filteredRes = res.data.filter(item => item.name !== 'Khaldi Bouchra');
      filteredRes.forEach(item => {
        const res = {
          id: item.name.split(' ')[0],
          name: item.name,
          color: 'blue'
        };
        d1.push(res);
      });

      let sortedD1 = d1.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

      setResources(sortedD1);
    }
  }

  async function jobHandler() {
    const res = await axios.get('/api/jobs');
    const d2 = [];
    if (res.status === 200) {
      res.data.forEach(item => {
        item.resources.forEach(re => {
          const event = {
            start: item.startDate.split(' ')[0] + 'T08:30',
            end: item.endDate.split(' ')[0] + 'T16:30',
            title: item.description,
            resource: re.split(' ')[0]
          };
          d2.push(event);
        });
      });
      setJobs(d2);
    }
  }

  const getJobsHandler = () => {
    jobHandler();
  };

  const getResourceHandler = () => {
    resourceHandler();
  };

  const view = React.useMemo(() => {
    return {
      timeline: {
        type: 'month',
        eventList: true,
        weekNumbers: true
      }
    };
  }, []);

  const renderCustomHeader = () => {
    return (
      <div className='md-resource-header-template-title'>
        <div className='md-resource-header-template-name text-center my-2'>Resources</div>
      </div>
    );
  };

  const myEvents = React.useMemo(() => {
    return [
      {
        start: '2022-08-02T00:00',
        end: '2022-08-05T00:00',
        title: 'Event 1',
        resource: 1
      },
      {
        start: '2022-08-10T09:00',
        end: '2022-08-15T15:00',
        title: 'Event 2',
        resource: 3
      },
      {
        start: '2022-08-12T00:00',
        end: '2022-08-14T00:00',
        title: 'Event 3',
        resource: 4
      },
      {
        start: '2022-08-15T07:00',
        end: '2022-08-20T12:00',
        title: 'Event 4',
        resource: 5
      },
      {
        start: '2022-08-03T00:00',
        end: '2022-08-10T00:00',
        title: 'Event 5',
        resource: 6
      },
      {
        start: '2022-08-10T08:00',
        end: '2022-08-11T20:00',
        title: 'Event 6',
        resource: 7
      },
      {
        start: '2022-08-22T00:00',
        end: '2022-08-28T00:00',
        title: 'Event 7',
        resource: 7
      },
      {
        start: '2022-08-08T00:00',
        end: '2022-08-13T00:00',
        title: 'Event 8',
        resource: 15
      },
      {
        start: '2022-08-25T00:00',
        end: '2022-08-27T00:00',
        title: 'Event 9',
        resource: 10
      },
      {
        start: '2022-08-20T00:00',
        end: '2022-08-23T00:00',
        title: 'Event 10',
        resource: 12
      }
    ];
  }, []);

  const weekends = [
    {
      background: '#efffea',
      recurring: {
        repeat: 'weekly',
        weekDays: 'FR,SA'
      }
    }
  ];

  const myResources = React.useMemo(() => {
    return [
      {
        id: 1,
        name: 'Resource A',
        color: '#e20000'
      },
      {
        id: 2,
        name: 'Resource B',
        color: '#76e083'
      },
      {
        id: 3,
        name: 'Resource C',
        color: '#4981d6'
      },
      {
        id: 4,
        name: 'Resource D',
        color: '#e25dd2'
      },
      {
        id: 5,
        name: 'Resource E',
        color: '#1dab2f'
      },
      {
        id: 6,
        name: 'Resource F',
        color: '#d6d145'
      },
      {
        id: 7,
        name: 'Resource G',
        color: '#34c8e0'
      },
      {
        id: 8,
        name: 'Resource H',
        color: '#9dde46'
      },
      {
        id: 9,
        name: 'Resource I',
        color: '#166f6f'
      },
      {
        id: 10,
        name: 'Resource J',
        color: '#f7961e'
      },
      {
        id: 11,
        name: 'Resource K',
        color: '#34c8e0'
      },
      {
        id: 12,
        name: 'Resource L',
        color: '#af0000'
      },
      {
        id: 13,
        name: 'Resource M',
        color: '#446f1c'
      },
      {
        id: 14,
        name: 'Resource N',
        color: '#073138'
      },
      {
        id: 15,
        name: 'Resource O',
        color: '#4caf00'
      }
    ];
  }, []);

  return (
    <>
      <button className='m-2 p-2 text-white bg-indigo-600 rounded' onClick={downloadScreenshot}>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
        </svg>
      </button>
      <div ref={ref}>
        <Eventcalendar theme='ios' themeVariant='light' view={view} data={jobs} resources={resources} colors={weekends} renderResourceHeader={renderCustomHeader} />
      </div>
    </>
  );
};

export default ResourceCalendar;
