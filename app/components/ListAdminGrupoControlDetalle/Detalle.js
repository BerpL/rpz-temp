/**
 *
 * Detalle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { FiMonitor } from 'react-icons/fi/index.esm';
import { MdDelete, MdEdit, MdAddLocation } from 'react-icons/md/index.esm';

const Container = styled.div`
  overflow: hidden;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.16);
  margin-bottom: 10px;
  border: 1px solid #cbcaca;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  background: white;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-wrap: nowrap;
`;

const Info = styled.div`
  padding-left: 16px;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Actions = styled.div`
  padding-left: 16px;
  display: flex;
  flex-shrink: 0;
`;

const Condition = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.85)};
`;

const Col = styled.div`
  padding-left: 16px;
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.85)};
`;

const Col1 = styled.div`
  padding-left: 16px;
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => rgba(theme.colors.text, 0.85)};
`;

const Title = styled.div`
  color: ${({ theme }) => rgba(theme.colors.text, 0.5)};
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  min-width: 100%;
  margin-bottom: 5px;
`;

const Button = styled.button`
  border-radius: 5px;
  display: flex;
  align-items: center;
  user-select: none;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
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

function Detalle({ inter, onEdit, onDelete, isAlarm }) {
  return (
    <Container>
      {/* <Icon style={{ background: 'rgb(142, 36, 170)' }}>
        <FiMonitor />
      </Icon> */}
      <Row>
        {!isAlarm ? (
          <Info>
          <Title>Condition</Title>
          <Condition>{inter.condicion}</Condition>
        </Info>
        ) : (
          <Info>
          <Title>Value</Title>
          <Condition>{inter.valor}</Condition>
          </Info>
        )}

        <Actions>
          <Button onClick={() => onEdit(inter.idDetalleEnclavamiento)}>
            <MdEdit />
          </Button>
          <Button onClick={() => onDelete(inter.idDetalleEnclavamiento)}>
            <MdDelete />
          </Button>
        </Actions>
      </Row>
      <Row>
        {inter.tipoEnclavamiento && (
          <Col1>
            <Title>Type</Title>
            {inter.tipoEnclavamiento}
          </Col1>
        )}
        {inter.alarma != '0' && (
          <Col1>
            <Title>Alarm</Title> {inter.alarma}
          </Col1>
        )}
        {isAlarm && (
          <Col>
            <Title>Fault</Title>
            {inter.falla}
          </Col>
        )}
      </Row>
      <Row>
        {isAlarm && (
          <Col>
            <Title>Consequence</Title>
            {inter.consecuencia}
          </Col>
        )}
        {!isAlarm && (
          <Col>
            <Title>Actions</Title> {inter.solucion}
          </Col>
        )}
        {isAlarm && (
          <Col>
            <Title>Corrective Action</Title>
            {inter.solucion}
          </Col>
        )}
      </Row>
    </Container>
  );
}

Detalle.propTypes = {
  inter: PropTypes.object,
  onEdit: PropTypes.any,
  onDelete: PropTypes.any,
};

export default Detalle;
