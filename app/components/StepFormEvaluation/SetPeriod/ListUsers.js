/**
 *
 * ListUsers
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* hooks */
import usePagination from 'hooks/usePagination';

/* components */
import { Header, Column, Row, Text } from 'components/List';
import CheckBox from 'components/CheckBox';
import Pagination from 'components/Pagination';
import Toggle from 'components/Toggle';

function ListUsers({ users = [] }) {
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
        <Column flex={2}>Nombres</Column>
        <Column flex={1}>Usuario</Column>
        <Column flex={1}>Grupo</Column>
        <Column flex={2}>
          Activar Periodo de evaluación{' '}
          <Toggle style={{ transform: 'scale(0.7)' }} />
        </Column>
      </Header>

      {currentItems.map(item => (
        <Row key={item.idUsuario}>
          <Column flex="none">
            <CheckBox />
          </Column>
          <Column flex={2}>
            <Text>{item.nombres}</Text>
          </Column>
          <Column flex={1}>
            <Text>{item.usuario}</Text>
          </Column>
          <Column flex={1}>
            <Text>{item.grupo}</Text>
          </Column>
          <Column flex={2}>
            <Text>12/05/2019 -15/06/2019</Text>
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

ListUsers.propTypes = {
  users: PropTypes.array,
};

export default ListUsers;
