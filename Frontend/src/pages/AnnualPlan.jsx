import React, { useState, useEffect } from 'react';
import AddPlanForm from '../partials/AddPlanForm';
import AnnualCalendar from '../partials/AnnualCalendar';
import axios from 'axios';
import Navbar from '../partials/Navbar';
import { Notyf } from 'notyf';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DeletePlanForm from '../partials/DeletePlanForm';
import EditPlanForm from '../partials/EditPlanForm';
import AddLeaveForm from '../partials/AddLeaveForm';

const AnnualPlan = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [resources, setResources] = useState([]);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [changes, setChanges] = useState(false);
  const [editedEventData, setEditedEventData] = useState({});
  const notyf = new Notyf();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      getResourceHandler();
    }
  }, [userInfo]);

  useEffect(() => {
    if (selectedEventId) {
      getEventDataHandler(selectedEventId);
    }
  }, [selectedEventId]);

  async function getEventDataHandler(id) {
    const payload = {
      id: id
    };
    const res = await axios.post('/api/plan_event', payload);
    if (res.status === 200) {
      setEditedEventData(res.data);
    }
  }

  const getResourceHandler = () => {
    resourceHandler();
  };

  async function resourceHandler() {
    const res = await axios.get('/api/resources');

    const d1 = [];

    if (res.status === 200) {
      res.data.forEach(item => {
        if (item.name !== 'Khaldi Bouchra') {
          d1.push(item.name);
        }
      });

      setResources(d1);
      setResourcesCount(Number(d1.length));
    }
  }

  const changeFormDisplay = () => {
    setShowForm(true);
  };

  const changeDeleteFormDisplay = () => {
    if (!selectedEventId) {
      setShowDeleteForm(true);
    } else {
      deletePlanHandler(selectedEventId);
    }
  };

  const changeLeaveFormDisplay = () => {
    setShowLeaveForm(true);
  };

  const getSelectedEventHandler = data => {
    setSelectedEventId(data.id);
    notyf.success('Selected ' + data.title);
  };

  const changeEditFormDisplay = () => {
    if (selectedEventId && editedEventData) {
      setShowEditForm(true);
    } else {
      notyf.error('No Event Selected');
    }
  };

  const addDataHandler = data => {
    submitDataHandler(data);
  };

  const addLeaveDataHandler = data => {
    submitLeaveDataHandler(data);
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const hideLeaveFormHandler = () => {
    setShowLeaveForm(false);
  };

  const hideEditFormHandler = () => {
    setShowEditForm(false);
  };

  const hideDeleteFormHandler = () => {
    setShowDeleteForm(false);
  };

  const updateCalendar = () => {
    setChanges(prev => {
      return !prev;
    });
  };

  async function updateDataHandler(data) {
    // console.log(data);
    // console.log(selectedEventId);
    const payload = {
      data,
      id: selectedEventId
    };
    const res = await axios.post('/api/edit_plan', payload);
    if (res.status === 200) {
      notyf.success('Updated Data');
      setChanges(prev => {
        return !prev;
      });
    }
  }

  async function submitDataHandler(data) {
    const res = await axios.post('/api/add_plan', data);
    if (res.status === 200) {
      notyf.success('Added to plan');
      setChanges(prev => {
        return !prev;
      });
    }
  }

  async function submitLeaveDataHandler(data) {
    let payload = {
      description: data.description,
      activity: data.activity,
      startDate: data.startDate,
      endDate: data.endDate,
      resources: []
    };
    if (data.activity === 'Leave') {
      (payload.area = 'NA'), (payload.site = 'NA'), (payload.product = 'NA'), (payload.serialNumber = 'NA'), (payload.lead = 'NA'), (payload.rCount = '1');
      payload.resources.push(data.resource);
    } else {
      (payload.area = 'NA'), (payload.site = 'NA'), (payload.product = 'NA'), (payload.serialNumber = 'NA'), (payload.lead = 'NA'), (payload.rCount = resourcesCount);
      payload.resources = resources;
    }
    console.log(payload);

    const res = await axios.post('/api/add_job', payload);
    if (res.status === 200) {
      notyf.success('Added to plan');
      setChanges(prev => {
        return !prev;
      });
    }
  }

  async function deletePlanHandler(id) {
    if (id) {
      const payload = {
        id: id
      };
      const res = await axios.post('/api/delete_plan', payload);
      if (res.status === 200) {
        notyf.error('Deleted from plan');
        updateCalendar();
      }
    } else {
      notyf.error('Nothing selected');
    }
  }

  return (
    <>
      <Navbar />
      <AnnualCalendar changed={changes} getId={getSelectedEventHandler} />
      <div className='text-center'>
        <button className='text-lg btn btn-sm bg-indigo-600 font-medium leading-6 text-white text-center my-10 ' onClick={changeFormDisplay}>
          Add to Plan
        </button>
        <button className='text-lg btn btn-sm bg-indigo-600 font-medium leading-6 text-white text-center my-10 mx-5 ' onClick={changeEditFormDisplay}>
          Edit from Plan
        </button>
        <button className='text-lg btn btn-sm bg-indigo-600 font-medium leading-6 text-white text-center my-10 mx-5 ' onClick={changeDeleteFormDisplay}>
          Delete from Plan
        </button>
        <button className='text-lg btn btn-sm bg-indigo-600 font-medium leading-6 text-white text-center my-10 mx-5 ' onClick={changeLeaveFormDisplay}>
          Add Leave
        </button>
      </div>
      {showForm && <AddPlanForm onNewData={addDataHandler} onHide={hideFormHandler} />}

      {showLeaveForm && <AddLeaveForm onNewData={addLeaveDataHandler} onHide={hideLeaveFormHandler} />}

      {showEditForm && <EditPlanForm oldData={editedEventData} onUpdate={updateDataHandler} onHideEdit={hideEditFormHandler} />}
      {showDeleteForm && <DeletePlanForm onDelete={updateCalendar} onHideDelete={hideDeleteFormHandler} />}
    </>
  );
};

export default AnnualPlan;
