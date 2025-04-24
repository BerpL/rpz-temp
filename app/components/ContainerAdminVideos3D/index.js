/**
 *
 * ContainerAdminVideos3D
 *
 */

import React from 'react';
import styled from 'styled-components';
import ContainerInline from 'components/ContainerInline';
import TitleModuleAdmin from 'components/TitleModuleAdmin';
import ButtonAdmin from 'components/ButtonAdmin';
import ListAdminVideos3D from 'components/ListAdminVideos3D';

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

const Co02 = styled.div`
  overflow: auto;
  flex-shrink: 1;
  flex-grow: 1;
  padding: ${({ noPadding }) => noPadding || '0px 16px'};
  /* for Firefox */
  min-height: 0;
  position: relative;
`;

function ContainerAdminVideos3D() {
  return (
    <C0>
      <C1>
        <C2>
          <ContainerInline
            style={{ padding: '0px 32px' }}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <TitleModuleAdmin title="3D Videos" />
            <ButtonAdmin>New</ButtonAdmin>
          </ContainerInline>
          <S1 noPadding>
            <Co02>
              <ListAdminVideos3D videos3d={videosData} />
            </Co02>
          </S1>
        </C2>
      </C1>
    </C0>
  );
}

ContainerAdminVideos3D.propTypes = {};

export default ContainerAdminVideos3D;

const videosData = [
  {
    id: 1,
    order: 1,
    title: 'FILTRO',
    description: '',
    prevImg: 'http://172.16.2.78/Toquepala/data/Videos3d/ImagenPrevia/1.jpg',
  },

  {
    id: 2,
    order: 2,
    title: 'FILTRO 2',
    description: '',
    prevImg: 'http://172.16.2.78/Toquepala/data/Videos3d/ImagenPrevia/1.jpg',
  },
];
