import React, { useState, useEffect, createRef } from 'react';
import Navbar from '../partials/Navbar';
import JobTable from '../partials/JobTable';
import JobForm from '../partials/JobForm';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditJobForm from '../partials/EditJobForm';
import JobModal from '../partials/JobModal';
import AllocationTable from '../partials/AllocationTable';
import PaginationTable from '../partials/Pagination';
import PlanningForm from '../partials/PlanningForm';
import PlanJobForm from '../partials/PlanJobForm';
import { useScreenshot, createFileName } from 'use-react-screenshot';

// import TrainerNominations from '../partials/TrainerNominations';
// import ReactModal from '../partials/ReactModal';

const Jobs = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [planData, setPlanData] = useState([]);

  const [slotData, setSlotData] = useState({});
  const [changed, setChanged] = useState(false);
  const [editing, setEditing] = useState(false);
  const [retrieving, setRetrieving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState('');
  const [oldData, setOldData] = useState({});
  const [plannedData, setPlannedData] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [trainerAvl, setTrainerAvl] = useState([]);
  const [jobToUpdate, setJobToUpdate] = useState('');
  const [dis, setDis] = useState(false);
  const [avlResources, setAvlResources] = useState([]);
  const [currentJob, setcurrentJob] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [toPrint, setToPrint] = useState(false);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = trainingData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(trainingData.length / recordsPerPage);
  const notyf = new Notyf();
  const ref = createRef(null);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const [image, takeScreenShot] = useScreenshot({
    type: 'image/jpeg',
    quality: 1.0
  });

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      dataHandler();
      planHandler();
    }
  }, [userInfo, changed]);

  useEffect(() => {
    if (toPrint) {
      takeScreenShot(ref.current).then(download);
    }
  }, [toPrint]);

  // useEffect(() => {
  //   dataHandler();
  // }, [changed]);

  useEffect(() => {
    if (editId) {
      getOldDataHandler(editId.id);
    }
  }, [editId]);

  // useEffect(() => {
  //   planHandler();
  // }, []);

  async function planHandler() {
    let planData = await axios.get('/api/plan');
    const today = new Date();
    const currentYear = today.getFullYear(); // Current Year projects
    // const validData = planData.data.filter(item => new Date(getDateOfISOWeek(item.startWeek, currentYear)) >= today);
    const filteredPlan = planData.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    setPlanData(planData.data);
  }

  async function dataHandler() {
    let tData = await axios.get('/api/jobs');
    tData.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    setTrainingData(tData.data);
  }

  const addTrainingData = data => {
    clickHandler(data);
  };

  const updateTrainerHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  async function getOldDataHandler(id) {
    const payload = {
      id: id
    };
    const oldD = await axios.post('/api/get_job', payload);
    setOldData(oldD.data);
  }

  const deleteRequestHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  const removeResourceHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  const refreshHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  async function clickHandler(data) {
    // console.log(data);
    try {
      const res = await axios.post('/api/add_job', data);
      if (res.status === 200) {
        notyf.success('Added to Database');
        setChanged(prev => {
          return !prev;
        });
        setRetrieving(false);
      }
    } catch (error) {
      console.log(error);
      notyf.error('Encountered Error');
    }
  }

  const trainerRequestHandler = data => {
    setTrainerAvl(data.data);
    setDis(true);
  };

  const slotHandler = data => {
    setSlotData(data);
  };

  const selectJobHandler = data => {
    setJobToUpdate(data);
  };

  const getDateOfISOWeek = (w, y) => {
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  };

  const convertDateFormat = dateF => {
    const initialDate = new Date(dateF);
    const offset = initialDate.getTimezoneOffset();
    const d = new Date(initialDate.getTime() - offset * 60 * 1000);
    const adjustedDate = d.toISOString().split('T')[0];
    return adjustedDate;
  };

  const addBusinessDays = (originalDate, numDaysToAdd) => {
    const Friday = 5;
    const Saturday = 6;
    let daysRemaining = numDaysToAdd - 1;

    const newDate = new Date(originalDate);

    while (daysRemaining > 0) {
      newDate.setDate(newDate.getDate() + 1);
      if (newDate.getDay() !== 5 && newDate.getDay() !== 6) {
        daysRemaining--;
      }
    }

    return newDate;
  };

  async function populateForm(id) {
    const payload = {
      id: id
    };
    const formRes = await axios.post('/api/get_plannedjob', payload);
    if (formRes.status === 200) {
      let finalStart = '';
      let finalEnd = '';
      // console.log(formRes.data);
      if (formRes.data.startDate && formRes.data.endDate) {
        finalStart = formRes.data.startDate;
        finalEnd = formRes.data.endDate;
      } else {
        if (Number(formRes.data.duration) !== 1 && Number(formRes.data.duration) !== 0.5) {
          let year = new Date().getFullYear();
          let d1 = getDateOfISOWeek(formRes.data.startWeek, year);
          // let d2 = getDateOfISOWeek(formRes.data.endWeek, year);
          let d3 = new Date(d1);
          d3.setDate(d3.getDate() + Number(formRes.data.dayOfWeek) - 2);
          let d5 = addBusinessDays(d3, Number(formRes.data.duration));
          let d6 = new Date(d5);
          // let d4 = new Date(d2);
          // d4.setDate(d4.getDate() + 3);
          let D6 = convertDateFormat(d6.toLocaleDateString());

          let D3 = convertDateFormat(d3.toLocaleDateString());
          // let D4 = convertDateFormat(d4.toLocaleDateString());

          // let D3 = convertDateFormat(d3.toLocaleDateString());
          finalStart = D3;
          finalEnd = D6;
        } else {
          let year = new Date().getFullYear();
          let d1 = getDateOfISOWeek(formRes.data.startWeek, year);

          let d3 = new Date(d1);
          d3.setDate(d3.getDate() + Number(formRes.data.dayOfWeek) - 2);
          let d4 = new Date(d1);
          d4.setDate(d4.getDate() + Number(formRes.data.dayOfWeek) - 2);
          let D4 = convertDateFormat(d4.toLocaleDateString());

          let D3 = convertDateFormat(d4.toLocaleDateString());
          finalStart = D3;
          finalEnd = D4;
        }
      }

      const finalData = {
        ...formRes.data,
        startDate: finalStart,
        endDate: finalEnd,
        planId: id
      };
      setPlannedData(finalData);
    }

    setRetrieving(true);
  }

  const editRequestHandler = data => {
    setEditing(true);
    setEditId(data);
  };

  const addUpdateData = data => {
    updateDataHandler(data, editId);
  };

  const addPlannedData = data => {
    clickHandler(data);
  };

  const refreshSlotHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const allocationHandler = data => {
    setcurrentJob(data);
    getAvailableResourcesHandler(data);
  };

  async function getAvailableResourcesHandler(data) {
    const payload = {
      startDate: data.startDate,
      endDate: data.endDate,
      area: data.area
    };

    const avlRes = await axios.post('/api/allocation_resources', payload);
    if (avlRes.status === 200) {
      console.log(avlRes.data);
      if (avlRes.data.length > 0) {
        setAvlResources(avlRes.data);
        setShowModal(true);
      } else {
        notyf.error('No Results Found');
      }
    } else {
      notyf.error('Encountered Error');
    }
  }

  const hideFormHandler = () => {
    setRetrieving(false);
  };

  async function updateDataHandler(content, editedId) {
    const payload = {
      data: content,
      id: editedId.id
    };
    const res = await axios.put('/api/edit_job', payload);
    // console.log(res.status);
    if (res.status === 200) {
      setChanged(prev => {
        return !prev;
      });
      notyf.success('Updated Database');
    } else if (res.status === 202) {
      setChanged(prev => {
        return !prev;
      });
      notyf.error('Updated Data. Reassign resources');
    }
  }

  const hideTableHandler = () => {
    setShowModal(false);
  };

  const hideEditFormHandler = () => {
    setEditing(false);
  };

  const printReportHandler = () => {
    setToPrint(true);
  };

  const download = (image, { name = 'Schedule', extension = 'jpg' } = {}) => {
    const a = document.createElement('a');
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
    setToPrint(false);
  };

  return (
    <>
      <Navbar />
      {/* {!editing && <JobForm onNewData={addTrainingData} />} */}
      <PlanningForm data={planData} onSubmit={populateForm} />
      {editing && <EditJobForm onUpdatedData={addUpdateData} oldData={oldData} onHide={hideEditFormHandler} />}
      {retrieving && <PlanJobForm oldData={plannedData} onSubmit={addPlannedData} onHideForm={hideFormHandler} />}
      <button className='m-5 p-2 text-white bg-indigo-600 rounded' onClick={printReportHandler}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-3 h-3'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z' />
        </svg>
      </button>
      <div ref={ref}>
        <JobTable data={currentRecords} onDelete={deleteRequestHandler} onEdit={editRequestHandler} onAllocate={allocationHandler} onRemove={removeResourceHandler} incData={trainingData} />
      </div>

      <PaginationTable nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {showModal && <AllocationTable data={avlResources} curJob={currentJob} refreshData={refreshHandler} onHide={hideTableHandler} />}
    </>
  );
};

export default Jobs;
