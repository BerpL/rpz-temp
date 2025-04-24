/**
 *
 * ListUsersAssignment
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* hooks */
import usePagination from 'hooks/usePagination';

/* components */
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';
import CheckBox from 'components/CheckBox';
import Pagination from 'components/Pagination';
import DropDownButton from 'components/DropDownButton';

const getColorEstate = type => {
  switch (type) {
    case 'Inscrito':
      return 'rgba(4,17,37,0.35)';
    case 'En proceso':
      return '#4ABC51';
    case 'Evaluado':
      return '#FE4C6B';
    default:
      return '';
  }
};

const CircleState = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  display: inline-block;
  margin-right: 5px;
`;

const estados = [
  {
    key: 'Inscrito',
    value: 'Inscrito',
  },
];

function ListUsersAssignment({ users = [] }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items: users, itemsPerPage: 3 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        <Column flex="none">
          <CheckBox />
        </Column>
        <Column flex={1}>Estado</Column>
        <Column flex={1}>Nombres</Column>
        <Column flex={1}>Usuario</Column>
        <Column flex={1}>Grupo</Column>
      </Header>

      {currentItems.map(item => (
        <Row key={item.idUsuario}>
          <Column flex="none">
            <CheckBox />
          </Column>
          <Column flex={1}>
            <Text>
              <CircleState bg={getColorEstate(item.estado)} /> {item.estado}{' '}
              {item.estado === 'Evaluado' && (
                <DropDownButton
                  type="transparent"
                  name="estado"
                  title="Cambiar Estado:"
                  items={estados}
                  style={{ padding: 0 }}
                />
              )}
            </Text>
          </Column>
          <Column flex={1}>
            <Text>{item.nombres}</Text>
          </Column>
          <Column flex={1}>
            <Text>{item.usuario}</Text>
          </Column>
          <Column flex={1}>
            <Text>{item.grupo}</Text>
          </Column>
        </Row>
      ))}
      {hasPagination && (
        <Pagination
          hasPrevPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          current={currentPage}
          prev={onPreviousPage}
          next={onNextPage}
          max={maxPages}
        />
      )}
    </div>
  );
}

ListUsersAssignment.propTypes = {
  users: PropTypes.array,
};

export default ListUsersAssignment;
