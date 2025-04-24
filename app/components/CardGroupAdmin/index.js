/**
 *
 * CardGroupAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MdEdit, MdClose } from 'react-icons/md/index.esm';

const IconAction = icon => styled(icon)`
  font-size: 16px;
  color: #a4afb7;
  cursor: pointer;
  transition: color 0.4s;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const EditAction = IconAction(MdEdit);
const DeleteAction = IconAction(MdClose);

const Actions = styled.div`
  position: absolute;
  top: 23px;
  right: 23px;

  svg:first-child {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  padding: 5px;
  width: 50%;
`;

const InnerContainer = styled.div`
  display: flex;
  position: relative;
  background: #fff;
  padding: 26px 24px 9px 24px;
  width: 100%;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.09);
`;

const Information = styled.div`
  margin-left: 24px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 18px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 15px;
  margin: 0;
  color: #43425d;
  opacity: 0.5;
  margin-bottom: 5px;
`;

function CardGroupAdmin({ group, onDelete, onEdit }) {
  return (
    <Container>
      <InnerContainer>
        <Actions>
          <EditAction onClick={() => onEdit(group.id)} />
          <DeleteAction onClick={() => onDelete(group.id)} />
        </Actions>
        <Information>
          <Title>{group.nombre}</Title>
          <Text>{group.descripcion}</Text>
        </Information>
      </InnerContainer>
    </Container>
  );
}

CardGroupAdmin.propTypes = {
  group: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardGroupAdmin;
