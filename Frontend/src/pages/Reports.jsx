import React, { useState, createRef, useEffect } from 'react';
import Navbar from '../partials/Navbar';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import ReportForm from '../partials/ReportForm';
import ReportResults from '../partials/ReportResults';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const [results, setResults] = useState([]);
  const [dur, setDur] = useState({});
  const ref = createRef(null);
  const [count, setCount] = useState(0);
  const [toPrint, setToPrint] = useState(false);
  const [showResults, setShowResults] = useState(false);
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
    }
  }, [userInfo]);

  // useEffect(() => {
  //   if (toPrint) {
  //     takeScreenShot(ref.current).then(download);
  //   }
  // }, [toPrint]);

  const submitHandler = data => {
    const formEntry = {
      startDate: data.startDate,
      endDate: data.endDate,
      resource: data.name,
      area: data.area,
      site: data.site,
      products: data.products,
      activity: data.activity,
      serialNumber: data.serialNumber
    };
    if (data.name === '-') {
      data.name = '';
    }
    setDur(formEntry);
    resultHandler(data);
  };

  const resultHandler = data => {
    getResultsHandler(data);
  };

  const setCountHandler = c => {
    setCount(c);
  };

  async function getResultsHandler(data) {
    const res = await axios.post('/api/report_data', data);
    if (res.status === 200) {
      setResults(res.data);
      setShowResults(true);
    }
  }

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

  const printReportHandler = () => {
    window.print();
  };

  const hideResultsHandler = () => {
    setShowResults(false);
  };

  return (
    <>
      <Navbar />
      {/* <button className='ml-5 p-2 text-white bg-indigo-600 rounded' onClick={downloadScreenshot}>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' />
        </svg>
      </button> */}
      <button className='m-5 p-2 text-white bg-indigo-600 rounded' onClick={downloadScreenshot}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-3 h-3' onClick={printReportHandler}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z' />
        </svg>
      </button>
      <div ref={ref}>
        <ReportForm onSubmit={submitHandler} onCount={setCountHandler} />
        {showResults && <ReportResults data={results} entryData={dur} onHide={hideResultsHandler} rC={count} />}
      </div>
      {/* <ReportMap /> */}
    </>
  );
};

export default Reports;
