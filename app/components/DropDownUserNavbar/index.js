/**
 *
 * DropDownUserNavbar
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outside';
import styled from 'styled-components';
import ImageCircular from 'components/ImageCircular';
import { rgba } from 'polished';
import {
  MdExpandLess,
  MdExpandMore,
  MdDesktopMac,
  MdLock,
} from 'react-icons/md/index.esm';
import { FaSignOutAlt } from 'react-icons/fa/index.esm';
import { useTranslation } from 'react-i18next';

const Icon = icon => styled(icon)`
  color: ${({ theme: { textMenu } }) => textMenu};
  font-size: 22px;
  margin-right: 7px;
  font-weight: bold;
`;

const IconItem = icon => styled(icon)`
  color: ${({ theme: { textMenu } }) => textMenu};
  margin-right: 7px;
  font-weight: bold;
`;

const Container = styled.button`
  border: none;
  background: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  background: transparent;
  padding: 0 20px 0 0;
  margin: 0;
`;

const Label = styled.span`
  color: ${({ theme: { textBold } }) => textBold};
  font-size: 13px;
  font-weight: bold;
  display: block;
  margin-right: 32px;
  text-align: left;
  span {
    width: 100%;
    display: block;
  }

  span:first-child {
    margin-bottom: 3px;
  }
  span:last-child {
    color: ${({ theme: { text } }) => text};
    font-weight: normal;
  }
`;

const Options = styled.div`
  max-height: ${({ open }) => (open ? '400px' : '0px')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  position: absolute;
  top: 60px;
  overflow: hidden;
  background: ${({ theme: { base } }) => base};
  right: 26px;
  transition: all 0.3s;
  text-align: left;
  color: ${({ theme: { textMenu } }) => textMenu};
  z-index: 2;
  min-width: 200px;
  box-shadow: 0px 0px 6px 0px ${({ theme: { primary } }) => rgba(primary, 0.5)};
`;

const Option = styled.button`
  text-align: left;
  padding: 7px 26px;
  outline: none;
  font-size: 13px;
  width: 100%;
  margin: 0;
  width: 100%;
  cursor: pointer;
  &:hover {
    color: ${({ theme: { primary } }) => primary};
  }
`;

const IconDesktop = IconItem(MdDesktopMac);
const IconLock = IconItem(MdLock);
const IconLogOut = IconItem(FaSignOutAlt);

function DropDownUserNavbar({ user, onInterface, onChangePassword, onLogOut }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ToggleIcon = Icon(open ? MdExpandLess : MdExpandMore);
  const handleInterface = () => {
    setOpen(false);
    onInterface();
  };

  const handleChangePassword = () => {
    setOpen(false);
    onChangePassword();
  };

  const handleLogOut = () => {
    setOpen(false);
    onLogOut();
  };
  return (
    <Wrapper>
      <ClickOutside onClickOutside={() => setOpen(false)}>
        <Container onClick={() => setOpen(!open)}>
          <Label>
            <span>{user.name}</span>
            <span>{user.group}</span>
          </Label>
          <ToggleIcon />
          <ImageCircular src={user.profilePicture} width={38} />
        </Container>
      </ClickOutside>

      <Options open={open}>
        <div style={{ padding: '16px 0' }}>
          <Option onClick={handleInterface}>
            <IconDesktop /> Interface
          </Option>
          <Option onClick={handleChangePassword}>
            <IconLock /> Change Password
          </Option>
          <Option onClick={handleLogOut}>
            <IconLogOut /> Log Out
          </Option>
        </div>
      </Options>
    </Wrapper>
  );
}

DropDownUserNavbar.propTypes = {
  user: PropTypes.object.isRequired,
  onInterface: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
};

export default DropDownUserNavbar;
