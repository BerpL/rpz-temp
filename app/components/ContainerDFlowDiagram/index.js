
/**
 *
 * ContainerFlowDiagram
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import ContainerInline from 'components/ContainerInline';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ButtonAdmin from 'components/ButtonAdmin';
import ListAdminFlowDiagrams from 'components/ListAdminFlowDiagrams';
import TreeView from 'components/TreeView';
import useTree from 'hooks/useTree';
import Breadcrumbs from 'components/BreadcrumbsAdmin';
import { rgba } from 'polished';

const C0 = styled.div`
  width: 100%;
  height: 100%;
`;

const C1 = styled.div`
  width: 100%;
  height: 100%;
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
  padding: ${({ noPadding }) => noPadding || '0px 26px'};
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

const DV = styled.div`
  width: 1px;
  background: ${({ theme: { primary } }) => rgba(primary, 0.2)};
  height: 100%;
`;

function ContainerFlowDiagram() {
  const [breadCrumbTree, setBreadCrumbTree] = useState(null);

  function onMountTree(initialTree) {
    setBreadCrumbTree([initialTree]);
    // setFile(initialTree);
  }

  const [tree, node, onMoveNode, onSelectNode, findNode, onOpenNode] = useTree({
    data: treeData,
    onMount: onMountTree,
  });

  const handleClickNode = id => {
    onSelectNode(id, (nodeTmp, parents) => {
      setBreadCrumbTree(parents);
    });
  };

  return (
    <C0>
      <C1>
        <C2>
          <ContainerInline
            style={{ padding: '0px 32px' }}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <TitleModuleAdmin title="Interactive Flowcharts" />
            <ButtonAdmin>New</ButtonAdmin>
          </ContainerInline>
          <S1 noPadding>
            <Co01>
              <TreeView
                key=""
                onToggleItem={onOpenNode}
                items={tree}
                onClickItem={handleClickNode}
                moveItem={onMoveNode}
                findItem={findNode}
              />
            </Co01>
            <DV />
            <Co02>
              <ListAdminFlowDiagrams
                diagrams={diagramsData}
                header={
                  <Breadcrumbs
                    tree={breadCrumbTree}
                    onClickItem={handleClickNode}
                  />
                }
              />
            </Co02>
          </S1>
        </C2>
      </C1>
    </C0>
  );
}

ContainerFlowDiagram.propTypes = {};

export default ContainerFlowDiagram;

const diagramsData = [
  {
    id: 1,
    title: 'Area 293200 - Milling (Line 1)',
    prevImg: 'http://172.16.2.78/Toquepala/data/diagramasF/ImagenPrevia/90.png',
  },

  {
    id: 2,
    title: 'Area 293200 - Milling (Line 2)',
    prevImg: 'http://172.16.2.78/Toquepala/data/diagramasF/ImagenPrevia/90.png',
  },
];

const treeData = {
  id: 1,
  title: 'Tecsup',
  date: '12 Apr. 2019',
  user: 'Pedro Diaz',
  type: 'Folder',
  children: [
    {
      id: 2,
      title: 'Secondary and Tertiary Crushing',
      date: '12 Apr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [
        {
          id: 100,
          title: 'Processes',
          date: '12 Apr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
      ],
    },
    {
      id: 3,
      title: 'Milling',
      date: '12 Apr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [],
    },
    {
      id: 4,
      title: 'Collective Flotation and Regrinding',
      date: '12 Apr. 2019',
      user: 'Pedro Diaz',
      type: 'Folder',
      children: [
        {
          id: 5,
          title: 'Processes',
          date: '12 Apr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
        {
          id: 6,
          title: 'Equipment',
          date: '12 Apr. 2019',
          user: 'Pedro Diaz',
          type: 'Folder',
          children: [],
        },
      ],
    },
  ],
}; 
