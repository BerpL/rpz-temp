import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaWhmcs } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ControlGroupService } from 'servicesV2';
import './Sidebar.css';

const SidebarContainer = styled.div`
  width: 310px;
  background-color: #17428B;
  color: #fff;
  height: calc(100vh - 76px);
  margin-top: 76px;
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  background-color: #009640;
  text-align: center;
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  position: relative;

  a {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    color: #fff;
    text-decoration: none;
    transition: background-color 0.3s, padding-left 0.3s, color 0.3s;
    cursor: pointer;
    padding-left: ${({ level }) => 20 + level * 15}px;
    font-weight: ${({ isParent }) => (isParent ? 'bold' : 'normal')};

    &:hover,
    &.active {
      background-color: #009640;
    }

    svg {
      margin-right: 10px;
      min-width: 16px;
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }
`;

const SubMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: #17428B;
`;

const HamburgerButton = styled.button`
  position: fixed;
  top: 25px;
  left: 260px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20px;
  width: 35px;
  z-index: 999;

  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #17428B; /* Color oscuro del tema */
    transition: all 0.3s ease;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const isDocument = (menu) => {
  return menu.esDocumento === true || menu.esEquipo === true;
};


const Sidebar = ({
  area,
  handleClickItem,
  onClickControl,
  onToggle,
  closeMediaPanel // Recibimos la función como prop
}) => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [currentPath, setCurrentPath] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // Cambiado a true para que el sidebar esté abierto por defecto
  const [activeItem, setActiveItem] = useState(null); // Nuevo estado para el item activo
  const [specialItems, setSpecialItems] = useState({});
  const [controlGroupService] = useState(new ControlGroupService());

  const toggleSubmenu = (menuId, level, path) => {
    setOpenSubmenus((prevState) => {
      const newState = { ...prevState };

      const pathArray = path.split('-');
      const currentPathArray = currentPath;

      if (!currentPathArray.slice(0, pathArray.length).every((value, index) => value === pathArray[index])) {
        Object.keys(newState).forEach((key) => {
          if (key.startsWith(level.toString()) && key !== `${level}-${menuId}`) {
            newState[key] = false;
          }
        });
      }

      const currentKey = `${level}-${menuId}`;
      newState[currentKey] = !prevState[currentKey];

      return newState;
    });

    setCurrentPath(path.split('-'));
  };

  const ButtonContainer = styled.div`
    padding: 5px 20px;
    padding-left: ${({ level }) => 20 + level * 15}px;
  `;
  
  const SpecialButton = styled.button`
    background: transparent;
    color: #009640;
    border: 2px solid #009640;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
  
    &:hover {
      background: #009640;
      color: white;
    }
  `;
  
  // Agregar esta función para verificar si es un menú especial
  const isSpecialMenu = (nombre) => /^\d+\s(Alarms|Interlocks)$/.test(nombre);
  
  // Agregar esta función auxiliar para buscar el padre en todo el árbol
  const findParentInTree = (nodes, childId) => {
    for (const node of nodes) {
      if (node.nodos) {
        if (node.nodos.some(child => child.id === childId)) {
          return node;
        }
        const found = findParentInTree(node.nodos, childId);
        if (found) return found;
      }
    }
    return null;
  };
  
  const renderMenu = (menu, level = 0, path = '0', numbering = '') => {
    const isParent = menu.nodos && menu.nodos.length > 0;
    const isDoc = isDocument(menu);
    const menuKey = `${level}-${menu.id}`;
    const newPath = `${path}-${menu.id}`;
    const currentNumbering = numbering ? `${numbering}.${path.split('-').pop()}` : `${path.split('-').pop()}`;
  
    // Buscar el padre en todo el árbol
    const parentMenu = findParentInTree(area?.nodos || [], menu.id);
    const isParentSpecial = parentMenu && /^\d+\s(Alarms|Interlocks)$/.test(parentMenu.nombre);
    const parentType = isParentSpecial ? parentMenu.nombre.split(' ')[1] : null;
  
    const nameWithNumber = isParent ? `${currentNumbering} ${menu.nombre.replace(/^\d+\s/, '')}` : menu.nombre;
  
    return (
      <MenuItem key={menu.id} level={level} isParent={isParent}>
        {isParentSpecial ? (
          <>
            <ButtonContainer level={level}>
              <SpecialButton 
                onClick={async () => {
                  if (onClickControl) {
                    onClickControl(parentMenu.id, parentType.toLowerCase());
                  }
                }}
              >
                {parentType}
              </SpecialButton>
            </ButtonContainer>
            <a
              onClick={() => {
                if (isDoc) {
                  handleClickItem(menu);
                  setIsOpen(false);
                  setActiveItem(menuKey);
                  closeMediaPanel();
                } else if (isParent) {
                  toggleSubmenu(menu.id, level, newPath);
                }
              }}
              className={`${openSubmenus[menuKey] ? 'active' : ''} ${activeItem === menuKey ? 'active' : ''}`}
            >
              {isDoc ? <FaFileAlt /> : null}
              <span>{nameWithNumber}</span>
            </a>
            {specialItems[parentMenu.id] && (
              <SubMenu>
                {specialItems[parentMenu.id].nodos.map((specialItem, index) => {
                  const itemWithIcon = {
                    ...specialItem,
                    esEspecial: true  // Marcador para identificar items especiales
                  };
                  return renderMenu(itemWithIcon, level + 1, `${newPath}-${index + 1}`, currentNumbering);
                })}
              </SubMenu>
            )}
          </>
        ) : (
          <a
            onClick={() => {
              if (isDoc || menu.esEspecial) {  // Agregamos la condición para items especiales
                handleClickItem(menu);
                setIsOpen(false);
                setActiveItem(menuKey);
                closeMediaPanel();
              } else if (isParent) {
                toggleSubmenu(menu.id, level, newPath);
              }
            }}
            className={`${openSubmenus[menuKey] ? 'active' : ''} ${activeItem === menuKey ? 'active' : ''}`}
          >
            {menu.esEspecial ? <FaWhmcs /> : isDoc ? <FaFileAlt /> : null}
            <span>{nameWithNumber}</span>
          </a>
        )}
        {isParent && (
          <TransitionGroup component={SubMenu}>
            {openSubmenus[menuKey] && (
              <CSSTransition key={menuKey} timeout={300} classNames="submenu">
                <SubMenu>
                  {menu.nodos.map((submenu, index) =>
                    renderMenu(submenu, level + 1, `${newPath}-${index + 1}`, currentNumbering)
                  )}
                </SubMenu>
              </CSSTransition>
            )}
          </TransitionGroup>
        )}
      </MenuItem>
    );
  };

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <>
      <HamburgerButton onClick={toggleSidebar} className={isOpen ? 'open' : ''}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <h2>{area?.nombre}</h2>
        </SidebarHeader>
        {area && (
          <SidebarMenu>
            {area.nodos.map((menu, index) => renderMenu(menu, 0, `${index + 1}`))}
          </SidebarMenu>
        )}
      </SidebarContainer>
    </>
  );
};

export default Sidebar;