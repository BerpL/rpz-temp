/**
 *
 * FooterHome
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import History from 'utils/history';
import {
  Paseos,
  Equipos,
  Videos,
  Procesos,
  Documentos,
  DiagramasFlujo,
} from 'images/svgs';

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 10px;
  user-select: none;
  display: none;
  @media (min-height: 600px) and (min-width: 576px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Item = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:after {
    border-bottom: 3px solid rgb(0,39,118);
    content: '';
    display: block;
    margin: 0.25em auto 0;
    transition: width 0.3s ease-in-out 0s;
    width: 0;
  }
  &:hover:after {
    transition: width 0.3s ease-in-out 0s;
    width: 100%;
  }
`;

const Menu = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: grey;
  font-size: 13px;
  margin: 0;
  text-transform: uppercase;
  padding: 0;
  text-align: center;
  height: 1.2em;
  letter-spacing: 0.3px;
  font-weight: bold;
`;

const Card = styled.div`
  position: absolute;
  bottom: 0;
  width: 800px;
  height: auto;
  border-radius: 15px;
  background: rgba(255,255,255, 1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

function FooterHome() {
  return (
    <FooterContainer>
      <Card>
        <Menu>
          <Item onClick={() => History.push('/flowdiagrams')}>
            <DiagramasFlujo fill="grey" />
            <Text>Interactive Flowcharts</Text>
          </Item>
          <Item onClick={() => History.push('/pids')}>
            <Documentos fill="grey" />
            <Text>P&ID</Text>
          </Item>
          {/* <Item onClick={() => History.push('/procedures')}>
            <Procesos fill="rgb(0, 150, 64)" />
            <Text>Procedures</Text>
          </Item> */}
          <Item onClick={() => History.push('/virtualwalks')}>
            <Videos fill="grey" />
            <Text>Videos 3D</Text>
          </Item>
          <Item onClick={() => History.push('/InteractiveEquipment/paseos')}>
            <Paseos fill="grey" />
            <Text>Virtual 3D Tour</Text>
          </Item>
        </Menu>
      </Card>
    </FooterContainer>
  );
}

FooterHome.propTypes = {};

export default FooterHome;
