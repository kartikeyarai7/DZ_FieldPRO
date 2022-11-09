import React, { useEffect, useState } from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import FeaturesHome from '../partials/Features';
import { useSelector } from 'react-redux';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, [history, userInfo]);

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      <Header status={isLoggedIn} />

      <main className='flex-grow'>
        <HeroHome />
        <FeaturesHome />
      </main>
    </div>
  );
}

export default Home;
