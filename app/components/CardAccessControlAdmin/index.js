/**
 *
 * CardAccessControlAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MdRemoveRedEye } from 'react-icons/md/index.esm';
import { FaChartBar } from 'react-icons/fa/index.esm';

const IconAction = icon => styled(icon)`
  font-size: 16px;
  color: #a4afb7;
  cursor: pointer;
  transition: color 0.4s;
  &:hover {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const IconIdentificator = icon => styled(icon)`
  font-size: 40px;
  color: #a4afb7;
`;

const ViewAction = IconAction(MdRemoveRedEye);

const IconBar = IconIdentificator(FaChartBar);

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
  width: 100%;
  margin-left: 24px;
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

function CardAccessControlAdmin({ access, onView }) {
  return (
    <Container>
      <InnerContainer>
        <Actions>
          <ViewAction onClick={() => onView(access.id)} />
        </Actions>
        <IconBar />
        <Information>
          <Title>{access.nombre}</Title>
          <Text>User: {access.usuario}</Text>
          <Text>Logins: {access.ingresos}</Text>
          <Text>
            Total Training Time (HH:MM): {access.totalEntrenamiento}
          </Text>
        </Information>
      </InnerContainer>
    </Container>
  );
}

CardAccessControlAdmin.propTypes = {
  access: PropTypes.object,
  onView: PropTypes.func,
};

export default CardAccessControlAdmin;
