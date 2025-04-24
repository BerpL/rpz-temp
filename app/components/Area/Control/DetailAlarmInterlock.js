import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: #fff;
  background: #17428B;
  padding: 16px;
  position: relative;
  strong {
    color: #fff;
  }
  p,
  strong {
    font-size: 12px;
    margin-bottom: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #009640;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #dddddd;
  margin-bottom: 8px;
  padding-bottom: 8px;
  strong {
    display: block;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  height: 30px;
  line-height: 14px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.34);
  display: block;
  margin: 0;
  cursor: pointer;
`;

const BodyItem = styled.p`
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  display: block;
`;

const ItemC = styled.div`
  strong {
    display: block;
  }
  max-height: ${({ open }) => (open ? '99999999px' : '30px')};
  overflow: hidden;
  margin: 4px 0;
  transition: max-height 0.3s;
`;

function Item({ item: d, index, alarm }) {
  const [open, setOpen] = useState(false);
  return (
    <ItemC open={open}>
      <Title onClick={() => setOpen(!open)}>Detail #{index}</Title>
      <BodyItem>
        {!alarm && (
          <p>
            <strong>Condition: </strong>
            {d.condicion || "—"}
          </p>
        )}
        {alarm && (
          <p>
            <strong>Value:</strong>
            {d.valor || "—"}
          </p>
        )}
        {alarm && (
          <p>
            <strong>Fault:</strong>
            {d.falla || "—"}
          </p>
        )}
        {(
          <p>
            <strong>{!alarm ? "Action:" : "Consequence"}</strong>
            {!alarm ? d.solucion : d.consecuencia}
          </p>
        )}
        {alarm && (
          <p>
            <strong>Corrective Action:</strong>
            {d.solucion || "—"}
          </p>
        )}
        {!alarm && (
          <p>
            <strong>Type:</strong>
            {d.tipoEnclavamiento || "—"}
          </p>
        )}
      </BodyItem>
    </ItemC>
  );
}

function DetailAlarmInterlock({ alarm, detail, onClose }) {
  console.log(detail)
  return (
    <Container>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Header>
        <h2>
          <strong>{alarm.isAlarm ? "TAG:" : "ABBR:"}</strong>
          {alarm.nombre || "—"}
        </h2>
        <p>
          <strong>Id:</strong>
          {alarm.idItem || "—"}
        </p>
        <p>
          <strong>Instrument:</strong> {alarm.instrumento || "—"}
        </p>
      </Header>
      <div>
        {detail.map((d, index) => (
          <Item key={d.idDetalleEnclavamiento} item={d} index={index} alarm={alarm.isAlarm}/>
        ))}
      </div>
    </Container>
  );
}

export default DetailAlarmInterlock;
