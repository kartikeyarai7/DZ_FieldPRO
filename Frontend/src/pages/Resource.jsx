import React, { useState, useEffect } from 'react';
import Navbar from '../partials/Navbar';
import ResourceTable from '../partials/ResourceTable';
import ResourceForm from '../partials/ResourceForm';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EditResourceForm from '../partials/EditResourceForm';
// import TrainerNominations from '../partials/TrainerNominations';

const Resource = () => {
  const [trainingData, setTrainingData] = useState([]);

  const [changed, setChanged] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [oldData, setOldData] = useState({});
  const notyf = new Notyf();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      // history.push('/login');
      navigate('/signin');
    } else {
      dataHandler();
    }
  }, [userInfo, changed]);

  // useEffect(() => {
  //   dataHandler();
  // }, [changed]);

  useEffect(() => {
    if (editId) {
      getOldDataHandler(editId.id);
    }
  }, [editId]);

  async function dataHandler() {
    let tData = await axios.get('/api/resources');
    let sortedData = tData.data.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));

    setTrainingData(sortedData);
  }

  const addTrainingData = data => {
    // console.log(data);
    clickHandler(data);
  };

  async function getOldDataHandler(id) {
    const payload = {
      id: id
    };
    const oldD = await axios.post('/api/get_resource', payload);
    setOldData(oldD.data);
  }

  const deleteRequestHandler = () => {
    setChanged(prev => {
      return !prev;
    });
  };

  async function clickHandler(data) {
    // console.log(data);
    try {
      const res = await axios.post('/api/add_resource', data);
      if (res.status === 200) {
        notyf.success('Added to Database');
        setChanged(prev => {
          return !prev;
        });
      }
    } catch (error) {
      console.log(error);
      notyf.error('Encountered Error');
    }
  }

  const editRequestHandler = data => {
    setEditing(true);
    setEditId(data);
  };

  const addUpdateData = data => {
    updateDataHandler(data, editId);
  };

  async function updateDataHandler(content, editedId) {
    const payload = {
      data: content,
      id: editedId.id
    };
    const res = await axios.put('/api/edit_resource', payload);
    // console.log(res.status);
    if (res.status === 200) {
      setChanged(prev => {
        return !prev;
      });
      notyf.success('Updated Database');
    }
  }

  return (
    <>
      <Navbar />
      {!editing && <ResourceForm onNewData={addTrainingData} />}
      {editing && <EditResourceForm onUpdatedData={addUpdateData} oldData={oldData} />}
      <ResourceTable data={trainingData} onDelete={deleteRequestHandler} onEdit={editRequestHandler} />
    </>
  );
};

export default Resource;
