import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import './css/style.scss';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Resource from './pages/Resource';
import Jobs from './pages/Jobs';
import ResourceSchedule from './pages/ResourceSchedule';
import ResourceProfile from './pages/ResourceProfile';
import JobProfile from './pages/JobProfile';
import JobSchedule from './pages/JobSchedule';
import Reports from './pages/Reports';

import ActivityTimeline from './partials/ActivityTimeline';
import AnnualPlan from './pages/AnnualPlan';
import ScheduleDif from './pages/ScheduleDif';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic'
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/resources' element={<Resource />} />
        <Route exact path='/jobs' element={<Jobs />} />
        <Route exact path='/allocation' element={<ResourceSchedule />} />
        <Route exact path='/schedule-gap' element={<ScheduleDif />} />
        <Route exact path='/current-schedule' element={<JobSchedule />} />
        <Route exact path='/reports' element={<Reports />} />
        <Route path='/resource-data/:id' element={<ResourceProfile />} />
        <Route path='/job-data/:id' element={<JobProfile />} />
        {/* <Route path='/activity-timeline' element={<ActivityTimeline />} /> */}
        <Route path='/annual-plan' element={<AnnualPlan />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
