import React, { useEffect } from 'react';
import Navbar from '../partials/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResourceCalendar from '../partials/ResourceCalendar';

const ResourceSchedule = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    }
  }, [history, userInfo]);

  return (
    <>
      <Navbar />

      <div className='p-3'>
        <ResourceCalendar />
      </div>
    </>
  );
};

export default ResourceSchedule;
