/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { FaTrash, FaPen, FaEye } from 'react-icons/fa/index.esm';
import CheckBox from 'components/CheckBox';
// import Loader from './Loader';

const Actions = styled.div`
  position: absolute;
  top: 0;
  height: 0;
  align-items: center;
  padding: 0 8px;
  right: 0;
  opacity: 0;
  z-index: -4;
  display: flex;
  font-size: 12px;
  transition: height 0.3s ease-in-out;
`;

const Action = styled.div`
  padding: 4px 8px;
  margin-left: 4px;
  color: ${({ theme }) => theme.admin.colors.text};
  cursor: pointer;
  border-radius: 4px;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
  background: white;
`;

const Row = styled.div`
  font-size: 16px;
  display: flex;
  width: 100%;
  position: relative;
  color: ${({ theme }) => theme.admin.colors.textLight};
  &:hover {
    background: ${({ theme }) => rgba(theme.admin.colors.primary, 0.1)};
  }

  &:hover ${Actions} {
    opacity: 1;
    z-index: 1;
    height: 100%;
  }
`;

const Cell = styled.div`
  flex: ${({ weight }) => weight || 1};
  padding: 4px 8px;
  flex-shrink: 1;
  overflow: hidden;
  color: ${({ theme }) => theme.admin.colors.text};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  &:last-child {
    border-right: 1px solid transparent;
  }

  @media (max-width: 577px) {
    font-size: 12px;
    padding: 1.5px 3px;
  }
`;

const TableScroll = styled.div`
  @media (max-width: 577px) {
    overflow: scroll;
  }
`;

const RenderAction = ({ action, data }) => {

  switch (action.action) {
    case 'view': {
      return (
        <Action onClick={() => action.onClick(data.item)}>
          <FaEye /> {action.name || 'Watch'}
        </Action>
      );
    }

    case 'edit': {
      return (
        <Action onClick={() => action.onClick(data.item, data.currentPage)}>
          <FaPen /> Edit
        </Action>
      );
    }
    case 'delete': {
      return (
        <Action onClick={() => action.onClick(data.item, data.currentPage)}>
          <FaTrash /> Delete
        </Action>
      );
    }

    case 'check': {
    }
    default:
      return null;
  }
};

const isBoolean = val => {
  return !!val === val;
};

function TableBody({
  pagination: { currentItems: items = [], currentPage },
  titles = [],
  actions = [],
  clickChange,
}) {

  return (
    <TableScroll>
      {items.map((item, index) => (
        <Row key={index}>
          {actions && (
            <Actions>
              {actions.map(action => (
                <RenderAction
                  key={action.action}
                  action={action}
                  data={{ item: item[action.value], currentPage }}
                />
              ))}
            </Actions>
          )}
          {titles.map(title => (
            <Cell key={title.key} weight={title.weight}>
              {isBoolean(item[title.key]) ? (
                <CheckBox
                  selected={item[title.key]}
                  onChange={clickChange}
                  identifier={item.id}
                />
              ) : (
                item[title.key]
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </TableScroll>
  );
}

TableBody.propTypes = {
  pagination: PropTypes.object,
  titles: PropTypes.array,
  actions: PropTypes.array,
};

export default TableBody;
