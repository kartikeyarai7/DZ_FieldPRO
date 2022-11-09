import React, { useEffect } from 'react';
import JobCalendar from '../partials/JobCalendar';
import Navbar from '../partials/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const JobSchedule = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    }
  }, [userInfo]);

  return (
    <>
      <Navbar />
      <div className='p-2'>
        <JobCalendar />
      </div>
    </>
  );
};

export default JobSchedule;
