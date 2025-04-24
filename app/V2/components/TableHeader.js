import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FaSort } from 'react-icons/fa/index.esm';

const Header = styled.div`
  font-size: 14px;
  user-select: none;
  display: flex;
  cursor: pointer;
  width: 100%;
  color: ${({ theme }) => theme.admin.colors.textLight};
`;

const Title = styled.div`
  flex: ${({ weight }) => weight || 1};
  flex-shrink: 1;
  padding: 4px 8px;
  overflow: hidden;
  color: ${({ theme }) => theme.admin.colors.textLight};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:last-child {
    border-right: 1px solid transparent;
  }
  svg {
    opacity: 0;
  }

  &:hover {
    svg {
      opacity: 0.4;
    }
  }
`;

function TableHeader({ titles = [], onClickTitle }) {
  const handleItemClick = (key, strategy) => {
    onClickTitle(key, strategy);
  };
  return (
    <Header>
      {titles.map(title => (
        <Title
          key={title.key}
          weight={title.weight}
          onClick={() => handleItemClick(title.key, title.strategy)}
        >
          <span>{title.value}</span>
          <FaSort />
        </Title>
      ))}
    </Header>
  );
}

TableHeader.propTypes = {
  titles: PropTypes.array,
  onClickTitle: PropTypes.func,
};

export default TableHeader;
