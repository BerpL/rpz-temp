/**
 *
 * CardUserAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MdEdit, MdClose } from 'react-icons/md/index.esm';

import ImageCircular from 'components/ImageCircular';

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
  width: calc(100% - 96px);
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

function CardUserAdmin({ user, onEdit, onDelete }) {
  return (
    <Container>
      <InnerContainer>
        <Actions>
          <EditAction onClick={() => onEdit(user.id)} />
          <DeleteAction onClick={() => onDelete(user.id)} />
        </Actions>
        <ImageCircular src={user.imagenUrl} width={72} />
        <Information>
          <Title>{user.nombre}</Title>
          <Text>Usuario: {user.usuario}</Text>
          <Text>Grupo: {user.grupo}</Text>
        </Information>
      </InnerContainer>
    </Container>
  );
}

CardUserAdmin.propTypes = {
  user: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CardUserAdmin;
