/**
 *
 * ListAdminGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Header, Column, Row, Text } from 'components/List';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';
import CheckBox from 'components/CheckBox';

function ListAdminGroups({ items }) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items, itemsPerPage: 8 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        <Column flex="none">
          <CheckBox />
        </Column>
        <Column flex={1}>Detalles</Column>
        <Column flex="0 0 100px">Nivel</Column>
      </Header>
      {currentItems.map(item => (
        <Row key={item.idArea}>
          <Column flex="none">
            <CheckBox />
          </Column>
          <Column flex={1}>
            <Text>{item.question}</Text>
          </Column>
          <Column flex="0 0 100px">
            <Text>{item.level}</Text>
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

ListAdminGroups.propTypes = {
  items: PropTypes.array,
};

export default ListAdminGroups;
