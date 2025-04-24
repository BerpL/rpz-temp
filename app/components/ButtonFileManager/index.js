/**
 *
 * ButtonFileManager
 *
 */

import React, { useState } from 'react';
import ButtonAdmin from 'components/ButtonAdmin';
import { FiPlus, FiFolderPlus, FiFilePlus, FiBox } from 'react-icons/fi/index.esm';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClickOutside from 'components/ClickOutSide';
import { rgba } from 'polished';

const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

const ContextMenu = styled.div`
  top: 45px;
  min-width: 140px;
  background: ${({ theme: { base } }) => base};
  border-radius: 4px;
  z-index: 1000;
  right: 0;
  overflow: hidden;
  padding: 10px 0;
  transition: max-height 1s, opacity 0.2s;
  box-shadow: 0 0px 10px 2px ${({ theme: { primary } }) => rgba(primary, 0.5)};
  max-height: ${({ open }) => (open ? '1000px' : '0px')};
  opacity: ${({ open }) => (open ? 1 : 0)} !important;
  position: absolute !important;
`;

const ContextMenuItem = styled.div`
  cursor: pointer;
  padding: 10px 26px;
  outline: none;
  font-size: 13px;
  display: flex;
  user-select: none;
  align-items: center;
  white-space: nowrap;
  color: ${({ theme: { text } }) => text};
  &:hover {
    background: ${({ theme: { primary } }) => rgba(primary, 0.05)};
  }
  > svg {
    margin-right: 10px;
    flex: 0 0 15px;
    font-size: 15px;
    fill: none;
  }
`;

function ButtonFileManager({ onClickItem }) {
  const [open, setOpen] = useState(false);

  const handleClickItem = type => {
    setOpen(false);
    onClickItem(type);
  };

  const handleOutside = () => {
    setOpen(false);
  };

  return (
    <Container>
      <ClickOutside onClickOutside={handleOutside}>
        <ButtonAdmin onClick={() => setOpen(!open)}>
          <FiPlus /> New
        </ButtonAdmin>
      </ClickOutside>
      <ContextMenu open={open}>
        <ContextMenuItem onClick={() => handleClickItem(CONSTANTS.NEW_FOLDER)}>
          <FiFolderPlus /> New Folder
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleClickItem(CONSTANTS.NEW_DOCUMENT)}>
          <FiFilePlus /> New Document
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleClickItem(CONSTANTS.NEW_EQUIP)}>
          <FiBox /> New Equipment
        </ContextMenuItem>
      </ContextMenu>
    </Container>
  );
}

ButtonFileManager.propTypes = {
  onClickItem: PropTypes.func,
};

export const CONSTANTS = {
  NEW_FOLDER: 'NEW_FOLDER',
  NEW_DOCUMENT: 'NEW_DOCUMENT',
  NEW_EQUIP: 'NEW_EQUIP',
};

export default ButtonFileManager;
