/**
 *
 * ContainerLoadMedia
 *
 */

import React from 'react';
import useWindowSize from 'hooks/useWindowSize';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TreeView from 'components/TreeView';
import useTree from 'hooks/useTree';
import { rgba } from 'polished';
import ListAdminLoadMedia from 'components/ListAdminLoadMedia';
import { useListWithSelect } from 'hooks/useListWithSelect';
import BM01 from 'components/ButtonAdmin';

const C1 = styled.div`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height * 0.8}px`};
  position: relative;
`;

const C2 = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
`;

const S1 = styled.div`
  flex-grow: 1;
  display: flex;
  position: relative;
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
  flex-direction: ${({ direction }) => direction || 'row'};
  /* for Firefox */
  min-height: 0;
`;

const Co01 = styled.div`
  flex: 0 0 300px;
  overflow: auto;
  position: relative;
  /* for Firefox */
  min-height: 0;
`;

const Co02 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  position: relative;
`;

const H01 = styled.div`
  width: 100%;
  height: 40px;
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 16px;
`;

const T01 = styled.div`
  flex: 1;
  color: ${({ textBold }) => textBold};
  font-size: 13px;
  text-transform: uppercase;
`;

const DividerVertical = styled.div`
  width: 1px;
  background: ${({ theme: { primary } }) => rgba(primary, 0.2)};
  height: 100%;
`;

function ContainerLoadMedia() {
  const { width, height } = useWindowSize({ onResize: () => {} });
  const [tree, node, onMoveNode, onSelectNode, findNode, onOpenNode] = useTree({
    data: treeData,
  });

  const [
    mediaToImport,
    checkAllToImport,
    onCheckAllToImport,
    onCheckItemToImport,
    getSelectedItemsToImport,
    setMediaToImport,
  ] = useListWithSelect({ data: MediaData() });

  const [
    mediaImported,
    checkAllImported,
    onCheckAllImported,
    onCheckItemImported,
    getSelectedItemsImported,
    setMediaImported,
  ] = useListWithSelect({ data: [] });

  const widthC1 = width * 0.9;
  const heightC1 = height * 0.9;

  const handleClickAssign = () => {
    setMediaImported(getSelectedItemsToImport());
  };

  const handleClickRemove = () => {
    setMediaToImport(getSelectedItemsImported());
  };

  return (
    <React.Fragment>
      <C1 width={widthC1} height={heightC1}>
        <C2>
          <S1>
            <Co01>
              <TreeView
                key="tree_media_load"
                onToggleItem={onOpenNode}
                items={tree}
                onClickItem={onSelectNode}
                moveItem={onMoveNode}
                findItem={findNode}
              />
            </Co01>
            <DividerVertical />
            <Co02>
              <C2 noPadding>
                <S1 direction="column" noPadding>
                  <H01>
                    <BM01 sm onClick={handleClickAssign}>
                      Assign
                    </BM01>
                  </H01>
                  <Co02>
                    <ListAdminLoadMedia
                      key="media_to_import"
                      media={mediaToImport}
                      onCheckedItem={onCheckItemToImport}
                      onCheckedAll={onCheckAllToImport}
                      checkAll={checkAllToImport}
                    />
                  </Co02>
                </S1>
              </C2>
            </Co02>
            <DividerVertical />
            <Co02>
              <C2 noPadding>
                <S1 direction="column" noPadding>
                  <H01>
                    <T01>Flotacion Colectiva y Remolienda</T01>
                    <BM01 sm onClick={handleClickRemove}>
                      Remove
                    </BM01>
                  </H01>
                  <Co02>
                    <ListAdminLoadMedia
                      key="media_imported"
                      media={mediaImported}
                      onCheckedItem={onCheckItemImported}
                      onCheckedAll={onCheckAllImported}
                      checkAll={checkAllImported}
                    />
                  </Co02>
                </S1>
              </C2>
            </Co02>
          </S1>
        </C2>
      </C1>
    </React.Fragment>
  );
}

ContainerLoadMedia.propTypes = {};

export default ContainerLoadMedia;

const MediaData = () => {
  const media = [];
  Array.from(Array(20).keys()).forEach(i => {
    media.push({
      id: i + 1,
      title: `3200-1 Figura ${i + 1}`,
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
    });
  });
  return media;
};

const treeData = {
  id: 1,
  title: 'Tecsup',
  date: '12 abr. 2019',
  user: 'Pedro Diaz',
  type: 'Folder',
  children: [
    {
      id: 2,
      title: 'Chancado Secundario y Terciario',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [
        {
          id: 100,
          title: 'Procesos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
      ],
    },
    {
      id: 3,
      title: 'Molienda',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [],
    },
    {
      id: 4,
      title: 'Flotación Colectiva y Remolienda',
      date: '12 abr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [
        {
          id: 5,
          title: 'Procesos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
        {
          id: 6,
          title: 'Equipos',
          date: '12 abr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
      ],
    },
  ],
};
