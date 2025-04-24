import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md/index.esm';
import useTree from 'hooks/useTree';

import TreeView from 'components/TreeView';
import { Row, Col, Con } from 'components/ContainerFlex';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../styles.css';
import ActionsContainer from 'V2/components/AdminActions';
import Button from 'V2/components/AdminButton';
import Table from 'V2/components/Table';
import { GroupService } from 'servicesV2';
import Select from 'components/Select';
import { Loader } from 'components/Loader';

import { showNotification } from 'utils/Notification';
// import { moveFlujosTree } from 'services/ArbolFlujosService';

import { getAllTreeProcess } from 'services/ArbolProcesosService';

import { getAllGroups } from 'services/GroupServices';

function ContainerAdminProcessAccess() {
  const [currentPageTable, setCurrentPageTable] = useState(1);
  const [groupService] = useState(new GroupService());
  const [idEditA, setIdEditA] = useState();
  const [isSaved, setIsSaved] = useState(true);
  const [treeData, setTreeData] = useState({ id: 0, nodos: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [grupos, setGrupos] = useState([]);
  const [usuariosGrupos, setUsuariosGrupos] = useState([]);
  const [value, setValue] = useState(null);
  const [tempValue, setTempValue] = useState();
  // const [isSavedCorrectly, setIsSavedCorrectly] = useState(false);

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
  ] = useTree({
    data: treeData,
  });

  const getGroups = async () => {
    // setIsLoading(true);
    try {
      const response = await getAllGroups();
      const { data } = response.data;
      setUsuariosGrupos(data);
      // console.log(data)
      // setFilteredGroups(data);
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false);
    }
  };

  const getSelectGrupos = async (idGrupo, idArbol) => {
    setIsLoading(true);
    try {
      const response = await groupService.getGruposProcesos(idGrupo, idArbol);
      const { data } = response;
      // console.log(response);
      // console.log('data', data.nodos);
      setGrupos(data.nodos);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  const handleClickNode = id => {
    if (value === null) {
      confirmAlert({
        title: 'Alert!',
        message: 'Please select a group first',
        buttons: [
          {
            label: 'Ok',
          },
        ],
      });
    } else {
      if (!isSaved) {
        confirmAlert({
          title: 'Alert!',
          message: 'Do you want to change the folder without saving?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // setGrupos(tempGrupos);
                setIsSaved(true);
                onSelectNode(id);
                setIdEditA(id);
                getSelectGrupos(value, id);
                showNotification('warning', 'Data was not saved')
              },
            },
            {
              label: 'No',
            },
          ],
        });
      } else {
        onSelectNode(id);
        setIdEditA(id);
        getSelectGrupos(value, id);
      }
    }

    // console.log(id);
  };

  const handleMoveNode = (from, to) => {
    const bodyFormData = new FormData();
    bodyFormData.set('to', to);

    async function moveNode(canMove) {
      if (canMove) {
        try {
          await moveFlujosTree(from, bodyFormData);
        } catch (ex) {}
      }
    }

    onMoveNode(from, to, () => {}, moveNode);
  };

  useEffect(() => {
    getTree();
  }, []);

  async function getTree() {
    setIsLoading(true);

    try {
      const response = await getAllTreeProcess();
      // console.log(response.data.data);
      setIdEditA(response.data.data.id);
      setTreeData(response.data.data)
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeCheckBox = (identifier, name, selected) => {
    setIsSaved(false);
    const data = grupos.map(dt => {
      if (dt.id === identifier) {
        dt.habilitado = selected;
      }

      return dt;
    });
    setGrupos([...data]);
  };

  const handleChangeSelect = e => {
    // console.log(e.target.value, idEditA);

    const eTarget = e.target.value;

    if (!isSaved) {
      confirmAlert({
        title: 'Alert!',
        message: 'Do you want to change the Group without saving?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              setValue(eTarget);
              getSelectGrupos(eTarget, idEditA);
              setIsSaved(true);
              showNotification('warning', 'Data was not saved')
            },
          },
          {
            label: 'No',
          },
        ],
      });
    } else {
      setValue(eTarget);
      getSelectGrupos(eTarget, idEditA);
      setTempValue(e.target.value);
    }
  };

  const handleClickSave = async () => {
    setIsLoading(true);
    // console.log('guardado en procesos')
    const jsonGrupo = [];

    grupos.forEach(grupo => {
      jsonGrupo.push({ IdArbolProceso: grupo.id, Acceso: grupo.habilitado });
    });

    // console.log(jsonGrupo);

    try {
      const response = await groupService.updateGroupProcesos(value, jsonGrupo);
      setIsSaved(true);
      showNotification('success', 'Data saved successfully')
    } catch (e) {
      console.log(e);
      showNotification('success', 'An error occurred while saving')
    } finally {
      setIsLoading(false);
      // setIsSavedCorrectly(true);
      // setTimeout(() => setIsSavedCorrectly(false), 4000);
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

  // console.log(grupos);

  return (
    <>
      {isLoading && <Loader />}
      {/* {isSavedCorrectly && (
        <div className="containerSaved">
          <div className="contentSaved">Guardado</div>
        </div>
      )} */}
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
          <Col
            flexBasis="300px"
            flexShrink="0"
            flexGrow="0"
            display="unset"
            overflow="auto"
            height="calc(100vh - 150px)"
          >
            <TreeView
              key="tree_files_manager"
              onToggleItem={onOpenNode}
              items={tree}
              onClickItem={handleClickNode}
              moveItem={handleMoveNode}
              findItem={findNode}
            />
          </Col>
          <Col flexGrow="1" width="100%" padding="0">
            <Select
              name="grupos"
              id="grupos"
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
                  data={grupos}
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

ContainerAdminProcessAccess.propTypes = {};

export default ContainerAdminProcessAccess;
