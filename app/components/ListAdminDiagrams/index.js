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
  background: ${({ theme }) => theme.colors.base};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  padding: 5px;
  width: 245px;
`;

const Title = styled.p`
  color: ${({ theme }) => rgba(theme.colors.text, 0.6)};
  padding: 10px 16px;
  margin: 0;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ContImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E8E8E8;
  height: 200px;
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

function ListDiagrams({ diagrams = [], onEdit, onDelete }) {
  const getImagePath = it =>
    it.imagenPrevia ? `${hostUrlBase}/${it.imagenPrevia}` : '';

  return (
    <ContainerVideos>
      {diagrams.map(item => (
        <Wrapper key={item.idDiagramaFlujo}>
          <Container>
            <Actions>
              <Button onClick={() => onEdit(item.idDiagramaFlujo)}>
                <MdEdit />
              </Button>
              <Button onClick={() => onDelete(item.idDiagramaFlujo)}>
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

ListDiagrams.propTypes = {
  diagrams: PropTypes.array,
};

export default ListDiagrams;
