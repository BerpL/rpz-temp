/**
 *
 * ContainerMediaLink
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import TreeView from 'components/TreeView';
import {
  getAllMediaTree,
  getAvailableMedia,
  insertMedia,
  deleteMedia,
  getAssignedMedia,
} from 'services/ArbolMediosService';

import useTree from 'hooks/useTree';
import { useListWithSelect } from 'hooks/useListWithSelect';
import ListAdminLoadMedia from 'components/ListAdminLoadMedia';
import {
  Container,
  ContainerTreeView,
  ContainerCol,
  Line,
  Button,
  ContainerButton,
  ContainerCols,
  ContainerList,
} from './Styles';

function ContainerMediaLink({ id, tipo }) {
  const [treeData, setTreeData] = useState({ id: -1, nodos: [] });
  const [idA, setAId] = useState(-1);

  const getTree = async () => {
    try {
      const response = await getAllMediaTree();
      setTreeData(response.data.data);
      // setIdEditF(response.data.data.id);
    } catch {}
  };

  const loadAssignedMedia = async () => {
    try {
      const bodyFormData = new FormData();

      bodyFormData.set('tipo', tipo);
      bodyFormData.set('id', id);
      const response = await getAssignedMedia(bodyFormData);

      loadMediaImported(response.data.data);
    } catch (e) {
      // console.log(e);
    }
  };

  const loadAvailableMedia = async idNode => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.set('idMedio', idNode);
      bodyFormData.set('tipo', tipo);
      bodyFormData.set('id', id);
      const response = await getAvailableMedia(bodyFormData);

      loadMediaToImport(response.data.data);
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    getTree();
    loadAssignedMedia();
  }, []);

  const [
    tree,
    node,
    onMoveNode,
    onSelectNode,
    findNode,
    onOpenNode,
    addNode,
    removeNode,
  ] = useTree({ data: treeData });

  const [
    mediaToImport,
    checkAllToImport,
    onCheckAllToImport,
    onCheckItemToImport,
    getSelectedItemsToImport,
    setMediaToImport,
    loadMediaToImport,
  ] = useListWithSelect({ data: [] });

  const [
    mediaImported,
    checkAllImported,
    onCheckAllImported,
    onCheckItemImported,
    getSelectedItemsImported,
    setMediaImported,
    loadMediaImported,
  ] = useListWithSelect({ data: [] });

  const handleClickAssign = async () => {
    const data = {
      id,
      medios: getSelectedItemsToImport(),
      tipo,
    };
    await insertMedia(data);
    loadAssignedMedia();
  };

  const handleClickRemove = async () => {
    const data = {
      id,
      medios: getSelectedItemsImported(),
      tipo,
    };
    await deleteMedia(data);
    loadAvailableMedia(idA);
  };

  const handleClickNode = async idNode => {
    // setIdFolderActiveCM(id);
    // setIdEditF(id);
    onSelectNode(idNode);
    loadAvailableMedia(idNode);
    setAId(idNode);
  };

  // console.log(mediaToImport);

  return (
    <Container>
      <ContainerTreeView>
        <TreeView
          key="www"
          onToggleItem={onOpenNode}
          items={tree}
          onClickItem={handleClickNode}
          moveItem={() => {}}
          findItem={findNode}
        />
      </ContainerTreeView>
      <Line />
      <ContainerCols>
        <ContainerCol>
          <ContainerButton>
            <Button onClick={handleClickAssign}>Assign</Button>
          </ContainerButton>
          <ContainerList>
            <ListAdminLoadMedia
              key="media_to_import"
              media={mediaToImport}
              onCheckedItem={onCheckItemToImport}
              onCheckedAll={onCheckAllToImport}
              checkAll={checkAllToImport}
            />
          </ContainerList>
        </ContainerCol>
        <Line />
        <ContainerCol>
          <ContainerButton>
            <Button onClick={handleClickRemove}>Remove</Button>
          </ContainerButton>
          <ContainerList>
            <ListAdminLoadMedia
              key="media_imported"
              media={mediaImported}
              onCheckedItem={onCheckItemImported}
              onCheckedAll={onCheckAllImported}
              checkAll={checkAllImported}
            />
          </ContainerList>
        </ContainerCol>
      </ContainerCols>
    </Container>
  );
}

ContainerMediaLink.propTypes = {
  id: PropTypes.any.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default ContainerMediaLink;
