/**
 *
 * HeaderHome
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AuthService, AccountService, TicketService } from 'servicesV2';
import styled from 'styled-components';
import LogoImg from 'images/LogoQ';
import { MdMenu } from 'react-icons/md/index.esm';
import History from 'utils/history';
import { Navbar, Link, Text, useTheme } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';
import Storage from '../../storage';

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: flex-end;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 3;
  background: #e4e4e4cf;
  user-select: none;
  @media (min-height: 600px) and (min-width: 576px) {
    z-index: 3;
    height: 50px;
    background: transparent;
    position: absolute;
    align-items: center;
  }
`;

const LogoContainer = styled.div`
  background-color: #fff;
  position: absolute !important;
  left: 0;
  display: inline-block;
  padding: 0 7rem 0 3rem !important;
  @media (min-height: 600px) and (min-width: 576px) {
    padding: 0 26px;
  }
  @media (max-width: 650px) {
    display: flex;
    justify-content: center;
    position: fixed !important;
    padding: 0 26px;
  }
`;

const Logo = styled(LogoImg)`
  width: 150px;
  height: 76px;
`;

const HamburgerIcon = styled.div`
  color: ${({ theme: { base } }) => base};
  background: ${({ theme: { primary } }) => primary};
  cursor: pointer;
  width: 30px;
  user-select: none;
  height: 30px;
  margin-left: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (min-height: 600px) and (min-width: 576px) {
    display: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const BrandContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  @media (min-height: 600px) and (min-width: 576px) {
    width: auto;
    justify-content: center;
  }
`;

const Menu = styled.div`
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  margin: 0px 25px;
  @media (min-height: 600px) and (min-width: 576px) {
    display: flex;
  }
`;

const Item = styled.div`
  text-decoration: none;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:after {
    border-bottom: 3px solid ${({ theme }) => theme.colors.text};
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

const NavContainer = styled(Navbar)`
  display: box;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  box-shadow: none !important;
  .nextui-navbar-container {
    background-color: #17428B;
    display: flex;
    justify-content: end;
    min-width: 100vw;
  }
  .nextui-navbar-lin{
    color: #fff;
  }
`;

const CustomNavbarContent = styled(Navbar.Content)`
  .nextui-navbar-link.active {
    color: #fff !important;
  }
  .nextui-navbar-link:hover {
    color: white;
  }
  .nextui-navbar-item {
    color: #fff !important;
  }
  .nextui-navbar-cursor-highlight {
    background: rgba(0, 150, 64, 1) !important;
  }
`;

function HeaderHome({ showComponent = true }) {
  const { isDark } = useTheme();
  const [userData, setUserData] = useState(null);
  const [auth] = useState(new AuthService());
  const [account] = useState(new AccountService());
  const [menuItem, setMenuItem] = useState("HOME");
  const [open, setOpen] = useState(false);
  const { location } = History;
  const [ticketService] = useState(new TicketService());

  const goTo = (pathname, item) => {
    setMenuItem(item);
    if (location.pathname === pathname) return null;
    return History.push(pathname);
  };

  const handleSignOut = async () => {
    const currentDate = new Date();
    const sessionStart = new Date(Number(Storage.getStartSession()));
    const tiempoInterface = Math.floor((currentDate - sessionStart) / 60000); // Convertir de milisegundos a minutos
    const record = {
      fechaHoraIngreso: sessionStart.toISOString(),
      fechaHoraSalida: currentDate.toISOString(),
      tiempoInterface,
    };
    try {
      await ticketService.addRecord(record);
    } catch (error) {
      console.error('Error al finalizar la sesión:', error);
    }
    auth.signOut();
    goTo('/login');
  };

  const dataMenu = ["HOME", "EVALUATIONS", "ADMIN", "LOG OUT"];

  useEffect(() => {
    // Get the value of "@roshpinahzinc/user" from localStorage
    const storedUser = localStorage.getItem('@roshpinahzinc/user');

    // Parse the JSON value if necessary
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
    }
  }, []);

  return (
    <>
      <NavContainer variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand css={{ "@xs": { w: "12%" } }}>
          <LogoContainer>
            <Logo fill="#000" onClick={() => goTo('/', "HOME")}/>
          </LogoContainer>
        </Navbar.Brand>
        <CustomNavbarContent enableCursorHighlight hideIn="xs" variant="highlight-rounded">
          <Navbar.Link isActive={menuItem === dataMenu[0]} onClick={() => goTo('/', "HOME")}>{dataMenu[0]}</Navbar.Link>
          <Navbar.Link isActive={menuItem === dataMenu[1]} onClick={() => goTo('/evaluations', "EVALUATIONS")}>{dataMenu[1]}</Navbar.Link>
          {account.hasAdmin() && (
            <Navbar.Link isActive={menuItem === dataMenu[2]} onClick={() => goTo(account.firstAdminRoute(), "ADMIN")}>{dataMenu[2]}</Navbar.Link>
          )}
          <Navbar.Link isActive={menuItem === dataMenu[3]} onClick={handleSignOut}>{dataMenu[3]}</Navbar.Link>
        </CustomNavbarContent>
        <Navbar.Content css={{ "@xs": { w: "12%", jc: "flex-end" } }} />
        <Navbar.Collapse>
          <Navbar.CollapseItem key="1" activeColor="secondary" isActive={menuItem === dataMenu[0]}>
            <Link color="inherit" css={{ minWidth: "100%" }} onClick={() => goTo('/', "HOME")}>HOME</Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem key="2" activeColor="secondary" isActive={menuItem === dataMenu[1]}>
            <Link color="inherit" css={{ minWidth: "100%" }} onClick={() => goTo('/evaluations', "EVALUATIONS")}>EVALUATIONS</Link>
          </Navbar.CollapseItem>
          {account.hasAdmin() && (
            <Navbar.CollapseItem key="3" activeColor="secondary" isActive={menuItem === dataMenu[2]}>
              <Link color="inherit" css={{ minWidth: "100%" }} onClick={() => goTo(account.firstAdminRoute(), "ADMIN")}>ADMIN</Link>
            </Navbar.CollapseItem>
          )}
          <Navbar.CollapseItem key="4" activeColor="secondary" isActive={menuItem === dataMenu[3]}>
            <Link color="inherit" css={{ minWidth: "100%" }} onClick={handleSignOut}>LOG OUT</Link>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </NavContainer>
    </>
  );
}

HeaderHome.propTypes = {
  showComponent: PropTypes.bool,
  toggleMenu: PropTypes.func,
  onClickSignOut: PropTypes.func,
};

export default HeaderHome;
