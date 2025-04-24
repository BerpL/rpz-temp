import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  FaUsers,
  FaBox,
  FaUser,
  FaClock,
  FaFolder,
  FaCogs,
  FaGraduationCap,
  FaCog,
  FaQuestion,
  FaTasks,
  FaRetweet,
  FaVideo,
  FaFlipboard,
  FaRegChartBar,
  FaFolderPlus,
  FaVideoSlash,
  FaProjectDiagram,
  FaFileExcel,
  FaTools
} from 'react-icons/fa/index.esm';

import { rgba, darken } from 'polished';

const SubModuleContainer = styled.div`
  width: 100%;
  max-height: ${({ open }) => (open ? '600px' : '0px')};
  overflow: hidden;
  transition: max-height ${({ open }) => (open ? '0.4' : '0.1')};
`;

const selectBgItem = ({ theme, isSelected }) =>
  isSelected ? rgba(theme.admin.colors.text, 0.1) : 'transparent';
const selectColorItem = ({ theme, isSelected }) =>
  isSelected
    ? darken(0.3, theme.admin.colors.textLight)
    : darken(0.1, theme.admin.colors.textLight);

const ItemSubModule = styled.div`
  width: 100%;
  position: relative;
  color: ${selectColorItem};
  overflow: hidden;
  padding: 4px 20px;
  background: ${selectBgItem};
  font-size: 14px;
  display: flex;
  font-family: 'Roboto', sans-serif;
  align-items: center;
  justify-content: center;
  svg {
    margin-top: 2px;
    font-size: 16px;
    color: ${selectColorItem};
    margin-right: 8px;
    vertical-align: middle;
  }
  &:hover {
    background: ${({ theme }) => rgba(theme.admin.colors.text, 0.1)};
  }
`;

const Span = styled.span`
  transition: all 0.4s;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  text-overflow: ellipsis;
`;

const Icon = ({ url }) => {
  switch (url) {
    case '/admin/user': {
      return <FaUser />;
    }
    case '/admin/group': {
      return <FaUsers />;
    }
    case '/admin/access': {
      return <FaClock />;
    }
    case '/admin/archives': {
      return <FaFolder />;
    }
    case '/admin/media': {
      return <FaBox />;
    }
    case '/admin/control': {
      return <FaCogs />;
    }
    case '/admin/pids': {
      return <FaCog />;
    }
    case '/admin/quizzes/reports': {
      return <FaGraduationCap />;
    }
    case '/admin/question': {
      return <FaQuestion />;
    }
    case '/admin/quizzes': {
      return <FaTasks />;
    }
    case '/admin/procedures': {
      return <FaRetweet />;
    }

    case '/admin/videos': {
      return <FaVideo />;
    }
    case '/admin/diagrams': {
      return <FaFlipboard />;
    }
    case '/admin/balances': {
      return <FaRegChartBar />;
    }
    case '/admin/folderaccess': {
      return <FaFolderPlus />;
    }
    case '/admin/diagramsaccess': {
      return <FaProjectDiagram />;
    }
    case '/admin/pidaccess': {
      return <FaFileExcel />;
    }
    case '/admin/processaccess': {
      return <FaTools />;
    }
    case '/admin/videoaccess': {
      return <FaVideoSlash />;
    }
    default: {
      return null;
    }
  }
};

function SubModulesContainer({ subModules, onItem, open, selected }) {
  return (
    <SubModuleContainer open={open}>
      {subModules.map(subModule => {
        const isActive = subModule.url === selected;
        return (
          <ItemSubModule
            isSelected={isActive}
            key={subModule.id}
            onClick={() => onItem(subModule)}
          >
            <Icon url={subModule.url} />
            <Span>{subModule.nombre}</Span>
          </ItemSubModule>
        );
      })}
    </SubModuleContainer>
  );
}

SubModulesContainer.propTypes = {
  subModules: PropTypes.array,
  onItem: PropTypes.func,
  open: PropTypes.bool,
  selected: PropTypes.any,
};

export default SubModulesContainer;
