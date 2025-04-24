import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';
import { Row, Col, Con } from 'components/ContainerFlex';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles.css';
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';
// import { GroupService } from 'servicesV2';
import { showNotification } from 'utils/notification';
import Select from 'components/Select';
import { Loader } from 'components/Loader';

import {
  getAccessDiagrams,
  putAccessDiagrams,
} from 'services/GroupServices';

import { getAllGroups } from 'services/GroupServices';

function ContainerAdminBalances() {
  const [currentPageTable, setCurrentPageTable] = useState(1);
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [diagramas, setDiagramas] = useState([]);
  const [usuariosGrupos, setUsuariosGrupos] = useState([]);
  const [value, setValue] = useState(null);

  const getDiagrams = async (id) => {
    setIsLoading(true);
    try {
      const response = await getAccessDiagrams(id);
      setDiagramas(response.data);
    } catch (error) {
      confirmAlert({
        title: 'Error!',
        message: `An error occurred ${error.message}`,
        buttons: [
          {
            label: 'Ok',
          },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    getGroups();
  }, []);

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
              showNotification('warning', 'Data was not saved');
              setValue(eTarget);
              getDiagrams(eTarget);
              setIsSaved(true);
            },
          },
          {
            label: 'No',
          },
        ],
      });
    } else {
      setValue(e.target.value);
      getDiagrams(e.target.value);
    }
  };

  const handleChangeCheckBox = (identifier, name, selected) => {
    setIsSaved(false);
    const data = diagramas.map(dt => {
      if (dt.id === identifier) {
        dt.habilitado = selected;
      }
      return dt;
    });
    setDiagramas([...data]);
  };

  const handleClickSave = async () => {
    setIsLoading(true);

    const jsonGrupo = [];

    diagramas.forEach(grupo => {
      jsonGrupo.push({ idDiagrama: grupo.id, Acceso: grupo.habilitado });
    });

    try {
      const response = await putAccessDiagrams(value, jsonGrupo);
      setIsSaved(true);
      showNotification('success', 'Data was saved successfully');
    } catch (e) {
      console.log(e);
      showNotification('error', 'Error when saving');
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
              name="Diagrams"
              id="diagrams"
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
                  data={diagramas}
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
