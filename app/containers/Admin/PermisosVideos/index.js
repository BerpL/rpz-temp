import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';

import { Row, Col, Con } from 'components/ContainerFlex';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles.css';
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';

import { showNotification } from 'utils/Notification';
// import { GroupService } from 'servicesV2';

import Select from 'components/Select';
import { Loader } from 'components/Loader';

// import { getAllMainTreesKnowledge } from 'services/ArbolPrincipalService';

import { getAccessVideos, putAccessVideos } from 'services/VideosService';

import { getAllGroups } from 'services/GroupServices';

function ContainerAdminBalances() {
  const [currentPageTable, setCurrentPageTable] = useState(1);
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [usuariosGrupos, setUsuariosGrupos] = useState([]);
  const [value, setValue] = useState(null);
  // const [isSavedCorrectly, setIsSavedCorrectly] = useState(false);

  const getGroups = async () => {
    setIsLoading(true);
    try {
      const response = await getAllGroups();
      const { data } = response.data;
      setUsuariosGrupos(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getVideos = async id => {
    setIsLoading(true);
    try {
      const response = await getAccessVideos(id);
      setVideos(response.data);
    } catch (e) {
      console.log('error', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleChangeCheckBox = (identifier, name, selected) => {
    setIsSaved(false);
    const data = videos.map(dt => {
      if (dt.id === identifier) {
        dt.habilitado = selected;
      }
      return dt;
    });
    setVideos([...data]);
  };

  const handleChangeSelect = e => {
    const eTarget = e.target.value;

    if (!isSaved) {
      confirmAlert({
        title: 'Warning!',
        message: 'Do you want to change the group without saving?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setValue(eTarget);
              getVideos(eTarget);
              setIsSaved(true);
              showNotification('warning', 'Data was not saved');
            },
          },
          {
            label: 'No',
          },
        ],
      });
    } else {
      setValue(e.target.value);
      getVideos(e.target.value);
    }
  };

  const handleClickSave = async () => {
    setIsLoading(true);

    const jsonGrupo = [];

    videos.forEach(video => {
      jsonGrupo.push({ IdVideo3D: video.id, Acceso: video.habilitado });
    });

    try {
      const response = await putAccessVideos(value, jsonGrupo);
      setIsSaved(true);
      showNotification('success', 'Data was saved successfully');
    } catch (e) {
      console.log(e);
      showNotification('error', 'Data was not saved');
    } finally {
      setIsLoading(false);
    }
  };

  const actions = [];

  const titles = [
    {
      key: 'nombre',
      value: 'Name',
      weight: 3,
    },
    {
      key: 'habilitado',
      value: 'Enabled',
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <ActionsContainer>
        <Button
          onClick={handleClickSave}
          style={{ bacgroundColor: isSaved ? 'gray' : 'black' }}
        >
          <MdAdd />
          Save
        </Button>
      </ActionsContainer>

      <Row flexGrow="1" height="100%" padding="40px 0 0 0">
        <Con
          maxWidth="1000px"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="row"
        >
          <Col flexGrow="1" width="100%" padding="0">
            <Select
              name="videos"
              id="videos"
              options={usuariosGrupos}
              message="Select a Group"
              onChange={handleChangeSelect}
              value={value || ''}
            />
            <br />
            <Row flexGrow="1" height="100%" overflow="auto">
              <Col width="100%" padding="0">
                <Table
                  titles={titles}
                  data={videos}
                  actions={actions}
                  initialPage={currentPageTable}
                  clickChange={handleChangeCheckBox}
                />
              </Col>
            </Row>
          </Col>
        </Con>
      </Row>
    </>
  );
}

ContainerAdminBalances.propTypes = {};

export default ContainerAdminBalances;
