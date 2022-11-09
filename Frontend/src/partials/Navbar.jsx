/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import gd from '../images/logo-gd.png';
import { Link } from 'react-router-dom';
import { logout } from '../actions/loginActions';

const navigation = [
  { name: 'Plan', href: '/annual-plan', current: false },
  { name: 'Allocate', href: '/jobs', current: false }

  // { name: 'Reports', href: '/reports', current: false }
];

const mobileNav = [
  { name: 'Plan', href: '/annual-plan', current: false },
  { name: 'Alllocate', href: '/jobs', current: false },
  { name: 'Allocation', href: '/allocation', current: false },
  { name: 'Current Schedule', href: '/current-schedule', current: false },
  { name: 'Reports', href: '/reports', current: false },
  { name: 'Resources', href: '/resources', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Disclosure as='nav' className='bg-indigo-700'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? <XIcon className='block h-6 w-6' aria-hidden='true' /> : <MenuIcon className='block h-6 w-6' aria-hidden='true' />}
                </Disclosure.Button>
              </div>
              <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex-shrink-0 flex items-center'>
                  <Link to='/'>
                    <img className='block lg:hidden h-8 w-auto' src={gd} alt='Workflow' />
                  </Link>
                  <Link to='/'>
                    <img className='hidden lg:block h-8 w-auto' src={gd} alt='Workflow' />
                  </Link>
                </div>
                <div className='hidden sm:block sm:ml-6'>
                  <div className='flex space-x-4'>
                    {navigation.map(item => (
                      <Link key={item.name} to={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-white hover:text-indigo-700', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </Link>
                    ))}
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className=' flex text-sm text-white rounded-md focus:outline-none hover:bg-white hover:text-indigo-700 '>
                          <span className='sr-only'>Open user menu</span>
                          <h2 className='p-2  font-medium'>View</h2>
                        </Menu.Button>
                      </div>
                      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
                        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                          <Menu.Item>
                            {() => (
                              <Link to='/resources' className='text-black hover:bg-white hover:text-indigo-700 rounded-md text-sm font-medium'>
                                <div className='p-2 text-left'> Resources </div>
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {() => (
                              <Link to='/allocation' className='text-black hover:bg-white hover:text-indigo-700 rounded-md text-sm font-medium'>
                                <div className='p-2 text-left'>Allocation </div>
                              </Link>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {() => (
                              <Link to='/current-schedule' className='text-black hover:bg-white hover:text-indigo-700  rounded-md text-sm font-medium'>
                                <div className='p-2 text-left'>Current Schedule</div>
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    <Menu as='div' className='ml-3 relative'>
                      <div>
                        <Menu.Button className=' flex text-sm text-white rounded-md focus:outline-none hover:bg-white hover:text-indigo-700 '>
                          {() => (
                            <Link to='/reports' className='text-white hover:bg-white hover:text-indigo-700 rounded-md text-sm font-medium'>
                              <div className='p-2 text-center'> Reports </div>
                            </Link>
                          )}
                        </Menu.Button>
                      </div>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open user menu</span>
                      <span className='text-indigo-700 p-2'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                      <Menu.Item>
                        {({ active }) => (
                          <a href='#' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} onClick={logoutHandler}>
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {mobileNav.map(item => (
                <Disclosure.Button key={item.name} as='a' href={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white hover:text-indigo-700', 'block px-3 py-2 rounded-md text-base font-medium')} aria-current={item.current ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
