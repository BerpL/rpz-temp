/**
 *
 * ListAdminGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header, Column, Row, Text } from 'components/List';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import DropDownButton from 'components/DropDownButton';
import { TiPin } from 'react-icons/ti/index.esm';
import { MdDelete } from 'react-icons/md/index.esm';

const Actions = styled.div`
  display: flex;
  > div,
  > button {
    margin-right: 10px;
  }

  > div:last-child,
  > button:last-child {
    margin-right: 0px;
  }
`;

function ListAdminGroups({
  items,
  onChangeBaseQuestions,
  onChangeIntermediateQuestions,
  onChangeAdvancedQuestions,
  onOpenSetQuestions,
  onDelete,
}) {
  const {
    currentPage,
    maxPages,
    currentItems,
    hasPreviousPage,
    onPreviousPage,
    onNextPage,
    hasNextPage,
  } = usePagination({ items, itemsPerPage: 3 });

  const hasPagination = maxPages > 1;

  return (
    <div>
      <Header>
        <Column flex={1}>Area</Column>
        <Column flex="0 0 421px">Actions</Column>
      </Header>
      {currentItems.map(item => (
        <Row key={item.idArea}>
          <Column flex={1}>
            <Text>{item.nombre}</Text>
          </Column>
          <Column flex="0 0 421px">
            <Actions>
              <DropDownButton
                mode="list-number-generated"
                name="basicas"
                numberList={16}
                onChange={(name, value) =>
                  onChangeBaseQuestions(item.idArea, name, value)
                }
                style={{ height: 26 }}
                text="16 Bas."
              />
              <DropDownButton
                mode="list-number-generated"
                numberList={10}
                name="intermedias"
                onChange={(name, value) =>
                  onChangeIntermediateQuestions(item.idArea, name, value)
                }
                style={{ height: 26 }}
                text="10 Int."
              />
              <DropDownButton
                mode="list-number-generated"
                name="avanzadas"
                onChange={(name, value) =>
                  onChangeAdvancedQuestions(item.idArea, name, value)
                }
                numberList={5}
                style={{ height: 26 }}
                text="5 Adv."
              />
              <Button
                onClick={onOpenSetQuestions}
                style={{ height: 26, fontSize: 18, display: 'flex' }}
              >
                <TiPin />
              </Button>
              <Button
                onClick={onDelete}
                type="white"
                style={{ height: 26, fontSize: 18, display: 'flex' }}
              >
                <MdDelete />
              </Button>
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

ListAdminGroups.propTypes = {
  items: PropTypes.array,
  onChangeBaseQuestions: PropTypes.func,
  onChangeIntermediateQuestions: PropTypes.func,
  onChangeAdvancedQuestions: PropTypes.func,
  onOpenSetQuestions: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListAdminGroups;
