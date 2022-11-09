import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/loginActions';

function SignIn() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo && userInfo.username) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const checkHandler = () => {
    setPasswordShown(!passwordShown);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const ButtonMailto = ({ mailto, label }) => {
    return (
      <Link
        to='#'
        onClick={e => {
          window.location.href = mailto;
          e.preventDefault();
        }}
      >
        {label}
      </Link>
    );
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='flex flex-col min-h-screen overflow-hidden'>
      {/*  Site header */}

      {/*  Page content */}
      <main className='flex-grow'>
        <section className='bg-gradient-to-b from-gray-100 to-white'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
            <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
              {/* Page header */}
              <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
                <h1 className='h1'>Welcome back. </h1>
              </div>

              {/* Form */}
              <div className='max-w-sm mx-auto'>
                <form onSubmit={submitHandler} onKeyPress={handleKeyPress}>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='username'>
                        Username
                      </label>
                      <input id='username' type='text' className='form-input w-full text-gray-800' placeholder='Enter your username' onChange={e => setUserName(e.target.value)} required />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <div className='flex justify-between'>
                        <label className='block text-gray-800 text-sm font-medium mb-1' htmlFor='password'>
                          Password
                        </label>
                      </div>
                      <input id='password' type={!passwordShown ? 'password' : 'text'} className='form-input w-full text-gray-800' placeholder='Enter your password' onChange={e => setPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mb-4'>
                    <div className='w-full px-3'>
                      <div className='flex justify-between'>
                        <label className='flex items-center'>
                          <input type='checkbox' className='form-checkbox' onClick={checkHandler} />
                          <span className='text-gray-600 ml-2'>Show Password</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap -mx-3 mt-6'>
                    <div className='w-full px-3'>
                      <button className='btn text-white bg-blue-600 hover:bg-blue-700 w-full'>Sign in</button>
                    </div>
                  </div>
                </form>
                <div className='flex items-center my-6'>
                  <div className='border-t border-gray-300 flex-grow mr-3' aria-hidden='true'></div>
                  <div className='text-gray-600 italic'>Or</div>
                  <div className='border-t border-gray-300 flex-grow ml-3' aria-hidden='true'></div>
                </div>

                <div className='text-gray-600 text-center mt-6'>
                  Don’t have an account? <ButtonMailto label='Contact Admin' mailto='mailto:ITSDDubai@gi-de.com' />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
