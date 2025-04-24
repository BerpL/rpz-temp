import React from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { Button, Grid } from "@nextui-org/react";

const HamburgerButton = styled.div`
  position: absolute;
  cursor: pointer;
  right: ${({ isOpen }) => (isOpen ? '0' : '-400px')}; 
  margin-top: 1rem;
  top: 10px;
  margin-right: 320px;
  transition: right 0.3s ease; 
  background: rgb(0,39,118);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.3rem;
`;

const HamburguerIcon = styled.div`
  color: #fff !important;
  font-size: 30px;
`;

const HamburgerMenu = ({ isOpen, onClick }) => {
  return (
    <HamburgerButton onClick={onClick} style={{
		position: 'absolute',
		right: isOpen ? '0' : '-300px',
	  }}>
      <Button color="secondary" auto onClick={onClick}>
          
		<HamburguerIcon>
		{isOpen ? <MdClose /> : <MdMenu />}
		</HamburguerIcon>
        </Button>
    </HamburgerButton>
  );
};

export default HamburgerMenu;
