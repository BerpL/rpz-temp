import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { FaUserCircle, FaSignOutAlt, FaTv } from 'react-icons/fa/index.esm';
import { lighten } from 'polished';

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  width: 100%;
  user-select: none;
  font-family: 'Roboto', sans-serif;
  z-index: 1;
  position: relative;
  cursor: pointer;
  background: ${({ theme }) => theme.admin.colors.sideBar};
  align-items: center;
  transition: background 0.3s;
  height: ${({ theme }) => theme.admin.headerSize};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: width 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Name = styled.span`
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  color: ${({ theme }) => lighten(0.1, theme.admin.colors.text)};
  word-wrap: break-word;
  white-space: nowrap;
  margin-left: 8px;
  text-overflow: ellipsis;
`;

const ContextMenu = styled.div`
  position: absolute;
  top: 100%;
  width: ${({ theme }) => `calc(${theme.admin.sidebarSize} + 32px)`};
  left: 16px;
  transition: opacity 0.3s;
  z-index: ${({ open }) => (open ? '4' : '-10')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  /* display: ${({ open }) => (open ? 'block' : 'none')}; */
  border-radius: 4px;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  background: ${({ theme }) => theme.colors.white};
  padding: 8px 0;
`;

const ContextMenuItem = styled.div`
  padding: 8px 16px;
  font-size: 12px;
  cursor: pointer;
  svg {
    margin-right: 8px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

function UserBox({ responsive, user, onLogout, onGoInterfaz, hasInterface }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div ref={ref} style={{ position: 'relative'}} >
      <Wrapper onClick={() => setOpen(!open)} style={{ display: responsive ? 'flex' : 'none' }}>
        <FaUserCircle />
        <Name>{`${user.nombres} ${user.apellidos}`}</Name>
      </Wrapper>
      <ContextMenu open={open} style={{ display: responsive ? 'block' : 'none' }}>
        {hasInterface && (
          <ContextMenuItem onClick={onGoInterfaz}>
            <FaTv />
            Interface
          </ContextMenuItem>
        )}
        <ContextMenuItem onClick={onLogout}>
          <FaSignOutAlt />
          Log Out ({user.nombreUsuario})
        </ContextMenuItem>
      </ContextMenu>
    </div>
  );
}

UserBox.propTypes = {
  user: PropTypes.object,
  onGoInterfaz: PropTypes.func,
  hasInterface: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default UserBox;
