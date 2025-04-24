import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MdFolder,
  MdInsertDriveFile,
  MdSettings,
} from 'react-icons/md/index.esm';
import { TiArrowBack } from 'react-icons/ti/index.esm';
import _ from 'lodash';
import {
  PanelsContainer,
  Panel,
  Contents,
  BtnBack,
  PanelWrapper,
  Group,
  GoBack,
  Title,
  Item,
  LabelItem,
  ButtonAlarmsAndInterlocks,
} from './Styles';
import { Button } from '@nextui-org/react';


const Tree = ({
  items = [],
  title = '',
  onClickItem = () => {},
  onClickBack = () => {},
  onClickControl = () => {},
}) => {
  const [state, setState] = useState({
    selectedPath: [],
    groupsName: [title],
    itemSelected: null,
  });

  const { selectedPath, itemSelected, groupsName } = state;

  const handleItemSelected = (
    id,
    index,
    esDocumento,
    esEquipo,
    esArchivo,
    esGrupo,
  ) => {
    handleItemClick()
    setState(s => ({
      ...s,
      itemSelected: id,
    }));

    if (esDocumento) {
      onClickItem(id, index, 1);
    }

    if (esEquipo) {
      onClickItem(id, index, 2);
    }

    if (esArchivo) {
      onClickItem(id, index, 3);
    }

    if (esGrupo) {
      onClickItem(id, index, 4);
    }
  };

  const handleGroupSelected = group => {
    const currentPath = selectedPath;
    // console.log('group', group);
    currentPath.push(group);
    // console.log('group', currentPath);
    // if(this.props.onGroupSelected) this.props.onGroupSelected(group);
    setState(s => ({
      ...s,
      selectedPath: currentPath,
    }));
    setTimeout(() => {
      setState(s => ({
        ...s,
        groupsName: [...s.groupsName, group.nombre],
      }));
    }, 100);
  };

  const renderGroup = (group, index) => (
    <Group key={index} onClick={() => handleGroupSelected(group)}>
      <MdFolder />
      <LabelItem>{group.nombre}</LabelItem>
    </Group>
  );

  const handleItemClick = () => {
    const checkbox = document.getElementById('nav-toggle');
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      console.log('Estado del checkbox en el padre:', checkbox.checked);
    }
  };

  const renderItem = (item, index) => (
    <Item
      key={index}
      active={item.id === itemSelected}
      onClick={() =>
        handleItemSelected(
          item.id,
          index,
          item.esDocumento,
          item.esEquipo,
          item.esArchivo,
          item.esGrupo,
        )
      }
    >
      {item.esArchivo && <MdInsertDriveFile />}
      {item.esDocumento && <MdInsertDriveFile />}
      {item.esEquipo && <MdSettings />}
      {item.esGrupo && <MdSettings />}
      <LabelItem htmlFor="nav-toggle">{item.nombre}</LabelItem>
    </Item>
  );

  const renderItemOrGroup = (itemOrGroup, index) => {
    if (
      Array.isArray(itemOrGroup.nodos) &&
      !itemOrGroup.esGrupo &&
      itemOrGroup.habilitado
    ) {
      return renderGroup(itemOrGroup, index);
    }
    return renderItem(itemOrGroup, index);
  };

  const rowRenderer = itemsTmp =>
    itemsTmp.map((item, key) => renderItemOrGroup(item, key));

  const renderItems = itemsTmp => {
    if (itemsTmp.length > 0) {
      return <PanelWrapper>{rowRenderer(itemsTmp)}</PanelWrapper>;
    }
    return null;
  };
  const handleBack = () => {
    if (selectedPath.length > 0) {
      if (groupsName.length > 0) groupsName.pop();
      setState(s => ({
        ...s,
        selectedPath: s.selectedPath.slice(0, -1),
        groupsName,
      }));
    }
    onClickBack();
  };

  const renderBack = path => (
    <>
    <GoBack>
      {path.length > 0 && (
        <BtnBack onClick={handleBack}>
          <svg style={{marginRight: "0.5rem"}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg> Go Back
        </BtnBack>
      )}
    </GoBack>
    <Title>
      <p style={{textTransform: "uppercase"}}>{groupsName[groupsName.length - 1 || 0]}</p>
    </Title>
    </>

  );

  const renderControl = idGrupo => (
    <ButtonAlarmsAndInterlocks onClick={() => onClickControl(idGrupo)}>
      Alarmas y enclavamientos
    </ButtonAlarmsAndInterlocks>
  );

  const renderPanel = (
    itemsTmp = [],
    path = [],
    isControl = false,
    idGrupo,
  ) => {
    const depth = path.length;
    const isActive = selectedPath.length === depth;

    itemsTmp = itemsTmp.filter(item => item.habilitado);

    return (
      <Panel key={depth} active={isActive} depth={depth}>
        <Contents>
          {/* {isControl && renderControl(idGrupo)} */}
          {renderBack(path)}
          {renderItems(itemsTmp)}
        </Contents>
      </Panel>
    );
  };

  const renderChildPanels = () =>
    _.map(selectedPath, (group, index) => {
      const path = _.slice(selectedPath, 0, index + 1);
      const itemsTmp = group.nodos || [];
      const a = group.nombre && group.nombre.toLowerCase().includes('control');

      const isControl = a;
      return renderPanel(itemsTmp, path, isControl, group.id || -1);
    });

  return (
    <PanelsContainer select={selectedPath.length}>
      {renderPanel(items)}
      {renderChildPanels()}
    </PanelsContainer>
  );
};

Tree.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Tree;
