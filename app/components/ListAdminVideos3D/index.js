/**
 *
 * ListAdminVideos3D
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { MdDelete, MdEdit } from 'react-icons/md/index.esm';
import { hostUrlBase } from 'services/Api';
const ContainerVideos = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  border-radius: 4px;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.base};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  padding: 5px;
  width: 245px;
  display: flex;
`;

const Title = styled.p`
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  padding: 10px 16px;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  margin-bottom: 15px;
`;

const Img = styled.img`
  height: 150px;
`;

const ContImg = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  background: #E8E8E8;
  height: 150px;
}`;

const Actions = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-shrink: 0;
  position: absolute;
  right: 0;
  top: 0;
  button:first-child {
    margin-right: 5px;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  padding: 3px;
  outline: none;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.base};
  border: 1px solid ${({ theme }) => rgba(theme.colors.text, 0.2)};
  color: ${({ theme }) => rgba(theme.colors.text, 0.9)};
  height: 30px;
  svg {
    font-size: 16px;
  }
  span {
    margin-left: 5px;
  }
`;

function ListAdminVideos3D({ videos = [], onEdit, onDelete }) {
  const getImagePath = it =>
    it.imagenPrevia ? `${hostUrlBase}/${it.imagenPrevia}` : '';

  return (
    <ContainerVideos>
      {videos.map(item => (
        <Wrapper key={item.idVideo}>
          <Container>
            <Actions>
              <Button onClick={() => onEdit(item.idVideo)}>
                <MdEdit />
              </Button>
              <Button onClick={() => onDelete(item.idVideo)}>
                <MdDelete />
              </Button>
            </Actions>
            <ContImg>
              {item.imagenPrevia && <Img src={getImagePath(item)} />}
            </ContImg>
            <Title>{item.nombre}</Title>
          </Container>
        </Wrapper>
      ))}
    </ContainerVideos>
  );
}

ListAdminVideos3D.propTypes = {
  videos: PropTypes.array,
};

export default ListAdminVideos3D;
