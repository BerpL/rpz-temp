import React, { useEffect, useState, memo, useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { lighten, darken } from 'polished';

import {
  getAllAlarmsInterlocksByControlGroup,
  getAllInterfacesByControlGroup,
  getAllInstrumentListByControlGroup,
  getNodeControlGroup,
} from 'services/ControlGroupService';

import {
  deleteInterfaceTags,
  createInterfaceTags,
  updateInterfaceTags,
} from 'services/InterfacesTagsService';

import {
  deleteAlarmInterlock,
  createAlarmInterlock,
  updateAlarmInterlock,
} from 'services/AlarmsInterlocksService';

import {
  getListaInstrumentosId,
  getListaInstrumentos,
  createInstrumentList,
  updateListaInstrumentos,
  deleteListaInstrumentos,
} from 'services/ListaInstrumentoService';

import Modal from 'components/Modal';
import ModifyAlarmInterlock from 'components/ContainerModifyAlarmInterlock';
import ModifyInstrumentList from 'components/ContainerModifyInstrumentList';
import List from 'components/ListAdminGrupoControl';
import ListVariablesOperativas from 'components/ListVariablesOperativas';
import ListInterface from 'components/ListAdminGrupoControlInterface';
import ModifyImage from 'components/ContainerModifyAlarmInterlockImage';
import TagsAlarmInterlockView from 'components/TagsAlarmInterlockView';
import { filter } from 'lodash';

const HeaderButtons = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const bgButtonTab = ({ selected, theme }) =>
  selected ? lighten('0.15', theme.colors.primary) : 'transparent';

const colorButtonTab = ({ selected, theme }) =>
  selected ? theme.colors.base : lighten('0.15', theme.colors.primary);

const ButtonTab = styled(Button)`
  background: ${bgButtonTab};
  border: 2px solid ${({ theme }) => lighten('0.15', theme.colors.primary)};
  color: ${colorButtonTab};
  width: auto;
  transition: all 0.2s;
  &:hover {
    background: ${bgButtonTab};
  }
`;

const ContainerButtonAdd = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonAdd = styled(Button)`
  background: ${({ theme }) => darken('0.1', theme.colors.primary)};
  border-bottom: 5px solid ${({ theme }) => darken('0.3', theme.colors.primary)};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => darken('0.1', theme.colors.primary)};
    border-bottom: 0px;
  }
  margin: 0 0.5em;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 16px;
  margin-bottom: 5px;
`;

const preLoadTime = (fn, delay = 1000) => setTimeout(() => fn(), delay);

// - Funcion para Obtener AlarmaInterlock
const getAlarmsInterlock = async id => {
  const response = await getAllAlarmsInterlocksByControlGroup(id);

  return response.data.data;
};

const getInterfaces = async id => {
  const response = await getAllInterfacesByControlGroup(id);

  return response.data.data;
};

const TabAlarmsInterlock = ({ idSelectedControlGroup }) => {
  // -- AlamasInterlock State
  const [isOpenAAlarmInterlock, setIsOpenAAlarmInterlock] = useState(false);
  const [isOpenEAlarmInterlock, setIsOpenEAlarmInterlock] = useState(false);
  const [idActiveAlarmInterlock, setActiveAlarmInterlock] = useState(-1);
  const [isAlarm, setIsAlarm] = useState(false);
  // -- InstrumentList State
  const [isOpenInstrumentList, setIsOpenInstrumentList] = useState(false);
  const [isOpenEInstrumentList, setIsOpenEInstrumentList] = useState(false);
  const [idActiveInstrumentList, setIdActiveInstrumentList] = useState(-1)

  const [selectedGroupName, setSelectedGroupName] = useState('');

  // == Metodos para manejar el estado del formulario "AlamasInterlocks"
  // -AÑADIR
  const openAAlarmInterlock = isA => {
    setIsAlarm(isA);
    setIsOpenAAlarmInterlock(true);
  };
  const closeAAlarmInterlock = () => {
    // setUploadProgress(0);
    setIsOpenAAlarmInterlock(false);
  };
  // -EDITAR
  const openEAlarmInterlock = (id, isA) => {
    setActiveAlarmInterlock(id);
    setIsAlarm(isA);
    setIsOpenEAlarmInterlock(true);
  };
  const closeEAlarmInterlock = () => {
    // setUploadProgress(0);
    setIsOpenEAlarmInterlock(false);
  };

  // == Metodos Para manejar estado del formulario "Lista de instrumentos"
  // -AÑADIR
  const openInstrumentList = () => {
    setIsOpenInstrumentList(true);
  };
  const closeInstrumentList = () => {
    setIsOpenInstrumentList(false);
  };
  // -EDITAR
  const openEInstrumentList = id => {
    setIdActiveInstrumentList(id)
    setIsOpenEInstrumentList(true);
  };
  const closeEInstrumentList = () => {
    // setUploadProgress(0);
    setIsOpenEInstrumentList(false);
  };

  const [alarmsInterlock, setAlarmsInterlocks] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });
  const [variablesOperativas, setVariablesOperativas] = useState({
    data: [],
    isLoading: true,
  });

  const loadData = async (ms = 1000) => {
    const data = await getAlarmsInterlock(idSelectedControlGroup);
    let vO = [];
    if (data.length === 0) {
      vO = await getAllInstrumentListByControlGroup(idSelectedControlGroup);
    }

    preLoadTime(() => {
      setAlarmsInterlocks(t => ({
        ...t,
        data,
        isLoading: false,
      }));
      setVariablesOperativas(t => ({
        ...t,
        data: vO,
        isLoading: false,
      }));
    }, ms);
  };

  // - Funcion para Eliminar AlarmaInterlock
  const onDeleteHandler = async id => {
    try {
      await deleteAlarmInterlock(id);
      loadData(0);
    } catch {}
  };
  // - Funcion para Eliminar ListaInstrumento
  const onDeleteInstrumentListHandler = async id => {
    try {
      await deleteListaInstrumentos(id);
      loadData(0);
    } catch {}
  };

  // - Funcion para Crear AlarmaInterlock
  const onCreateAlarmInterlockHandler = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('idItem', values.idItem);
    bodyFormData.set('instrumento', values.instrumento);
    bodyFormData.set('idGrupoControl', idSelectedControlGroup);
    bodyFormData.set('isAlarm', isAlarm);

    try {
      const response = await createAlarmInterlock(bodyFormData);
      loadData(0);
      return response.data.data;
    } catch (ex) {
      return false;
    }
  };

  // - Funcion para Editar AlarmaInterlock
  const onUpdateAlarmInterlockHandler = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('idAlarmaEnclavamiento', values.idEnclavamientoAlarma);
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('idItem', values.idItem);
    bodyFormData.set('instrumento', values.instrumento);
    bodyFormData.set('idGrupoControl', idSelectedControlGroup);
    try {
      await updateAlarmInterlock(values.idEnclavamientoAlarma, bodyFormData);
      loadData(0);
      return true;
    } catch (ex) {
      return false;
    }
  };

  // - Funcion para crear Nuevo Lista Instrumento
  const onCreateInstrumentListHandler = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('IdGrupoControl', values.idGrupoControl);
    bodyFormData.set('Tag', values.tag);
    bodyFormData.set('TipoInstrumento', values.tipoInstrumento);
    bodyFormData.set('Descripcion', values.descripcion);
    bodyFormData.set('Pid', values.pid);

    try {
      await createInstrumentList(bodyFormData);
      loadData(0);
      return true;
    } catch (ex) {
      return false;
    }
  };

  // - Funcion para Editar Lista Instrumento
  const onUpdateInstrumentListHandler = async values => {
    const bodyFormData = new FormData();
    bodyFormData.set('Tag', values.tag);
    bodyFormData.set('TipoInstrumento', values.tipoInstrumento);
    bodyFormData.set('Descripcion', values.descripcion);
    bodyFormData.set('Pid', values.pid);

    try {
      await updateListaInstrumentos(values.idListaInstrumento, bodyFormData);
      loadData(0);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const showList = () => {
    if (!alarmsInterlock.isLoading && !variablesOperativas.isLoading) {
      if (alarmsInterlock.data.length > 0) {
        return (
          <List
            onEdit={openEAlarmInterlock}
            onDelete={onDeleteHandler}
            grupos={alarmsInterlock.data}
            isAlarm={isAlarm}
          />
        );
      } else {
        return (
          <ListVariablesOperativas
            onEdit={openEInstrumentList}
            onDelete={onDeleteInstrumentListHandler}
            grupos={variablesOperativas.data.data.data}
          />
        );
      }
    } else {
      return <div>loading....</div>;
    }
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return (
    <div>
      <ContainerButtonAdd>
        <ButtonAdd onClick={() => openAAlarmInterlock(false)}>
          Add Interlock
        </ButtonAdd>
        <ButtonAdd onClick={() => openAAlarmInterlock(true)}>
          Add Alarm
        </ButtonAdd>
        {/* <ButtonAdd onClick={() => openInstrumentList()}>
          Añadir Lista de instrumentos
        </ButtonAdd> */}
      </ContainerButtonAdd>
      {/* List Component */
      showList()}

      {/* Formulario Añadir AlarmaInterlock */}
      <Modal open={isOpenAAlarmInterlock} onClose={closeAAlarmInterlock}>
        <ModifyAlarmInterlock
          onModify={onCreateAlarmInterlockHandler}
          onClose={closeAAlarmInterlock}
          isAlarm={isAlarm}
        />
      </Modal>

      {/* Formulario Editar AlarmaInterlock */}
      <Modal open={isOpenEAlarmInterlock} onClose={closeEAlarmInterlock}>
        <ModifyAlarmInterlock
          id={idActiveAlarmInterlock}
          onModify={onUpdateAlarmInterlockHandler}
          onClose={closeEAlarmInterlock}
          isAlarm={isAlarm}
        />
      </Modal>

      {/* Formulario Anañadir Instrumento a lista de instrumentos */}
      <Modal open={isOpenInstrumentList} onClose={closeInstrumentList}>
        <ModifyInstrumentList
          idGrupoControl={idSelectedControlGroup}
          onModify={onCreateInstrumentListHandler}
          onClose={closeInstrumentList}
        />
      </Modal>

      {/* Formulario Editar Instrumento a lista de instrumentos */}
      <Modal open={isOpenEInstrumentList} onClose={closeEInstrumentList}>
        <ModifyInstrumentList
          id={idActiveInstrumentList}
          idGrupoControl={idSelectedControlGroup}
          onModify={onUpdateInstrumentListHandler}
          onClose={closeEInstrumentList}
        />
      </Modal>
    </div>
  );
};

const TabInterface = ({ idSelectedControlGroup }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isOpenAImage, setIsOpenAImage] = useState(false);
  const [isOpenEImage, setIsOpenEImage] = useState(false);
  const [isOpenATag, setIsOpenATag] = useState(false);

  const [idActiveImage, setIdActiveImage] = useState(-1);

  const openAImage = () => setIsOpenAImage(true);
  const closeAImage = () => setIsOpenAImage(false);
  const openEImage = idx => {
    setIsOpenEImage(true);
    setIdActiveImage(idx);
  };
  const closeEImage = () => setIsOpenEImage(false);
  const openATag = idx => {
    setIsOpenATag(true);
    setIdActiveImage(idx);
  };
  const closeATag = () => setIsOpenATag(false);

  const [interfaces, setInterfaces] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  const loadData = async (ms = 1000) => {
    const data = await getInterfaces(idSelectedControlGroup);

    preLoadTime(() => {
      setInterfaces(t => ({
        ...t,
        data,
        isLoading: false,
      }));
    }, ms);
  };

  const onDeleteHandler = async id => {
    try {
      await deleteInterfaceTags(id);
      loadData(0);
    } catch {}
  };

  const options = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      console.log(`${loaded}kb of ${total}kb | ${percent}%`);
      setUploadProgress(percent);
    },
  };

  const onAddImageHandler = async (values, imagen) => {
    const bodyFormData = new FormData();
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('imagen', imagen);
    bodyFormData.set('idGrupoControl', idSelectedControlGroup);
    bodyFormData.set('urlImagen', '---');

    try {
      await createInterfaceTags(bodyFormData, options);
      loadData(0);
      return true;
    } catch (ex) {
      return false;
    }
  };

  const onEditImageHandler = async (values, imagen) => {
    const bodyFormData = new FormData();
    bodyFormData.set('idEtiquetaModulo', values.idEtiquetaModulo);
    bodyFormData.set('nombre', values.nombre);
    bodyFormData.set('imagen', imagen);
    bodyFormData.set('idGrupoControl', idSelectedControlGroup);
    bodyFormData.set('urlImagen', '---');

    try {
      await updateInterfaceTags(values.idEtiquetaModulo, bodyFormData, options);
      loadData(0);
      return true;
    } catch (ex) {
      return false;
    }
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  return (
    <div>
      <ContainerButtonAdd>
        <ButtonAdd onClick={openAImage}>Add Image</ButtonAdd>
      </ContainerButtonAdd>
      {interfaces.isLoading && <div>loading....</div>}
      {!interfaces.isLoading && (
        <ListInterface
          onTag={openATag}
          onEdit={openEImage}
          onDelete={onDeleteHandler}
          interfaces={interfaces.data}
        />
      )}

      <Modal open={isOpenATag} onClose={closeATag}>
        <TagsAlarmInterlockView
          id={idActiveImage}
          idGrupoControl={idSelectedControlGroup}
          onClose={closeATag}
        />
      </Modal>

      <Modal open={isOpenAImage} onClose={closeAImage}>
        <ModifyImage
          onModify={onAddImageHandler}
          onClose={closeAImage}
          uploadProgress={uploadProgress}
        />
      </Modal>
      <Modal open={isOpenEImage} onClose={closeEImage}>
        <ModifyImage
          id={idActiveImage}
          uploadProgress={uploadProgress}
          onModify={onEditImageHandler}
          onClose={closeEImage}
        />
      </Modal>
    </div>
  );
};

const TabViewer = ({
  children,
  onChangeTab,
  selected,
  idSelectedControlGroup,
  ...props
}) => {
  const changeTabHandler = tab => {
    onChangeTab(tab);
  };

  return (
    <Container {...props}>
      <HeaderButtons>
        <ButtonTab
          style={{ marginRight: 2.5, width: 196 }}
          onClick={() => changeTabHandler(1)}
          selected={selected === 1}
        >
          Alarms/Interlocks
        </ButtonTab>
        <ButtonTab
          style={{ marginLeft: 2.5, width: 196 }}
          onClick={() => changeTabHandler(2)}
          selected={selected === 2}
        >
          Labeled
        </ButtonTab>
      </HeaderButtons>
      {selected === 1 && (
        <TabAlarmsInterlock idSelectedControlGroup={idSelectedControlGroup} />
      )}
      {selected === 2 && (
        <TabInterface idSelectedControlGroup={idSelectedControlGroup} />
      )}
    </Container>
  );
};

export default memo(TabViewer);
