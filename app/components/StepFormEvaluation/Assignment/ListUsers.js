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
import DropDownButton from 'components/DropDownButton';

const Grupos = [
  {
    key: 'Administrador',
    value: 'Administrador',
  },
  {
    key: 'Usuario',
    value: 'Usuario',
  },
];

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
        <Column flex={3}>Nombres</Column>
        <Column flex={2}>
          Grupo{' '}
          <DropDownButton
            type="transparent"
            name="grupos"
            title="Agrupos por:"
            items={Grupos}
          />
        </Column>
      </Header>
      {currentItems.map(item => (
        <Row key={item.idUsuario}>
          <Column flex="none">
            <CheckBox />
          </Column>
          <Column flex={3}>
            <Text>{item.nombres}</Text>
          </Column>
          <Column flex={2}>
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

ListUsers.propTypes = {
  users: PropTypes.array,
};

export default ListUsers;
