import React, { useState, useEffect } from 'react';

import { Eventcalendar } from '@mobiscroll/react';
import Navbar from './Navbar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ActivityTimeline = () => {
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [pageStart, setPageStart] = useState('');
  const [pageEnd, setPageEnd] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    }
  }, [userInfo]);

  useEffect(() => {
    getJobsHandler();
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

  const renderCustomHeader = () => {
    return (
      <div className='md-resource-header-template-title'>
        <div className='md-resource-header-template-name text-center my-5'>Activities</div>
      </div>
    );
  };

  async function getJobsHandler() {
    const res = await axios.get('/api/jobs');
    if (res.data.length > 0) {
      setJobs(res.data);
      console.log(res.data);
      let gpGroups = [];
      res.data.forEach(item => {
        let a = {
          id: '',
          name: ''
        };
        a.id = item._id;
        a.name = item.description;
        gpGroups.push(a);
      });
    }
  }

  const filterJobs = (a, b) => {
    console.log(a);
    console.log(b);
  };

  const view = React.useMemo(() => {
    return {
      timeline: {
        type: 'month',
        weekNumbers: true,
        eventList: true,
        size: 12
      }
    };
  }, []);

  const myEvents = React.useMemo(() => {
    return [
      {
        start: '2022-09-02T00:00',
        end: '2022-09-05T00:00',
        title: 'Event 1',
        resource: 1
      },
      {
        start: '2022-09-10T09:00',
        end: '2022-09-15T15:00',
        title: 'Event 2',
        resource: 3
      },
      {
        start: '2022-09-12T00:00',
        end: '2022-09-14T00:00',
        title: 'Event 3',
        resource: 4
      },
      {
        start: '2022-09-15T07:00',
        end: '2022-09-20T12:00',
        title: 'Event 4',
        resource: 5
      },
      {
        start: '2022-09-03T00:00',
        end: '2022-09-10T00:00',
        title: 'Event 5',
        resource: 6
      },
      {
        start: '2022-09-10T08:00',
        end: '2022-09-11T20:00',
        title: 'Event 6',
        resource: 7
      },
      {
        start: '2022-09-22T00:00',
        end: '2022-09-28T00:00',
        title: 'Event 7',
        resource: 7
      },
      {
        start: '2022-09-08T00:00',
        end: '2022-09-13T00:00',
        title: 'Event 8',
        resource: 15
      },
      {
        start: '2022-09-25T00:00',
        end: '2022-09-27T00:00',
        title: 'Event 9',
        resource: 10
      },
      {
        start: '2022-09-20T00:00',
        end: '2022-09-23T00:00',
        title: 'Event 10',
        resource: 12
      }
    ];
  }, []);

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
      <Navbar />
      <div className='p-3'>
        <Eventcalendar
          theme='ios'
          themeVariant='light'
          view={view}
          data={myEvents}
          resources={myResources}
          onPageLoading={function (event, inst) {
            setPageStart(event.firstDay);
            setPageEnd(event.lastDay);
            // filterJobs(event.firstDay, event.lastDay);
          }}
          colors={weekends}
          clickToCreate={true}
          dragToCreat={true}
          dragToMove={true}
          dragToResize={true}
          dragTimeStep={15}
          eventDelete={true}
          renderResourceHeader={renderCustomHeader}
        />
      </div>
    </>
  );
};

export default ActivityTimeline;
