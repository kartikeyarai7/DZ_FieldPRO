import React, { useEffect, useState } from 'react';
import Navbar from '../partials/Navbar';
import PlanningForm from '../partials/PlanningForm';

const Planning = () => {
  const [upcomingAct, setUpcomingAct] = useState([]);
  return (
    <>
      <Navbar />
      {/* <PlanningForm /> */}
    </>
  );
};

export default Planning;
