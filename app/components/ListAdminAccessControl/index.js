/**
 *
 * ListAdminAccessControl
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';

import ButtonAdminAction from 'components/ButtonAdminAction';
import Pagination from 'components/Pagination';

/* Hooks */
import usePagination from 'hooks/usePagination';

const Actions = styled.div``;

function ListAdminAccessControl({ accesses, onView }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items: accesses, itemsPerPage: 6 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        <Column flex={2}>Name</Column>
        <Column>User</Column>
        <Column>Logins</Column>
        <Column flex={2}>Total Training Time (HH:MM)</Column>
        <Column />
      </Header>
      {currentItems.map(item => (
        <Row key={item.idUsuario}>
          <Column flex={2}>
            <Text>{item.nombre}</Text>
          </Column>
          <Column>
            <Text>{item.usuario}</Text>
          </Column>
          <Column>
            <Text>{item.ingresos}</Text>
          </Column>
          <Column flex={2}>
            <Text>{item.tiempoTotalEntrenamiento}</Text>
          </Column>
          <Column>
            <Actions>
              <ButtonAdminAction onClick={() => onView(item)}>
                Detalles
              </ButtonAdminAction>
            </Actions>
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

ListAdminAccessControl.propTypes = {
  accesses: PropTypes.array,
  onView: PropTypes.func,
};

export default ListAdminAccessControl;
