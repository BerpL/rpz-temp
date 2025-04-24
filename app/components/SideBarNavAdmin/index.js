/**
 *
 * SideBarNavAdmin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import LogoSouthern from 'images/Logo_Tecsup.png';
// import { lighten } from 'polished';
import History from 'utils/history';
import { MdClose } from 'react-icons/md/index.esm';

const Sidebar = styled.div`
  padding: 20px 0px;

  position: fixed;
  min-width: 200px;
  width: 70%;
  z-index: 99999999999999;
  overflow-y: auto;
  height: 100vh;
  color: ${({ theme: { base } }) => base};
  height: 100%;
  left: ${({ open }) => (open ? '0' : '-70%')};
  transition: left 0.5s;
  background: #d2dae6;
  @media (min-height: 600px) and (min-width: 576px) {
    display: none;
  }
  @media (min-width: 576px) {
    width: 300px;
    left: ${({ open }) => (open ? '0' : '-300px')};
  }
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  background: #c60c30;
  border-radius: 50%;
  margin-right: 10px;
`;

const CloseContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  font-size: 14px;
  display: flex;
  border-radius: 50%;
  margin-left: 26px;
  margin-bottom: 26px;
  cursor: pointer;
  svg {
    color: #c60c30;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  padding: 10px 26px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  text-transform: uppercase;
`;

function SideBarNavAdmin({
  style,
  hasLogo = true,
  hasCloseButton = false,
  onClose,
  open = false,
  onSignOut,
}) {
  const goTo = pathname => {
    onClose();
    return History.push(pathname);
  };
  return (
    <Sidebar open={open} style={style}>
      {/* {hasLogo && (
        <LogoContainer to="/">
          <Logo src={LogoSouthern} />
        </LogoContainer>
      )} */}

      {hasCloseButton && (
        <CloseContainer onClick={onClose}>
          <MdClose />
          Close
        </CloseContainer>
      )}

      <Item onClick={() => goTo('/evaluations')}>
        <Dot />
        Evaluations
      </Item>
      <Item onClick={() => goTo('/flowdiagrams')}>
        <Dot />
        Interactive Flowcharts
      </Item>
      <Item onClick={() => goTo('/pids')}>
        <Dot />
        P&ID
      </Item>
      <Item onClick={() => goTo('/procedures')}>
        <Dot />
        Procedures
      </Item>
      <Item onClick={() => goTo('/virtualwalks')}>
        <Dot />
        Videos 3D
      </Item>
      <Item onClick={() => goTo('/interactiveEquipment/paseos')}>
        <Dot />
        Virtual 3D Tour
      </Item>
      <Item
        onClick={() => {
          onClose();
          onSignOut();
        }}
      >
        <Dot />
        Log Out
      </Item>
    </Sidebar>
  );
}

SideBarNavAdmin.propTypes = {
  style: PropTypes.object,
  hasLogo: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  onSignOut: PropTypes.func,
};

export default SideBarNavAdmin;
